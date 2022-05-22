import React, { FC, useState } from 'react';
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
import { stringAvatar } from '../../utils';
import { TaskInterface } from '../../interfaces';
import TaskTitleEditInput from '../Inputs/TaskTitleInput/TaskTitleInput';
import Confirmation from '../Confirmation/Confirmation';
import { useAppDispatch } from '../../hooks';
import { toggleEditTaskForm } from '../../slices/formSlice';
import { setCurrentTask } from '../../slices/taskSlice';

const Task: FC<TaskInterface> = ({ id, title, done, description }) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleEditTaskClick = () => {
    dispatch(setCurrentTask({ id, title, done, description }));
    dispatch(toggleEditTaskForm());
  };

  const toggleConfirmation = () => {
    setIsConfirmationOpen(!isConfirmationOpen);
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const {
    sx: { bgcolor },
    children,
  } = stringAvatar('jorn hsa');

  return (
    <Paper
      component='li'
      id={id}
      elevation={2}
      sx={{ color: 'text.secondary', p: 2, mb: 2, mr: 1 }}
    >
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', columnGap: 1 }}
      >
        <Box sx={{ flex: 1 }}>
          {isEditMode ? (
            <TaskTitleEditInput
              saveHandler={toggleEditMode}
              closeHandler={toggleEditMode}
              title={title}
            />
          ) : (
            <Typography
              component='h5'
              variant='h5'
              onClick={toggleEditMode}
              sx={{ textDecoration: `${done ? 'line-through' : 'none'}` }}
            >
              {title}
            </Typography>
          )}
        </Box>
        <Avatar sx={{ bgcolor, width: 30, height: 30, fontSize: 14 }}>
          {children}
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
          handleAccept={() => console.log('Deleting task...')}
        />
      </Box>
    </Paper>
  );
};

export default Task;
