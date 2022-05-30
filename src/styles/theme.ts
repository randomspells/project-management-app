import { createTheme, responsiveFontSizes } from '@mui/material';

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: '#006064',
        light: '#dde5f0',
        dark: '#00363a',
      },
      secondary: {
        main: '#f44336',
        light: '#ff7961',
        dark: '#ba000d',
      },
      success: {
        main: '#2d941b',
      },
    },
  }),
);

export default theme;
