import { Box } from '@mui/material';
import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import EditTaskForm from '../EditTaskForm/EditTaskForm';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import NewBoardForm from '../NewBoardForm/NewBoardForm';
import NewTaskListForm from '../NewTaskListForm/NewTaskListForm';

const Layout: FC = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', rowGap: 2 }}>
    <Header />
    <Outlet />
    <Footer />
    <NewBoardForm />
    <NewTaskListForm />
    <EditTaskForm />
  </Box>
);

export default Layout;
