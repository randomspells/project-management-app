import React, { FC, useEffect } from 'react';
import { Alert, Box, Button, Container, IconButton } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import Column from '../../components/lists/Column/Column';
import { toggleNewColumnForm } from '../../slices/formSlice';
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

  const handleNewColumnClick = () => {
    dispatch(toggleNewColumnForm());
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
        <Button variant='outlined' onClick={handleNewColumnClick}>
          Add task list
        </Button>
      </Box>
      <Box
        component='section'
        sx={{
          display: 'flex',
          flexWrap: 'nowrap',
          overflowX: 'scroll',
          columnGap: 1.5,
          my: 2,
        }}
      >
        {currentBoard &&
          currentBoard.columns.map((column) => (
            <Column key={column.id} boardId={currentBoard.id} columnId={column.id} />
          ))}
        {!currentBoard?.columns.length && (
          <Alert severity='info'>No task lists to display.</Alert>
        )}
      </Box>
    </Container>
  );
};

export default BoardPage;
