import React, { FC, useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import { getUserLoginById, stringAvatar } from '../../utils';
import { TaskInterface } from '../../interfaces';
import Confirmation from '../Confirmation/Confirmation';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { toggleEditTaskForm } from '../../slices/formSlice';
import { setCurrentTask } from '../../slices/taskSlice';
import { useGetUsersQuery } from '../../api/user.api';
import { useDeleteTaskMutation } from '../../api/task.api';
import { setAlertResult } from '../../slices/alertSlice';

const Task: FC<TaskInterface> = ({ id, title, order, done, description, userId }) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
  const [avatarColor, setAvatarColor] = useState<string>();
  const [avatarChildren, setAvatarChildren] = useState<string>();

  const boardId = useAppSelector((state) => state.board.currentBoard?.id);
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
      taskId: id,
    }).catch((e) => setAlertResult({ error: e }));
  };

  const handleTaskClick = () => {
    dispatch(setCurrentTask({ id, title, order, done, description, userId }));
  };

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
    <Paper
      component='li'
      id={id}
      elevation={2}
      sx={{ color: 'text.secondary', p: 2, mb: 2, mr: 1 }}
      onClick={handleTaskClick}
    >
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', columnGap: 1 }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography
            component='h5'
            variant='h5'
            sx={{ textDecoration: `${done ? 'line-through' : 'none'}` }}
          >
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
        <FormControlLabel
          control={<Checkbox defaultChecked={done} />}
          label='Done'
        />
        <Box>
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
      </Box>
    </Paper>
  );
};

export default Task;
