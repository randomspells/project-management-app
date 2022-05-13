import React, { FC } from 'react';
import { Grid } from '@mui/material';
import Board from '../Board/Board';
import { FAKE_BOARDS } from '../../constants';

const BoardList: FC = () => (
  <Grid
    container
    spacing={2}
    sx={{ height: { xs: 'auto', sm: '60vh', md: '75vh' }, overflowY: 'scroll', alignContent: 'start', my: 2 }}
  >
    {FAKE_BOARDS.map((board) => {
      const { id, title } = board;
      return (
        <Grid item xs={12} md={6} lg={4}>
          <Board key={id} title={title} id={id} />
        </Grid>
      );
    })}
  </Grid>
);

export default BoardList;
