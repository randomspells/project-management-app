import React, { useState } from 'react';

import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { SelectChangeEvent } from '@mui/material/Select';
import { store } from './store';
import theme from './styles/theme';
import AppRouter from './routes/AppRouter/AppRouter';
import translation from './translation/messages';
import LOCALES from './translation/locales';

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
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <IntlProvider messages={translation[currentLocale]} locale={currentLocale} defaultLocale={LOCALES.RUSSIAN}>
          <AppRouter handleChange={handleChange} />
        </IntlProvider>
      </ThemeProvider>
    </Provider>
  )
};

export default App;
