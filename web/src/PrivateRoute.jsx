import React, { useState, useEffect, useContext } from "react";
import { Route, useHistory } from "react-router-dom";
import jwt from "jsonwebtoken";

import Menu from "./componentes/Menu";
import Sidebar from "./componentes/Sidebar";
import { isSignedIn, getSession } from "./services/auth";
import { AuthContext } from "./context";
import api from "./services/api";

const PrivateRoute = ({ component: Component, path, location, name, ...resto }) => {
    const { signOut } = useContext(AuthContext);
    const history = useHistory();
    const [estaLogado, setEstaLogado] = useState(false);
    const [usuario, setUsuario] = useState({
        id: "",
        nome: "",
        email: "",
        permissoes: [{
            id: "",
            menuPermissao: "",
            grupoMenuPermissao: "",
            chEsUsuario: "",
            chEsMenuPermissao: "",
        }]
    });

    useEffect(() => {
        async function fetchUser() {
            if (isSignedIn()) {
                setEstaLogado(!estaLogado);
                const session = getSession();
                const token = jwt.decode(session.token);

                let retorno = await api.get("/usuarios/" + token.id, {
                    headers: {
                        Authorization: `Bearer ${session.token}`
                    }
                });

                setUsuario(retorno.data);
            } else {
                signOut();
                history.push("/");
            }
        }

        fetchUser().then(_ => {
            permissonExists();
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        permissonExists();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path])

    const permissonExists = () => {
        const existePermissao = usuario.permissoes.findIndex(permissao => `/${permissao.menuPermissao}` === path);

        if (existePermissao < 0) {
            history.push("/dashboard");
        }
    }

    return (
        estaLogado &&
        <>
            <Sidebar />
            <Menu nome={name} />
            <Route path={path}
                render={(props) => <Component {...props} {...resto} />}
            />
        </>
    )
}

export default PrivateRoute;