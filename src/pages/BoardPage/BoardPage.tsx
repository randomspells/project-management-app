import React, { FC, useEffect } from 'react';
import { Alert, Box, Button, Container, IconButton } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import TaskList from '../../components/lists/TaskList/TaskList';
import { toggleNewTaskListForm } from '../../slices/formSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RouteEnum } from '../../enums';
import { useGetBoardQuery } from '../../api/board.api';
import { setCurrentBoard } from '../../slices/boardSlice';

const BoardPage: FC = () => {
  const currentBoard = useAppSelector((state) => state.board.currentBoard);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { boardId } = useParams();

  const { data: board } = useGetBoardQuery(boardId || skipToken);

  const handleNewTaskListClick = () => {
    dispatch(toggleNewTaskListForm());
  };

  const handleBackClick = () => {
    navigate(RouteEnum.Main);
  };

  useEffect(() => {
    if (board) {
      dispatch(setCurrentBoard(board));
    }
  }, [board]);

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
          columnGap: 1.5,
          my: 1,
        }}
      >
        {currentBoard &&
          currentBoard.columns.map((column) => {
            const { id, order, title, tasks } = column;
            return (
              <TaskList
                key={id}
                columnId={id}
                columnOrder={order}
                title={title}
                tasks={tasks}
              />
            );
          })}
        {!currentBoard?.columns.length && <Alert severity="info">No task lists to display.</Alert>}
      </Box>
    </Container>
  );
};

export default BoardPage;
