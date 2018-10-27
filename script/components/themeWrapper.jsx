import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';

const defaultTheme = createMuiTheme({
  palette: {
    primary: {
      main: indigo[900]
    },
    secondary: {
      main: indigo[100]
    }
  },
  typography: {
    fontFamily: 'Special Elite'
  }
});

const ThemeWrapper = ({ children }) => <MuiThemeProvider theme={defaultTheme}>{children}</MuiThemeProvider>;
export default ThemeWrapper;
