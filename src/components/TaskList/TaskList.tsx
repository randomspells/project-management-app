import React, { FC } from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Task from '../Task/Task';
import { TaskInterface } from '../../interfaces';

type TaskListProps = {
  title: string;
  tasks: TaskInterface[];
};

const COLUMN_WIDTH = 270;

const TaskList: FC<TaskListProps> = ({ title: taskListTitle, tasks }) => (
  <Box sx={{ bgcolor: 'primary.dark', borderRadius: 1, p: 1, mb: 1 }}>
    <Typography component='h4' variant='h5' sx={{ color: 'text.primary' }}>
      {taskListTitle}
    </Typography>
    <Box
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
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <IconButton>
        <AddRoundedIcon color='primary' />
      </IconButton>
      <Button color='secondary'>Delete column</Button>
    </Box>
  </Box>
);

export default TaskList;
