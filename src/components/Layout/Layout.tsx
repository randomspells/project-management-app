import { Box } from '@mui/material';
import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import EditTaskForm from '../EditTaskForm/EditTaskForm';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import NewBoardForm from '../NewBoardForm/NewBoardForm';
import NewTaskListForm from '../NewTaskListForm/NewTaskListForm';

const Layout: FC = () => {
  const isAuthentificated = useAppSelector(state => state.auth.currentUser?.isAuthenticated);
  return <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      rowGap: 2,
    }}
  >
    {isAuthentificated && <Header />}
    <Outlet />
    <Footer />
    <NewBoardForm />
    <NewTaskListForm />
    <EditTaskForm />
  </Box>
};

export default Layout;
