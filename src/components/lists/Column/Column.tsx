import React, { FC, useState } from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { FormattedMessage } from 'react-intl';
import Task from '../../cards/Task/Task';
import Confirmation from '../../modals/Confirmation/Confirmation';
import {
  useDeleteColumnMutation,
  useGetColumnQuery,
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
import { setCurrentColumn } from '../../../slices/columnSlice';
import useTaskToListDrop from '../../../hooks/useTaskToListDrop';
import useColumnDrop from '../../../hooks/useColumnDrop';

export type ColumnProps = {
  boardId: string;
  columnId: string;
};

const Column: FC<ColumnProps> = ({ boardId, columnId }) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const currentColumnId =
    useAppSelector((state) => state.column.currentColumn?.id) || null;

  const { data: column } = useGetColumnQuery({ boardId, columnId });
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
    if (title === column?.title) return;
    const columnData = {
      body: {
        title,
        order: column?.order,
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
    dispatch(setCurrentColumn({ column }));
  };

  const [columnDrag] = useColumnDrag(column);
  const [columnDrop] = useColumnDrop(column);
  const [taskToListDrop] = useTaskToListDrop({ columnId: currentColumnId });

  useSetAlertResult(isSuccessColumnDelete, errorColumnDelete);
  useSetAlertResult(isSuccessColumnUpdate, errorColumnUpdate);

  return (
    <Box
      ref={(node: HTMLElement) => {
        columnDrag(taskToListDrop(node));
        columnDrag(columnDrop(node));
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
            title={column?.title || ''}
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
            {column?.title}
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
        {column?.tasks.map((task) => {
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
          itemTitle={column?.title || ''}
          isOpen={isConfirmationOpen}
          toggleConfirmation={toggleConfirmation}
          handleAccept={handleColumnDelete}
        />
      </Box>
    </Box>
  );
};

export default Column;
