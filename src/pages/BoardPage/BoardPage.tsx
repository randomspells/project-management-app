import React, { FC } from 'react';
import { Box, Button, Container, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import TaskList from '../../components/TaskList/TaskList';
import { FAKE_TASKS } from '../../constants';
import { ColumnInterface } from '../../interfaces';
import { toggleNewTaskListForm } from '../../slices/formSlice';
import { useAppDispatch } from '../../hooks';
import { RouteEnum } from '../../enums';

const FAKE_COLUMNS: ColumnInterface[] = [
  {
    id: '7b0b41b3-c01e-4139-998f-3ff25d20dc4d',
    title: 'Project',
    order: 1,
    tasks: FAKE_TASKS,
  },
  {
    id: '7b0b41b3-c01e-4139-998f-3ff25d20dc4f',
    title: 'In progress',
    order: 2,
    tasks: FAKE_TASKS.slice(0, 2),
  },
  {
    id: '7b0b41b3-c01e-4139-998f-3ff25d20dc4e',
    title: 'Done',
    order: 3,
    tasks: [],
  },
];

const BoardPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleNewTaskListClick = () => {
    dispatch(toggleNewTaskListForm());
  };

  const handleBackClick = () => {
    navigate(RouteEnum.Main);
  };

  return (
    <Container component='main' maxWidth='xl' sx={{ height: '100%' }}>
      <Box component='section' sx={{ display: 'flex', columnGap: 4 }}>
        <IconButton color='primary' onClick={handleBackClick}>
          <ArrowBackRoundedIcon />
        </IconButton>
        <Button onClick={handleNewTaskListClick}>Add task list</Button>
      </Box>
      <Box
        component='section'
        sx={{
          display: 'flex',
          flexWrap: 'nowrap',
          overflowX: 'scroll',
          columnGap: 3,
          my: 1,
        }}
      >
        {FAKE_COLUMNS.map((column) => {
          const { id, title, tasks } = column;
          return <TaskList key={id} columnId={id} title={title} tasks={tasks} />;
        })}
      </Box>
    </Container>
  );
};

export default BoardPage;
