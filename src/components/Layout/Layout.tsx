import { Box } from '@mui/material';
import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const Layout: FC = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', rowGap: 2 }}>
    <Header />
    <Outlet />
    <Footer />
  </Box>
);

export default Layout;
