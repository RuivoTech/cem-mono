import React, { useMemo, useEffect } from "react";
import { Route, Switch, HashRouter } from "react-router-dom";
import { ToastProvider } from 'react-toast-notifications';

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

import CadastroMembro from "./View/Cadastro/Membro";
import CadastroVisitante from "./View/Cadastro/Visitante";
import CadastroMinisterio from "./View/Cadastro/Ministerio";
import CadastroEvento from "./View/Cadastro/Evento";

import FinanceiroDizimos from "./View/Financeiro/Dizimo";
import FinanceiroOfertas from "./View/Financeiro/Oferta";
import FinanceiroInscricao from "./View/Financeiro/Inscricao";

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
        <>
            <AuthContext.Provider value={authContext}>
                <ToastProvider autoDismiss>
                    <HashRouter>
                        <Switch>
                            <PrivateRoute exact path="/dashboard" component={Home} name="Dashboard" />
                            <PrivateRoute exact path="/membro" component={CadastroMembro} name="Membros" />
                            <PrivateRoute exact path="/visitante" component={CadastroVisitante} name="Visitantes" />
                            <PrivateRoute exact path="/ministerio" component={CadastroMinisterio} name="Ministérios" />
                            <PrivateRoute exact path="/evento" component={CadastroEvento} name="Eventos" />
                            <PrivateRoute exact path="/inscricoes" component={FinanceiroInscricao} name="Inscrições" />
                            <PrivateRoute exact path="/dizimo" component={FinanceiroDizimos} name="Dizimos" />
                            <PrivateRoute exact path="/oferta" component={FinanceiroOfertas} name="Ofertas" />
                            <PrivateRoute exact path="/perfil" component={ConfiguracaoPerfil} name="Perfil" />
                            <PrivateRoute exact path="/usuarios" component={ConfiguracaoUsuario} name="Usuários" />
                            <Route path="/relatorios/*" component={Relatorios} />
                            <Route exact path="/recuperar" component={Recuperar} />
                            <Route exact path="/inscricao" component={Inscricoes} />
                            <Route exact path="/"
                                render={(props) => <Login {...props} />} />
                            <Route path="*" component={NotFound} />
                        </Switch>
                    </HashRouter>
                </ToastProvider>
            </AuthContext.Provider>
        </>
    )
}

export default App;