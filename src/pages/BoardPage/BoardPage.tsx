import React, { FC, lazy, Suspense, useEffect } from 'react';
import { Alert, Box, Button, Container, IconButton } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { FormattedMessage } from 'react-intl';
import { toggleNewColumnForm } from '../../slices/formSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RouteEnum } from '../../enums';
import { useGetBoardQuery } from '../../api/board.api';
import { setCurrentBoard } from '../../slices/boardSlice';
import Loader from '../../components/other/Loader/Loader';

const Column = lazy(() => import('../../components/lists/Column/Column'));

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
          <FormattedMessage id='add_task_list' />
        </Button>
      </Box>
      <Box
        component='section'
        sx={{
          flex: '1',
          display: 'flex',
          flexWrap: 'nowrap',
          overflowX: 'scroll',
          columnGap: 1.5,
          my: 2,
        }}
      >
        <Suspense fallback={<Loader />}>
          {currentBoard &&
            currentBoard.columns.map((column) => {
              const { id, title, order, tasks } = column;
              return (
                <Column
                  key={id}
                  id={id}
                  title={title}
                  order={order}
                  tasks={tasks}
                />
              );
            })}
          {!currentBoard?.columns.length && (
            <Alert severity='info'>
              <FormattedMessage id='no_task_lists' />
            </Alert>
          )}
        </Suspense>
      </Box>
    </Container>
  );
};

export default BoardPage;
