import React from 'react';

import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { store } from './store';
import theme from './styles/theme';
import AppRouter from './routes/AppRouter/AppRouter';
import ErrorBoundary from './components/other/ErrorBoundary/ErrorBoundary';

const App = () => (
  <ErrorBoundary>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <DndProvider backend={HTML5Backend}>
          <AppRouter />
        </DndProvider>
      </ThemeProvider>
    </Provider>
  </ErrorBoundary>
);

export default App;
