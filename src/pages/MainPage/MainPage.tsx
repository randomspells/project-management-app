import React, { FC, useEffect } from 'react';
import { Box, Button, Container, TextField } from '@mui/material';
import BoardList from '../../components/BoardList/BoardList';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { toggleNewBoardForm } from '../../slices/formSlice';
import { useGetUsersQuery } from '../../api/user.api';
import { getCurrentUserId } from '../../utils';
import { setUserId } from '../../slices/authSlice';

export const MainPage: FC = () => {
  const { data: users } = useGetUsersQuery();

  const login = useAppSelector((state) => state.auth.currentUser?.login);

  const dispatch = useAppDispatch();

  const handleNewBoardClick = () => {
    dispatch(toggleNewBoardForm());
  };

  useEffect(() => {
    if (users && login) {
      const userId = getCurrentUserId(users, login);
      dispatch(setUserId({ userId }));
    }
  }, [users, login]);

  return (
    <Container component='main' maxWidth='xl' sx={{ height: '100%' }}>
      <Box
        component='section'
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          rowGap: { xs: 2, sm: 4 },
        }}
      >
        <Button
          variant='outlined'
          onClick={handleNewBoardClick}
          sx={{ width: { xs: '100%', md: 'auto' }, order: { xs: 1, md: 0 } }}
        >
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
};

export default MainPage;
