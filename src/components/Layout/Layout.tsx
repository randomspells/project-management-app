import React, { FC } from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import Alerts from '../Alerts/Alerts';
import EditTaskForm from '../EditTaskForm/EditTaskForm';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import NewBoardForm from '../NewBoardForm/NewBoardForm';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import NewTaskListForm from '../NewTaskListForm/NewTaskListForm';

const Layout: FC = () => {
  const isAuthenticated = useAppSelector(
    (state) => state.auth.currentUser?.isAuthenticated,
  );

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
      <NewTaskForm />
      <EditTaskForm />
    </Box>
  );
};

export default Layout;
