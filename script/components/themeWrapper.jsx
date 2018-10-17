import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import cyan from '@material-ui/core/colors/cyan';

const defaultTheme = createMuiTheme({
  palette: {
    primary: {
      main: teal[500]
    },
    secondary: {
      main: cyan[500]
    }
  }
});

const ThemeWrapper = ({ children }) => <MuiThemeProvider theme={defaultTheme}>{children}</MuiThemeProvider>;
export default ThemeWrapper;
