import React, { FC, lazy, Suspense } from 'react';
import { Alert, Grid } from '@mui/material';
import { useGetBoardsQuery } from '../../../api/board.api';
import Loader from '../../other/Loader/Loader';
import { filterData } from '../../../utils';

const Board = lazy(() => import('../../cards/Board/Board'));

interface BoardListProps {
  searchValue: string;
}

const BoardList: FC<BoardListProps> = ({ searchValue }) => {
  const { data: boards = [], isLoading } = useGetBoardsQuery();

  const filterBoards = filterData(boards, searchValue);

  return (
    <Grid
      component='ul'
      container
      spacing={2}
      sx={{
        height: { xs: 'auto', sm: '60vh', md: '75vh' },
        overflowY: 'auto',
        alignContent: 'start',
        my: 0,
        pr: 1,
      }}
    >
      <Suspense fallback={<Loader />}>
        {!filterBoards.length && !isLoading && (
          <Grid item>
            <Alert severity='info'>No boards to display.</Alert>
          </Grid>
        )}
        {filterBoards.map((board) => {
          const { id, title, description } = board;
          return (
            <Grid item component='li' key={id} xs={12} md={6} lg={3}>
              <Board title={title} id={id} description={description} />
            </Grid>
          );
        })}
      </Suspense>
    </Grid>
  );
};

export default BoardList;
