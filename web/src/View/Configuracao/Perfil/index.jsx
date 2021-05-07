import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import jwt from "jsonwebtoken";

import api from "../.././../services/api";
import { getSession } from "../../../services/auth";
import { AuthContext } from "../../../context";

const Perfil = () => {
    const history = useHistory()
    const { signOut } = useContext(AuthContext);
    const [usuario, setUsuario] = useState({});
    const [verificarSenha, setVerificarSenha] = useState("");
    const [className, setClassName] = useState("form-control");
    const [retorno, setRetorno] = useState({});
    const session = getSession();

    useEffect(() => {
        const request = async () => {
            const token = jwt.decode(session.token);
            await api.get("/usuarios/" + token.id, {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            }).then(response => {
                if (!response.data.error) {
                    setUsuario(response.data)
                }
            });
        }

        request();
    }, []);

    const handleSubmit = async () => {
        let request = "";

        try {
            request = await api.put("/usuarios", usuario, {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            });

            if (request.data.error) {
                setRetorno({
                    mensagem: request.data.error,
                    className: "danger"
                });
            } else {
                setRetorno({
                    mensagem: "Usuário alterado com sucesso!",
                    className: "success"
                });
                // eslint-disable-next-line no-restricted-globals
                const confirmar = confirm("Por favor, faça login novamente!");

                if (confirmar) {
                    signOut();
                    history.push("/");
                }
            }
        } catch (erro) {
            console.log(erro);
        }
    }

    const handleChange = event => {
        setUsuario({
            ...usuario,
            [event.target.name]: event.target.value
        })
    }

    const handleChangeSenha = event => {
        if (usuario.senha === event.target.value) {
            setClassName("form-control is-valid");
        } else {
            setClassName("form-control is-invalid");
        }

        setVerificarSenha(event.target.value);
    }

    return (
        <>
            <div className="wrapper-content d-flex justify-content-center mt-2">
                <div className="card overflow-auto" style={{ height: "80vh" }}>
                    <div className="row m-2">
                        <div className="col-sm-6 col-lg-6">
                            <div className="form-group">
                                <label htmlFor="nome">Nome:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="nome"
                                    name="nome"
                                    value={usuario?.nome}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-6">
                            <div className="form-group">
                                <label htmlFor="email">E-mail:</label>
                                <input
                                    className="form-control"
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={usuario?.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="senha">Senha:</label>
                                <input
                                    className={className}
                                    type="password"
                                    id="senha"
                                    name="senha"
                                    value={usuario?.senha}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="verificarSenha">Verificar Senha:</label>
                                <input
                                    className={className}
                                    type="password"
                                    id="verificarSenha"
                                    name="verificarSenha"
                                    value={verificarSenha}
                                    onChange={handleChangeSenha}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="position-absolute fixed-bottom p-2 border-top overflow-hidden">
                        <div className="col-md-6">
                            <button type="button" className="btn btn-success" onClick={handleSubmit}>Salvar</button>
                        </div>
                        <div className="col-md-6">
                            {retorno &&
                                <div className={"bg-" + retorno.className + " rounded"}>
                                    <p className="text-white px-2">
                                        {retorno.mensagem}
                                    </p>
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Perfil;