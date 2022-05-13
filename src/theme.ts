import { createTheme, responsiveFontSizes } from '@mui/material';

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: '#006064',
        light: '#428e92',
        dark: '#00363a',
      },
      secondary: {
        main: '#f44336',
        light: '#ff7961',
        dark: '#ba000d',
      },
      text: {
        primary: '#fff',
        secondary: '#000',
      },
      success: {
        main: '#2d941b',
      },
    },
  }),
);

export default theme;
