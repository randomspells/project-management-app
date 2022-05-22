import React, { FC } from 'react';
import { Box, Button, Container, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import TaskList from '../../components/TaskList/TaskList';
import { toggleNewTaskListForm } from '../../slices/formSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RouteEnum } from '../../enums';

const BoardPage: FC = () => {
  const currentBoard = useAppSelector((state) => state.board.currentBoard);

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
        {currentBoard &&
          currentBoard.columns.map((column) => {
            const { id, title, tasks } = column;
            return <TaskList key={id} title={title} tasks={tasks} />;
          })}
      </Box>
    </Container>
  );
};

export default BoardPage;
