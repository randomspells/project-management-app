import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import Layout from './components/Layout/Layout';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import MainPage from './pages/MainPage/MainPage';
import BoardPage from './pages/BoardPage/BoardPage';
import LoginForm from './components/LoginForm/LoginForm';
import SignUpForm from './components/SignUpForm/SignUpForm';
import ErrorPage from './pages/ErrorPage';
import { store } from './store';
import theme from './theme';
import './reset.scss';
import './index.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<WelcomePage />} />
              <Route path='main' element={<MainPage />} />
              <Route path='board' element={<BoardPage />} />
              <Route path='login' element={<LoginForm />} />
              <Route path='signup' element={<SignUpForm />} />
              {/* <Route path='edit-profile' element={<EditProfileForm />} /> */}
              <Route path='*' element={<ErrorPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
