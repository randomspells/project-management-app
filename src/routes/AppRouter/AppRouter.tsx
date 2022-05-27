import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../../components/sections/Layout/Layout';
import WelcomePage from '../../pages/WelcomePage/WelcomePage';
import MainPage from '../../pages/MainPage/MainPage';
import BoardPage from '../../pages/BoardPage/BoardPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import SignUpPage from '../../pages/SignUpPage/SignUpPage';
import ErrorPage from '../../pages/ErrorPage/ErrorPage';
import EditProfilePage from '../../pages/EditProfilePage/EditProfilePage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { RouteEnum } from '../../enums';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path={RouteEnum.Welcome} element={<Layout />}>
        <Route index element={<WelcomePage />} />
        <Route element={<ProtectedRoute />}>
          <Route path={RouteEnum.Main} element={<MainPage />} />
          <Route path={RouteEnum.Board} element={<BoardPage />}>
            <Route path=':boardId' element={<BoardPage />} />
          </Route>
          <Route path={RouteEnum.EditProfile} element={<EditProfilePage />} />
        </Route>
        <Route path={RouteEnum.Login} element={<LoginPage />} />
        <Route path={RouteEnum.Signup} element={<SignUpPage />} />
        <Route path='*' element={<ErrorPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
