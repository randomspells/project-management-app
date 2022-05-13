import { Box, Button, Container, TextField } from '@mui/material';
import React, { FC } from 'react';
import BoardList from '../../components/BoardList/BoardList';

export const MainPage: FC = () => (
  <Container component='main' sx={{ height: '100%' }}>
    <Box
      component='section'
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        rowGap: { xs: 2, sm: 4 },
      }}
    >
      <Button variant='outlined' sx={{ width: { xs: '100%', md: 'auto' }, order: { xs: 1, md: 0 } }}>
        Create Board
      </Button>
      <TextField
        id='filled-search'
        label='Search field'
        type='search'
        sx={{ width: { xs: '100%', md: 'auto' } }}
      />
    </Box>
    <BoardList />
  </Container>
);

export default MainPage;
