import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";

import CustomMenu from "./componentes/CustomMenu";
import Sidebar from "./componentes/Sidebar";
import { isSignedIn, getSession } from "./services/auth";
import { AuthContext } from "./context";
import api from "./services/api";
import NotFound from "./View/NotFound";

const PrivateRoute = ({ path, children, name, group = "" }) => {
    const { signOut } = useContext(AuthContext);
    const [sidebarIsOpened, setSidebarIsOpened] = useState(false);
    const navigate = useNavigate();
    const [estaLogado, setEstaLogado] = useState(false);
    const [loading, setLoading] = useState(true);
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
                setLoading(!loading);
            } else {
                signOut();
                navigate("/", { replace: true });
            }
        }

        fetchUser().then(_ => {
            if (!loading) {
                permissonExists();
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!loading) {
            permissonExists();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path])

    const permissonExists = () => {
        const existePermissao = usuario.permissoes.findIndex(permissao => `/${permissao.menuPermissao}` === path);

        if (existePermissao < 0) {
            navigate("/dashboard", { replace: true });
        }
    }

    const handleSwitchSidebar = (event) => {
        setSidebarIsOpened(!sidebarIsOpened);
    }

    if (!estaLogado) {
        return <NotFound />;
    }

    return (
        <>
            <CustomMenu switchSidebar={handleSwitchSidebar} name={group} />
            <Sidebar sidebarIsOpened={sidebarIsOpened} switchSidebar={event => handleSwitchSidebar(event)} />
            <div className="container-fluid">
                {children}
            </div>
        </>
    )
}

export default PrivateRoute;