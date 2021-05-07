import React, { useState, useEffect } from "react";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { useToasts } from "react-toast-notifications";

import Usuario from "../../../Model/Usuario";
import api from "../../../services/api";
import Autocomplete from "../../../componentes/Autocomplete";
import { getSession } from "../../../services/auth";

const FormModal = ({ data, show, handleShow, className, membros, listaMenu }) => {
    const [usuario, setUsuario] = useState({});
    const [tabAtivo, setTabAtivo] = useState("perfil");
    const [carregando, setCarregando] = useState(false);
    const { addToast, removeAllToasts } = useToasts();
    const session = getSession();

    useEffect(() => {
        setUsuario(data);
        removeAllToasts();
    }, [data, removeAllToasts]);

    useEffect(() => {
        setCarregando(false);
    }, [show]);

    const toggle = tab => {
        if (tabAtivo !== tab) setTabAtivo(tab);
    }

    const handleSubmit = async event => {
        event.preventDefault();

        setCarregando(true);

        const novoUsuario = new Usuario();

        novoUsuario.id = usuario.id ? usuario.id : 0;
        novoUsuario.nome = usuario.nome;
        novoUsuario.email = usuario.email;
        novoUsuario.nivel = usuario.nivel;
        novoUsuario.permissoes = usuario.permissoes;

        let response = "";

        if (Number(novoUsuario.id) !== 0) {
            response = await api.put("/usuarios", novoUsuario, {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            });
        } else {
            response = await api.post("/usuarios", novoUsuario, {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            });
        }

        if (!response.data.error) {
            addToast("Usuário salvo com sucesso!", { appearance: "success" });
        } else {
            console.error(response.data.error);
            addToast("Alguma coisa deu errado, por favor falar com o administrador!", { appearance: "error" });
        }
        setCarregando(false);
    }

    const handleChange = evento => {
        const [item, subItem] = evento.target.name.split(".");

        if (subItem) {
            setUsuario({
                ...usuario,
                [item]: {
                    ...[item],
                    [subItem]: evento.target.value
                }
            });
        } else {
            setUsuario({
                ...usuario,
                [evento.target.name]: evento.target.value
            });
        }
    }

    const handleClick = (membro) => {
        setUsuario({
            ...usuario,
            nome: membro.nome,
            email: membro.contato.email
        });
    }

    const handleChangePermissao = async event => {
        // eslint-disable-next-line no-unused-vars
        const [nulo, tipo] = event.target.name.split(".");
        const permissaoExiste = usuario.permissoes.findIndex(permissao => permissao.chEsMenuPermissao === event.target.id);
        const menuPermissao = listaMenu.filter(item => { return (Number(item.id) === Number(event.target.id) ? item : null) });

        if (permissaoExiste >= 0) {
            const permissoesFiltradas = usuario.permissoes.map(permissao => {
                return permissao.chEsMenuPermissao === event.target.id ?
                    {
                        ...permissao,
                        [tipo]: event.target.checked
                    } : permissao
            });

            setUsuario({
                ...usuario,
                permissoes: permissoesFiltradas
            });
        } else {
            setUsuario({
                ...usuario,
                permissoes: [
                    ...usuario.permissoes,
                    {
                        menuPermissao: menuPermissao[0].descricao,
                        chEsMenuPermissao: event.target.id,
                        chEsUsuario: usuario.id,
                        [tipo]: event.target.checked
                    }
                ]
            });
        }
    }

    const isChecked = (item, tipo) => {
        const checked = usuario.permissoes.filter((permissao) => {
            return Number(permissao.chEsMenuPermissao) === item.id ? permissao[tipo] : false;
        });

        return checked[0];
    }

    return (
        <>
            <Modal isOpen={show} toggle={handleShow} className={className}>
                <ModalHeader toggle={handleShow}>{usuario?.nome ? usuario?.nome : "Novo Usuário"}</ModalHeader>
                <ModalBody style={{ minHeight: "50vh" }}>
                    <div>
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={{ active: tabAtivo === 'perfil' }}
                                    onClick={() => { toggle('perfil'); }}
                                    style={{
                                        cursor: "pointer"
                                    }}
                                >
                                    Perfil
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={{ active: tabAtivo === 'permissao' }}
                                    onClick={() => { toggle('permissao'); }}
                                    style={{
                                        cursor: "pointer"
                                    }}
                                >
                                    Permissão
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={tabAtivo}>
                            <TabPane tabId="perfil">
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                            <div className="form-group">
                                                <label htmlFor="nome">Nome:</label>
                                                <Autocomplete
                                                    className="form-control"
                                                    id="nome"
                                                    name="nome"
                                                    suggestions={membros}
                                                    onChange={handleChange}
                                                    onClick={(item) => handleClick(item)}
                                                    value={usuario?.nome}
                                                    field="nome"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                            <div className="form-group">
                                                <label htmlFor="email">E-mail:</label>
                                                <input className="form-control" id="email" name="email" type="email"
                                                    value={usuario?.email} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                                            <div className="form-group">
                                                <label htmlFor="nivel">Nível:</label>
                                                <select
                                                    className="custom-select"
                                                    id="nivel"
                                                    name="nivel"
                                                    value={usuario.nivel}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Escolha...</option>
                                                    <option value="Admin">Admin</option>
                                                    <option value="Editor">Editor</option>
                                                    <option value="Secretária">Secretária</option>
                                                    <option value="Tesoureira">Tesoureira</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tabId="permissao">
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12" style={{ height: "2vh", marginTop: '2vh' }}>
                                            <div className="row">
                                                <div className="col-4">
                                                    Descrição
                                            </div>
                                                <div className="col-2">
                                                    Visualizar
                                            </div>
                                                <div className="col-2">
                                                    Editar
                                            </div>
                                                <div className="col-2">
                                                    Inserir
                                            </div>
                                                <div className="col-2">
                                                    Remover
                                            </div>
                                            </div>

                                        </div>
                                        <div className="form-group col-md-12 float-left overflow-auto" style={{ maxHeight: '40vh' }}>
                                            <ul className="list-group bg-transparent">
                                                {listaMenu.map((item, index) => {
                                                    return (
                                                        <li
                                                            key={item.id}
                                                            className="list-group-item bg-transparent border-white pl-5"
                                                        >
                                                            <div className="row">
                                                                <div className="col-4">
                                                                    {item.descricao}
                                                                </div>
                                                                <div className="col-2 text-center">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="form-check-input"
                                                                        value={item.id}
                                                                        id={item.id}
                                                                        onChange={handleChangePermissao}
                                                                        name="permissoes.visualizar"
                                                                        checked={isChecked(item, "visualizar")}
                                                                    />
                                                                </div>
                                                                <div className="col-2 text-center">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="form-check-input"
                                                                        value={item.id}
                                                                        id={item.id}
                                                                        onChange={handleChangePermissao}
                                                                        name="permissoes.alterar"
                                                                        checked={isChecked(item, "alterar")}
                                                                    />
                                                                </div>
                                                                <div className="col-2 text-center">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="form-check-input"
                                                                        value={item.id}
                                                                        id={item.id}
                                                                        onChange={handleChangePermissao}
                                                                        name="permissoes.inserir"
                                                                        checked={isChecked(item, "inserir")}
                                                                    />
                                                                </div>
                                                                <div className="col-2 text-center">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="form-check-input"
                                                                        value={item.id}
                                                                        id={item.id}
                                                                        onChange={handleChangePermissao}
                                                                        name="permissoes.remover"
                                                                        checked={isChecked(item, "remover")}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </TabPane>
                        </TabContent>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color="success" onClick={handleSubmit} disabled={carregando}>Salvar</Button>{' '}
                    <Button type="button" color="danger" onClick={handleShow} disabled={carregando}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default FormModal;