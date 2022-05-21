import React, { FC } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes, Outlet } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import Layout from './components/Layout/Layout';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import MainPage from './pages/MainPage/MainPage';
import BoardPage from './pages/BoardPage/BoardPage';
import LoginForm from './components/LoginForm/LoginForm';
import SignUpForm from './components/SignUpForm/SignUpForm';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import EditProfileForm from './components/EditProfileForm';
import { store } from './store';
import theme from './theme';
import './reset.scss';
import './index.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { RouteEnum } from './enums';
import { protectedRouteInterface } from './interfaces';
import { useAppSelector } from './hooks';

const ProtectedRoute: FC<protectedRouteInterface> = ({ children }) => {
  const isAuthentificated = useAppSelector(state => state.auth.currentUser?.isAuthenticated);
  if (!isAuthentificated) {
    return <Navigate to={RouteEnum.Login} replace />;
  }

  return children || <Outlet />;
};


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
                <Route path={RouteEnum.EditProfile} element={<EditProfileForm />} />
              </Route>
              <Route path={RouteEnum.Login} element={<LoginForm />} />
              <Route path={RouteEnum.Signup} element={<SignUpForm />} />
              <Route path='*' element={<ErrorPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
