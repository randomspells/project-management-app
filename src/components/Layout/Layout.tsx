import { Box } from '@mui/material';
import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header';

const Layout: FC = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
    <Box sx={{ flex: 'none' }}>
      <Header />
    </Box>
    <Box sx={{ flex: 'auto' }}>
      <Outlet />
    </Box>
    <Box sx={{ flex: 'none' }}>
      <Footer />
    </Box>
  </Box>
);

export default Layout;
