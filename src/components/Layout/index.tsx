import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header';

const Layout: FC = () => (
  <div>
    <Header />
    <Outlet />
    <Footer />
  </div>
);

export default Layout;
