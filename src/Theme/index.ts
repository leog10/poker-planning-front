import { blue, pink } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true; // removes the `xs` breakpoint
    sm: true;
    md: true;
    lg: true;
    xl: true;
    drawer: true;
  }
}

export const appTheme = createTheme({
  palette: {
    // mode: 'dark',
    primary: {
      main: blue[500],
      light: blue[100]
    },
    secondary: {
      main: pink[500]
    },
    text: {
      secondary: blue[500]
    }
  },
  spacing: 10,
  typography: {
    fontFamily:
      '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif'
  },
  breakpoints: {
    values: {
      xs: 330,
      sm: 500,
      md: 1030,
      lg: 1200,
      xl: 1536,
      drawer: 600
    }
  }
});
