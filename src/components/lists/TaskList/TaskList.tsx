import React, { FC, useState } from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Task from '../../cards/Task/Task';
import { TaskInterface } from '../../../interfaces';
import Confirmation from '../../modals/Confirmation/Confirmation';
import {
  useDeleteColumnMutation,
  useUpdateColumnMutation,
} from '../../../api/columns.api';
import { setAlertResult } from '../../../slices/alertSlice';
import {
  useAppDispatch,
  useAppSelector,
  useSetAlertResult,
  useTaskListDrag,
} from '../../../hooks';
import TaskTitleEditInput from '../../Inputs/TaskTitleInput/TaskTitleInput';
import { COLUMN_WIDTH } from '../../../constants';
import { toggleNewTaskForm } from '../../../slices/formSlice';
import { setCurrentColumnId } from '../../../slices/columnSlice';
import useTaskToListDrop from '../../../hooks/useTaskToListDrop';
import useColumnDrop from '../../../hooks/useColumnDrop';

type TaskListProps = {
  columnId: string;
  columnOrder: number;
  title: string;
  tasks: TaskInterface[];
};

const TaskList: FC<TaskListProps> = ({
  columnId,
  columnOrder,
  title: taskListTitle,
  tasks,
}) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const currentColumnId = useAppSelector((state) => state.column.currentId);
  const board = useAppSelector((state) => state.board.currentBoard);
  const [
    deleteColumn,
    { isSuccess: isSuccessColumnDelete, error: errorColumnDelete },
  ] = useDeleteColumnMutation();
  const [
    updateColumn,
    { isSuccess: isSuccessColumnUpdate, error: errorColumnUpdate },
  ] = useUpdateColumnMutation();

  const dispatch = useAppDispatch();

  const toggleConfirmation = () => {
    setIsConfirmationOpen(!isConfirmationOpen);
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleNewTaskClick = () => {
    dispatch(toggleNewTaskForm());
  };

  const changeTitleClick = (title: string) => {
    toggleEditMode();
    if (title === taskListTitle) return;
    const columnData = {
      body: {
        title,
        order: columnOrder,
      },
      boardId: board?.id,
      columnId,
    };
    updateColumn(columnData).catch((e) =>
      dispatch(setAlertResult({ error: e })),
    );
  };

  const handleTaskListDelete = () => {
    deleteColumn({ boardId: board?.id, columnId }).catch((e) =>
      dispatch(setAlertResult({ error: e })),
    );
  };

  const saveCurrentColumnId = () => {
    if (columnId !== currentColumnId) dispatch(setCurrentColumnId(columnId));
  };

  const [taskListDrag] = useTaskListDrag({
    title: taskListTitle,
    id: columnId,
  });

  const [columnDrop] = useColumnDrop({ columnId });
  const [taskToListDrop] = useTaskToListDrop({ columnId });

  useSetAlertResult(isSuccessColumnDelete, errorColumnDelete);
  useSetAlertResult(isSuccessColumnUpdate, errorColumnUpdate);

  return (
    <Box
      ref={(node: HTMLElement) => {
        taskListDrag(taskToListDrop(node));
        taskListDrag(columnDrop(node));
      }}
      component='article'
      sx={{
        bgcolor: '#eee',
        borderRadius: 1,
        p: 1,
        mb: 1,
        cursor: 'move',
      }}
      onMouseDown={saveCurrentColumnId}
    >
      <Box sx={{ flex: 1, height: '40px' }}>
        {isEditMode ? (
          <TaskTitleEditInput
            saveHandler={changeTitleClick}
            closeHandler={toggleEditMode}
            title={taskListTitle}
          />
        ) : (
          <Typography
            component='h4'
            variant='h5'
            onClick={toggleEditMode}
            sx={{
              width: COLUMN_WIDTH,
              cursor: 'pointer',
              transition: '0.4s',
              '&:hover': { color: 'primary.main' },
            }}
          >
            {taskListTitle}
          </Typography>
        )}
      </Box>

      <Box
        component='ul'
        sx={{
          minWidth: COLUMN_WIDTH,
          width: COLUMN_WIDTH,
          overflowY: 'scroll',
          height: { xs: '55vh', md: '65vh' },
          my: 1,
        }}
      >
        {tasks.map((task) => {
          const { id, title, order, description, userId, files } = task;
          return (
            <Task
              key={id}
              id={id}
              title={title}
              order={order}
              description={description}
              userId={userId}
              files={files}
            />
          );
        })}
      </Box>
      <Box
        component='section'
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <IconButton onClick={handleNewTaskClick}>
          <AddRoundedIcon color='primary' />
        </IconButton>
        <Button color='secondary' onClick={toggleConfirmation}>
          Delete task list
        </Button>
        <Confirmation
          itemTitle={taskListTitle}
          isOpen={isConfirmationOpen}
          toggleConfirmation={toggleConfirmation}
          handleAccept={handleTaskListDelete}
        />
      </Box>
    </Box>
  );
};

export default TaskList;
