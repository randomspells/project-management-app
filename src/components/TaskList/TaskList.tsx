import React, { FC, useState } from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Task from '../Task/Task';
import { TaskInterface } from '../../interfaces';
import Confirmation from '../Confirmation/Confirmation';
import { useAppDispatch } from '../../hooks/index';
import { toggleNewTaskForm } from '../../slices/formSlice';
import { setCurrentColumn } from '../../slices/columnSlice';

type TaskListProps = {
  columnId: string;
  title: string;
  tasks: TaskInterface[];
};

const COLUMN_WIDTH = 270;

const TaskList: FC<TaskListProps> = ({ columnId, title: taskListTitle, tasks }) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  dispatch(setCurrentColumn(columnId));

  const toggleConfirmation = () => {
    setIsConfirmationOpen(!isConfirmationOpen);
  };

  const handleNewTaskClick = () => {
    dispatch(toggleNewTaskForm());
  }

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
          handleAccept={() => console.log('Deleting task list...')} />
      </Box>
    </Box>
  );
};

export default TaskList;
