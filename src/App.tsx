import React, { useState } from 'react';

import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { SelectChangeEvent } from '@mui/material/Select';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { store } from './store';
import theme from './styles/theme';
import AppRouter from './routes/AppRouter/AppRouter';
import translation from './translation/messages';
import LOCALES from './translation/locales';
import ErrorBoundary from './components/other/ErrorBoundary/ErrorBoundary';

function getInitialLocale() {
  const savedLocale = localStorage.getItem('locale');
  return savedLocale || LOCALES.ENGLISH;
}

const App = () => {
  const [currentLocale, setCurrentLocale] = useState(getInitialLocale());
  const handleChange = (e: SelectChangeEvent) => {
    setCurrentLocale(e.target.value);
    localStorage.setItem('locale', e.target.value);
  };

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <IntlProvider
            messages={translation[currentLocale]}
            locale={currentLocale}
            defaultLocale={LOCALES.RUSSIAN}
          >
            <DndProvider backend={HTML5Backend}>
              <AppRouter handleChange={handleChange} />
            </DndProvider>
          </IntlProvider>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
