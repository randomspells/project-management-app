import { Card, CardContent, IconButton, Typography } from '@mui/material';
import React, { FC } from 'react';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { BoardProps } from '../../types';

const Board: FC<BoardProps> = ({ id, title }) => (
  <Card id={id} sx={{ bgcolor: 'primary.dark' }}>
    <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography component='h5' variant='h5'>
        {title}
      </Typography>
      <IconButton aria-label='add to favorites' color='secondary'>
        <DeleteForeverRoundedIcon />
      </IconButton>
    </CardContent>
  </Card>
);

export default Board;
