import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import Layout from './components/Layout/Layout';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import MainPage from './pages/MainPage/MainPage';
import BoardPage from './pages/BoardPage/BoardPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import EditProfilePage from './pages/EditProfilePage/EditProfilePage';
import { store } from './store';
import theme from './theme';
import './reset.scss';
import './index.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { RouteEnum, StorageEnum } from './enums';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path={RouteEnum.Welcome} element={<Layout />}>
              <Route index element={<WelcomePage />} />
              <Route element={<ProtectedRoute />}>
                <Route path={RouteEnum.Main} element={<MainPage />} />
                <Route path={RouteEnum.Board} element={<BoardPage />}>
                  <Route path=':boardId' element={<BoardPage />} />
                </Route>
                <Route
                  path={RouteEnum.EditProfile}
                  element={<EditProfilePage />}
                />
              </Route>
              <Route path={RouteEnum.Login} element={<LoginPage />} />
              <Route path={RouteEnum.Signup} element={<SignUpPage />} />
              <Route path='*' element={<ErrorPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
