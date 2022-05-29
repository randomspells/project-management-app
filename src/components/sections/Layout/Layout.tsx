import React, { FC } from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../../hooks';
import Alerts from '../../modals/Alerts/Alerts';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import NewBoardForm from '../../forms/NewBoardForm/NewBoardForm';
import NewColumnForm from '../../forms/NewColumnForm/NewColumnForm';
import NewTaskForm from '../../forms/NewTaskForm/NewTaskForm';
import EditTaskForm from '../../forms/EditTaskForm/EditTaskForm';

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
      <NewColumnForm />
      <NewTaskForm />
      <EditTaskForm />
    </Box>
  );
};

export default Layout;
