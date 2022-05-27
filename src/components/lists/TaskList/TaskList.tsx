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
} from '../../../hooks';
import TaskTitleEditInput from '../../inputs/TaskTitleInput/TaskTitleInput';
import { COLUMN_WIDTH } from '../../../constants';
import { toggleNewTaskForm } from '../../../slices/formSlice';
import { setCurrentColumnId } from '../../../slices/columnSlice';

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

  const boardId = useAppSelector((state) => state.board.currentBoard?.id);
  const [deleteColumn, { isSuccess: isSuccessDelete, error: errorDelete }] =
    useDeleteColumnMutation();
  const [updateColumn] = useUpdateColumnMutation();

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

  const changeTitleClick = (value: string) => {
    const columnData = {
      body: {
        title: value,
        order: columnOrder,
      },
      boardId,
      columnId,
    };
    updateColumn(columnData).catch((e) =>
      dispatch(setAlertResult({ error: e })),
    );
    toggleEditMode();
  };

  const handleTaskListDelete = () => {
    deleteColumn({ boardId, columnId }).catch((e) =>
      dispatch(setAlertResult({ error: e })),
    );
  };

  const handleTaskListClick = () => {
    dispatch(setCurrentColumnId(columnId));
  };

  useSetAlertResult(isSuccessDelete, errorDelete);

  return (
    <Box
      component='article'
      sx={{ bgcolor: '#eee', borderRadius: 1, p: 1, mb: 1 }}
      onClick={handleTaskListClick}
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
            sx={{ width: COLUMN_WIDTH }}
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
          const { id, title, order, description, userId, done, files } = task;
          return (
            <Task
              key={id}
              id={id}
              title={title}
              order={order}
              description={description}
              userId={userId}
              done={done}
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
