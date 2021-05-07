import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Utils from "./Utils";
import { AuthContext } from "../context";

const Usuario = ({ usuario }) => {
    const history = useHistory();
    const { signOut } = useContext(AuthContext);

    const sair = () => {
        signOut();

        history.push("/");
    }
    return (
        <div className="col">
            <div className="user-info card">
                <span className="user-name">
                    <Link to="/configuracao/perfil" style={{ color: "#77C9D4" }} title="Meu perfil">
                        {Utils.separarString(usuario.nome, 2)}
                    </Link>
                </span>
                <span className="user-email">{usuario.email}</span>
                <Link className="user-logout" to="#" onClick={sair}>
                    <i className="fa fa-sign-out"></i> <span className="d-sm-inline">Sair</span>
                </Link>
            </div>
        </div>
    )
}

export default Usuario;