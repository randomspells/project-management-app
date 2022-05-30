import React, { FC, useState } from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { FormattedMessage } from 'react-intl';
import Task from '../../cards/Task/Task';
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
  useColumnDrag,
} from '../../../hooks';
import TaskTitleEditInput from '../../Inputs/TaskTitleInput/TaskTitleInput';
import { COLUMN_WIDTH } from '../../../constants';
import { toggleNewTaskForm } from '../../../slices/formSlice';
import { setCurrentColumnId } from '../../../slices/columnSlice';
import useColumnDrop from '../../../hooks/useColumnDrop';
import { ColumnInterface } from '../../../interfaces';
import useTaskToColumnDrop from '../../../hooks/useTaskToColumnDrop';

const Column: FC<ColumnInterface> = ({
  id: columnId,
  title: columnTitle,
  order: columnOrder,
  tasks: columnTasks,
}) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const boardId = useAppSelector((state) => state.board.currentBoard?.id);

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
    if (title === columnTitle) return;
    const columnData = {
      body: {
        title,
        order: columnOrder,
      },
      boardId,
      columnId,
    };
    updateColumn(columnData).catch((e) =>
      dispatch(setAlertResult({ error: e })),
    );
  };

  const handleColumnDelete = () => {
    deleteColumn({ boardId, columnId }).catch((e) =>
      dispatch(setAlertResult({ error: e })),
    );
  };

  const saveCurrentColumnId = () => {
    dispatch(setCurrentColumnId({ columnId }));
  };

  const { columnDrag, isDragging } = useColumnDrag({ columnId });
  const { columnDrop, backgroundColor: columnBgColor } = useColumnDrop({
    columnId,
  });
  const { taskToColumnDrop, backgroundColor: taskBgColor } =
    useTaskToColumnDrop({
      columnId,
    });

  useSetAlertResult(isSuccessColumnDelete, errorColumnDelete);
  useSetAlertResult(isSuccessColumnUpdate, errorColumnUpdate);

  return (
    <Box
      ref={(node: HTMLElement) => {
        columnDrag(taskToColumnDrop(node));
        columnDrag(columnDrop(node));
      }}
      component='article'
      sx={{
        bgcolor: columnBgColor || taskBgColor || '#eee',
        borderRadius: 1,
        p: 1,
        mb: 1,
        cursor: 'move',
        opacity: isDragging ? 0.7 : 1,
        transition: '0.4s',
        '&:hover': { backgroundColor: 'primary.light' },
      }}
      onMouseDown={saveCurrentColumnId}
    >
      <Box sx={{ flex: 1, height: '40px' }}>
        {isEditMode ? (
          <TaskTitleEditInput
            saveHandler={changeTitleClick}
            closeHandler={toggleEditMode}
            title={columnTitle || ''}
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
            {columnTitle}
          </Typography>
        )}
      </Box>

      <Box
        component='ul'
        sx={{
          minWidth: COLUMN_WIDTH,
          width: COLUMN_WIDTH,
          overflowY: 'scroll',
          height: { xs: '45vh', md: '60vh' },
          my: 1,
        }}
      >
        {columnTasks.map((task) => {
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
          <FormattedMessage id='delete_task_list' />
        </Button>
        <Confirmation
          itemTitle={columnTitle || ''}
          isOpen={isConfirmationOpen}
          toggleConfirmation={toggleConfirmation}
          handleAccept={handleColumnDelete}
        />
      </Box>
    </Box>
  );
};

export default Column;
