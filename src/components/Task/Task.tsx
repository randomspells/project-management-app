import React, { FC, useState } from 'react';
import { Avatar, Box, Checkbox, Divider, FormControlLabel, IconButton, Paper, Typography } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import { stringAvatar } from '../../utils';
import { TaskInterface } from '../../interfaces';
import TaskTitleEditInput from '../Inputs/TaskTitleInput/TaskTitleInput';

const Task: FC<TaskInterface> = ({ id, title, done, description }) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const {
    sx: { bgcolor },
    children,
  } = stringAvatar('jorn hsa');

  const handleTitleClick = () => {
    setIsEditMode(true);
  };

  const handleSaveButtonClick = () => {
    setIsEditMode(false);
  };

  const handleCloseButtonClick = () => {
    setIsEditMode(false);
  };

  return (
    <Paper id={id} elevation={2} sx={{ color: 'text.secondary', p: 2, mb: 2, mr: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', columnGap: 1 }}>
        <Box sx={{ flex: 1 }}>
          {isEditMode ? (
            <TaskTitleEditInput
              saveHandler={handleSaveButtonClick}
              closeHandler={handleCloseButtonClick}
              title={title}
            />
          ) : (
            <Typography
              component='h5'
              variant='h5'
              onClick={handleTitleClick}
              sx={{ textDecoration: `${done ? 'line-through' : 'none'}` }}
            >
              {title}
            </Typography>
          )}
        </Box>
        <Avatar sx={{ bgcolor, width: 30, height: 30, fontSize: 14 }}>{children}</Avatar>
      </Box>
      <Typography component='p' variant='body1'>
        {description}
      </Typography>
      <Divider variant='middle' sx={{ my: 1 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <FormControlLabel control={<Checkbox defaultChecked={done} />} label='Done' />
        <IconButton color='secondary'>
          <DeleteRoundedIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default Task;
