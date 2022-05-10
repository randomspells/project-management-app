import { Grid } from '@mui/material';
import React, { FC } from 'react';
import { BoardProps } from '../../types';
import Board from '../Board/Board';

const FAKE_BOARDS: BoardProps[] = [
  { id: '9a111e19-24ec-43e1-b8c4-13776842b8d5', title: 'Homework tasks' },
  { id: '9a111e19-24ec-43e1-b8c4-13776842b8d6', title: 'Work tasks' },
  { id: '9a111e19-24ec-43e1-b8c4-13776842b8d7', title: 'Home tasks' },
  { id: '9a111e19-24ec-43e1-b8c4-13776842b8d8', title: 'Other tasks' },
  { id: '9a111e19-24ec-43e1-b8c4-13776842b8d9', title: 'Homework tasks' },
  { id: '9a111e19-24ec-43e1-b8c4-13776842b8d0', title: 'Work tasks' },
  { id: '9a111e19-24ec-43e1-b8c4-13776842b8d1', title: 'Home tasks' },
  { id: '9a111e19-24ec-43e1-b8c4-13776842b8d2', title: 'Other tasks' },
  { id: '9a111e19-24ec-43e1-b8c4-13776842b8d3', title: 'Other tasks' },
];

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
