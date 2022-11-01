import React from "react";
import { HashRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/pt-br';

import darkTheme from "./styles/darkTheme";
import lightTheme from "./styles/lightTheme";
import CustomRoutes from "./Routes";
import { useAuth } from "./context/auth";

const App = () => {
    const { theme } = useAuth();

    return (
        <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                <CssBaseline />
                <HashRouter>
                    <CustomRoutes />
                </HashRouter>
            </LocalizationProvider>
        </ThemeProvider>
    )
}

export default App;