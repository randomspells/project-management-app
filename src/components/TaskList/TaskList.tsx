import React, { FC, useState, useEffect } from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useParams } from 'react-router-dom';
import Task from '../Task/Task';
import { TaskInterface } from '../../interfaces';
import Confirmation from '../Confirmation/Confirmation';
import { useDeleteColumnMutation } from '../../api/columns.api';
import { setAlertError, setAlertStatus, toggleAlertIsOpen } from '../../slices/alertSlice';
import { useAppDispatch } from '../../hooks';
import TaskTitleEditInput from '../Inputs/TaskTitleInput/TaskTitleInput';
import { COLUMN_WIDTH } from '../../constants';

type TaskListProps = {
  columnId: string;
  title: string;
  tasks: TaskInterface[];
};

const COLUMN_WIDTH = 270;

const TaskList: FC<TaskListProps> = ({ columnId, title: taskListTitle, tasks }) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [ deleteColumn, { error, status } ] = useDeleteColumnMutation();
  const { boardId } = useParams();
  const dispatch = useAppDispatch();

  const toggleConfirmation = () => {
    setIsConfirmationOpen(!isConfirmationOpen);
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const changeTitleClick = () => {
    toggleEditMode();
  };
  
  useEffect(() => {
    dispatch(setAlertStatus({ status }));
    dispatch(setAlertError({ error }));
  }, [status, error]);

  return (
    <Box
      component='article'
      sx={{ bgcolor: '#eee', borderRadius: 1, p: 1, mb: 1 }}
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
        <IconButton>
          <AddRoundedIcon color='primary' />
        </IconButton>
        <Button color='secondary' onClick={toggleConfirmation}>
          Delete task list
        </Button>
        <Confirmation
          itemTitle={taskListTitle}
          isOpen={isConfirmationOpen}
          toggleConfirmation={toggleConfirmation}
          handleAccept={() => {
            deleteColumn({boardId, columnId})
            .catch((e) => dispatch(setAlertError({ e })));
            dispatch(toggleAlertIsOpen()); 
          }}
        />
      </Box>
    </Box>
  );
};

export default TaskList;
