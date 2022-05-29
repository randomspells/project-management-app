import React, { FC, useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import { getUserLoginById, stringAvatar } from '../../../utils';
import { TaskInterface } from '../../../interfaces';
import Confirmation from '../../modals/Confirmation/Confirmation';
import { useAppDispatch, useAppSelector, useTaskDrag } from '../../../hooks';
import { toggleEditTaskForm } from '../../../slices/formSlice';
import { setCurrentTask } from '../../../slices/taskSlice';
import { useGetUsersQuery } from '../../../api/user.api';
import { useDeleteTaskMutation } from '../../../api/task.api';
import { setAlertResult } from '../../../slices/alertSlice';
import useTaskToTaskDrop from '../../../hooks/useTaskToTaskDrop';

const Task: FC<TaskInterface> = ({ id, title, description, userId, order }) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
  const [avatarColor, setAvatarColor] = useState<string>();
  const [avatarChildren, setAvatarChildren] = useState<string>();

  const board = useAppSelector((state) => state.board.currentBoard);
  const taskId = useAppSelector((state) => state.task.currentTask?.id) || null;
  const boardId =
    useAppSelector((state) => state.board.currentBoard?.id) || null;
  const columnId = useAppSelector((state) => state.column.currentId);

  const [deleteTask] = useDeleteTaskMutation();
  const { data: users } = useGetUsersQuery();

  const dispatch = useAppDispatch();

  const toggleConfirmation = () => {
    setIsConfirmationOpen(!isConfirmationOpen);
  };

  const handleEditTaskClick = () => {
    dispatch(toggleEditTaskForm());
  };

  const handleTaskDelete = () => {
    toggleConfirmation();
    deleteTask({
      boardId,
      columnId,
      taskId,
    }).catch((e) => setAlertResult({ error: e }));
  };

  const handleTaskClick = () => {
    dispatch(setCurrentTask({ id, title, description, userId, order }));
  };

  const [taskDrag] = useTaskDrag();
  const [taskToTaskDrop] = useTaskToTaskDrop({
    taskId,
    board,
    columnId,
    boardId,
  });

  useEffect(() => {
    if (!users) return;
    const login = getUserLoginById(users, userId);
    if (login) {
      const {
        sx: { bgcolor },
        children,
      } = stringAvatar(login);
      setAvatarChildren(children);
      setAvatarColor(bgcolor);
    }
  }, [users]);

  return (
    <div ref={(node: HTMLElement | null) => taskDrag(taskToTaskDrop(node))}>
      <Paper
        component='div'
        id={id}
        elevation={2}
        sx={{ color: 'text.secondary', p: 2, mb: 2, mr: 1 }}
        onMouseDown={handleTaskClick}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            columnGap: 1,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography component='h5' variant='h5'>
              {title}
            </Typography>
          </Box>
          <Avatar
            sx={{ bgcolor: avatarColor, width: 30, height: 30, fontSize: 14 }}
          >
            {avatarChildren}
          </Avatar>
        </Box>
        <Typography component='p' variant='body1'>
          {description}
        </Typography>
        <Divider variant='middle' sx={{ my: 1 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton color='primary' onClick={handleEditTaskClick}>
            <ModeEditRoundedIcon />
          </IconButton>
          <IconButton color='secondary' onClick={toggleConfirmation}>
            <DeleteRoundedIcon />
          </IconButton>
        </Box>
        <Confirmation
          itemTitle={title}
          isOpen={isConfirmationOpen}
          toggleConfirmation={toggleConfirmation}
          handleAccept={handleTaskDelete}
        />
      </Paper>
    </div>
  );
};

export default Task;
