import React, { FC, useState } from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Task from '../Task/Task';
import { TaskInterface } from '../../interfaces';
import Confirmation from '../Confirmation/Confirmation';

type TaskListProps = {
  title: string;
  tasks: TaskInterface[];
};

const COLUMN_WIDTH = 270;

const TaskList: FC<TaskListProps> = ({ title: taskListTitle, tasks }) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);

  const toggleConfirmationOpened = () => {
    setIsConfirmationOpen(!isConfirmationOpen);
  };

  return (
    <Box component='article' sx={{ bgcolor: '#eee', borderRadius: 1, p: 1, mb: 1 }}>
      <Typography component='h4' variant='h5'>
        {taskListTitle}
      </Typography>
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
      <Box component='section' sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton>
          <AddRoundedIcon color='primary' />
        </IconButton>
        <Button color='secondary' onClick={toggleConfirmationOpened}>
          Delete task list
        </Button>
        <Confirmation
          itemTitle={taskListTitle}
          isOpen={isConfirmationOpen}
          toggleOpened={toggleConfirmationOpened}
          handleAccept={() => console.log('Deleting task list...')}
        />
      </Box>
    </Box>
  );
};

export default TaskList;
