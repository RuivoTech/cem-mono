import React, { useMemo, useEffect, useState } from "react";
import { Route, HashRouter, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import PrivateRoute from "./PrivateRoute";
import { AuthContext } from "./context";
import { onSignIn, onSignOut, onChangeTheme, getThemeInUse } from "./services/auth";

import Login from "./View/Login";
import Home from "./View/Home";
import NotFound from "./View/NotFound";
import Recuperar from "./View/Recuperar";
import Inscricoes from "./View/Inscricoes";

import ConfiguracaoPerfil from "./View/Configuracao/Perfil";
import ConfiguracaoUsuario from "./View/Configuracao/Usuarios";

import CadastroMembros from "./View/Cadastro/Membros";
import CadastroVisitantes from "./View/Cadastro/Visitantes";
import CadastroMinisterio from "./View/Cadastro/Ministerio";
import CadastroEvento from "./View/Cadastro/Evento";

import DeliveryCampanha from "./View/Delivery/Campanha";
import DeliveryPedido from "./View/Delivery/Pedido";

import Relatorios from "./View/Relatorios";
import darkTheme from "./styles/darkTheme";
import lightTheme from "./styles/lightTheme";

const App = () => {
    const [themeInUse, setThemeInUse] = useState(getThemeInUse())
    const authContext = useMemo(() => {
        return {
            signIn: (login) => {
                onSignIn(login);
            },
            signOut: () => {
                onSignOut();
            },
            changeTheme: () => {
                const theme = onChangeTheme();
                setThemeInUse(theme);
            },
            getTheme: () => {
                return getThemeInUse();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getFaviconEl = () => {
        return document.getElementById("favicon");
    }

    useEffect(() => {
        document.title = "Cadastro de membros CEM";

        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            const favicon = getFaviconEl();

            favicon.href = "logo_cem_branca.png";
        }
    }, []);

    return (
        <AuthContext.Provider value={authContext}>
            <ThemeProvider theme={themeInUse === "dark" ? darkTheme : lightTheme}>
                <CssBaseline />
                <HashRouter>
                    <Routes>
                        <Route
                            path="/dashboard"
                            element={
                                <PrivateRoute name="Dashboard" group="Dashboard">
                                    <Home />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/membros"
                            element={
                                <PrivateRoute name="Membros" group="Secretaria">
                                    <CadastroMembros />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/visitantes"
                            element={
                                <PrivateRoute name="Visitantes" group="Secretaria">
                                    <CadastroVisitantes />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/ministerios"
                            element={
                                <PrivateRoute name="Ministérios" group="Secretaria">
                                    <CadastroMinisterio />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/eventos"
                            element={
                                <PrivateRoute name="Eventos" group="Secretaria">
                                    <CadastroEvento />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/campanhas"
                            element={
                                <PrivateRoute name="Campanhas" group="Secretaria">
                                    <DeliveryCampanha />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/pedidos"
                            element={
                                <PrivateRoute name="Pedidos" group="Secretaria">
                                    <DeliveryPedido />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/perfil"
                            element={
                                <PrivateRoute name="Perfil">
                                    <ConfiguracaoPerfil />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/usuarios"
                            element={
                                <PrivateRoute name="Usuários" group="Configurações">
                                    <ConfiguracaoUsuario />
                                </PrivateRoute>
                            }
                        />
                        <Route path="/relatorios/*" element={Relatorios} />
                        <Route path="/recuperar" element={Recuperar} />
                        <Route path="/inscricao" element={Inscricoes} />
                        <Route index path="/" element={<Login />} />
                        <Route path="*" element={NotFound} />
                    </Routes>
                </HashRouter>
            </ThemeProvider>
        </AuthContext.Provider>
    )
}

export default App;