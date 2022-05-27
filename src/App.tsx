import React from 'react';

import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store';
import theme from './styles/theme';
import AppRouter from './routes/AppRouter/AppRouter';

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  </Provider>
);

export default App;
