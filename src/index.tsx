import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import BoardPage from './pages/BoardPage';
import ErrorPage from './pages/ErrorPage';
import MainPage from './pages/MainPage';
import WelcomePage from './pages/WelcomePage';
import './index.scss';
import './reset.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<WelcomePage />} />
          <Route path='main' element={<MainPage />} />
          <Route path='board' element={<BoardPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
