import React, { FC } from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material/Select';
import { useAppSelector } from '../../../hooks';
import Alerts from '../../modals/Alerts/Alerts';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import NewBoardForm from '../../forms/NewBoardForm/NewBoardForm';
import NewTaskListForm from '../../forms/NewTaskListForm/NewTaskListForm';
import NewTaskForm from '../../forms/NewTaskForm/NewTaskForm';
import EditTaskForm from '../../forms/EditTaskForm/EditTaskForm';

interface LayoutProps {
  handleChange: (e: SelectChangeEvent) => void;
}

const Layout: FC<LayoutProps> = ({ handleChange }) => {
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
      {isAuthenticated && <Header handleChange={handleChange} />}
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
