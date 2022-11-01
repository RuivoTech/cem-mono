import { createTheme } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#e6e6e6",
      paper: "#FFFFFF"
    },
    secondary: {
      main: "#2f4050"
    }
  }
});

export default lightTheme;