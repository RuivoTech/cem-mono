import React, { useMemo, useEffect } from "react";
import { Route, HashRouter, Routes } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import { AuthContext } from "./context";
import { onSignIn, onSignOut } from "./services/auth";

import Login from "./View/Login";
import Home from "./View/Home";
import NotFound from "./View/NotFound";
import Recuperar from "./View/Recuperar";
import Inscricoes from "./View/Inscricoes";

import ConfiguracaoPerfil from "./View/Configuracao/Perfil";
import ConfiguracaoUsuario from "./View/Configuracao/Usuarios";

import CadastroPessoas from "./View/Cadastro/Pessoas";
import CadastroMinisterio from "./View/Cadastro/Ministerio";
import CadastroEvento from "./View/Cadastro/Evento";

import DeliveryCampanha from "./View/Delivery/Campanha";
import DeliveryPedido from "./View/Delivery/Pedido";

import Relatorios from "./View/Relatorios";

const App = () => {
    const authContext = useMemo(() => {
        return {
            signIn: (login) => {
                onSignIn(login);
            },
            signOut: () => {
                onSignOut();
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
            <HashRouter>
                <Routes>
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute name="Dashboard">
                                <Home />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/pessoas"
                        element={
                            <PrivateRoute name="Pessoas">
                                <CadastroPessoas />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/ministerios"
                        element={
                            <PrivateRoute name="Ministérios">
                                <CadastroMinisterio />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/eventos"
                        element={
                            <PrivateRoute name="Eventos">
                                <CadastroEvento />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/campanhas"
                        element={
                            <PrivateRoute name="Campanhas">
                                <DeliveryCampanha />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/pedidos"
                        element={
                            <PrivateRoute name="Pedidos">
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
                            <PrivateRoute name="Usuários">
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
        </AuthContext.Provider>
    )
}

export default App;