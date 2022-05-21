import React, { FC } from 'react';
import { Grid } from '@mui/material';
import Board from '../Board/Board';
import { useGetBoardsQuery } from '../../api/board.api';

const BoardList: FC = () => {
  const { data: boards = [] } = useGetBoardsQuery();

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
      {boards.map((board) => {
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
