import React, { FC } from 'react';
import { Grid } from '@mui/material';
import Board from '../../cards/Board/Board';
import { useGetBoardsQuery } from '../../../api/board.api';
import Loader from '../../other/Loader/Loader';

interface BoardListProps {
  searchValue: string;
}

const BoardList: FC<BoardListProps> = ({ searchValue }) => {
  const { data: boards = [], isLoading } = useGetBoardsQuery();

  return (
    <Grid
      component='ul'
      container
      spacing={2}
      sx={{
        height: { xs: 'auto', sm: '60vh', md: '75vh' },
        overflowY: 'auto',
        alignContent: 'start',
        my: 2,
        pr: 1,
      }}
    >
      {isLoading && <Loader />}
      {boards.filter((board) => {
        if (searchValue.length > 0) {
          return board.title.toLowerCase().includes(searchValue.toLowerCase());
        }
        return true;
      }).map((board) => {
        const { id, title, description } = board;
        return (
          <Grid item component='li' key={id} xs={12} md={6} lg={3}>
            <Board title={title} id={id} description={description} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default BoardList;
