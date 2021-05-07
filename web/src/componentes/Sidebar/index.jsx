import React, { useState, useEffect, useContext } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import jwt from "jsonwebtoken";

import packageJson from '../../../package.json';

import api from "../../services/api";
import { getSession } from "../../services/auth";
import Utils from "../Utils";
import { AuthContext } from "../../context";

import "./styles.css";

const Sidebar = ({ onClick }) => {
    const history = useHistory();
    const { signOut } = useContext(AuthContext);
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
        const fetchUsuario = async () => {
            const session = getSession();
            const token = jwt.decode(session.token);

            let retorno = await api.get("/usuarios/" + token.id, {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            });

            setUsuario(retorno.data);
        };

        fetchUsuario();
    }, []);

    const sair = () => {
        signOut();

        history.push("/");
    }

    return (
        <div className="sidebar">
            <div className="col">
                <div className="user-info">
                    <span className="user-name">
                        <Link to="/configuracao/perfil" title="Meu perfil">
                            {Utils.separarString(usuario.nome, 2)}
                        </Link>
                    </span>
                    <span className="user-email">{usuario.email}</span>
                    <Link className="user-logout" to="#" onClick={sair}>
                        <i className="fa fa-sign-out"></i> <span className="d-sm-inline">Sair</span>
                    </Link>
                </div>
            </div>
            <ul className="nav flex-column flex-nowrap">
                <li className="nav-item" key="dashboard">
                    <NavLink
                        className="nav-link sidebar-link"
                        activeClassName="sidebar-link-active"
                        to="/dashboard"
                        onClick={onClick}
                    >
                        <span className="d-sm-inline">Dashboard</span>
                    </NavLink>
                </li>
                {usuario.permissoes.map(permissao => {
                    return (
                        <li className="nav-item" key={permissao.chEsMenuPermissao}>
                            <NavLink
                                className="nav-link sidebar-link"
                                activeClassName="sidebar-link-active"
                                to={`/${permissao.menuPermissao}`}
                                onClick={onClick}
                            >
                                <span className="d-sm-inline">{permissao.descricao}</span>
                            </NavLink>
                        </li>
                    )
                })}
            </ul>
            <div className="fixed-bottom">
                <div className="col">
                    <p className="h5">
                        <a
                            className="sidebar-link"
                            href="https://github.com/RuivoTech"
                            title="Todos os direitos reservados."
                            target="_blank"
                        >
                            &copy; RuivoTech
                        </a>
                    </p>
                    <span className="h6 font-weight-bold">
                        Versão{" "}
                        <a
                            href={`https://github.com/RuivoTech/cem-react/tree/${packageJson.version}`}
                            target="_blank"
                        >
                            {packageJson.version}
                        </a>
                    </span>
                </div>
            </div>
        </div>
    )
}


export default Sidebar;