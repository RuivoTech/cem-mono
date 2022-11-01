import { createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#252525",
      paper: "#3B3B3B"
    }
  }
});

export default darkTheme;