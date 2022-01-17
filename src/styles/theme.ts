import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: "#9162e4",
      main: "#5e35b1",
      dark: "#280680",
      contrastText: "#fff",
    },
    secondary: {
      light: "#e5ffff",
      main: "#4dd0e1",
      dark: "#009faf",
      contrastText: "#000",
    },
  },
});

export default theme;