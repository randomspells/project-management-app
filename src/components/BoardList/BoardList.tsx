import React, { FC } from 'react';
import { Grid } from '@mui/material';
import Board from '../Board/Board';
import { FAKE_BOARDS } from '../../constants';

const BoardList: FC = () => (
  <Grid
    component='ul'
    container
    spacing={2}
    sx={{ height: { xs: 'auto', sm: '60vh', md: '75vh' }, overflowY: 'auto', alignContent: 'start', my: 2, pr: 1 }}
  >
    {FAKE_BOARDS.map((board) => {
      const { id, title } = board;
      return (
        <Grid item component='li' key={id} xs={12} md={6} lg={4}>
          <Board title={title} id={id} />
        </Grid>
      );
    })}
  </Grid>
);

export default BoardList;
