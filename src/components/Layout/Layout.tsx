import { Box } from '@mui/material';
import React, { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import Alerts from '../Alerts/Alerts';
import EditTaskForm from '../EditTaskForm/EditTaskForm';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import NewBoardForm from '../NewBoardForm/NewBoardForm';
import NewTaskListForm from '../NewTaskListForm/NewTaskListForm';
import { useGetUsersQuery } from '../../api/auth.api';
import { getCurrentUserId } from '../../utils';
import { setUserId } from '../../slices/authSlice';

const Layout: FC = () => {
  const isAuthenticated = useAppSelector(
    (state) => state.auth.currentUser?.isAuthenticated,
  );
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const { data: users = [] } = useGetUsersQuery();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!(currentUser && users)) return;
    const userId = getCurrentUserId(users, currentUser.login);
    if (userId) {
      dispatch(setUserId({ userId }));
    }
  }, [currentUser, users]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        rowGap: 2,
      }}
    >
      <Alerts />
      {isAuthenticated && <Header />}
      <Outlet />
      <Footer />
      <NewBoardForm />
      <NewTaskListForm />
      <EditTaskForm />
    </Box>
  );
};

export default Layout;
