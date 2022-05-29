import React from 'react';

import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store';
import theme from './styles/theme';
import AppRouter from './routes/AppRouter/AppRouter';
import ErrorBoundary from './components/other/ErrorBoundary/ErrorBoundary';

const App = () => (
  <ErrorBoundary>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppRouter />
      </ThemeProvider>
    </Provider>
  </ErrorBoundary>
);

export default App;
