import React, { useState, useEffect } from "react";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { useToasts } from 'react-toast-notifications';
import Axios from "axios";

import Visitante from "../../../Model/Visitante";
import Utils from "../../../componentes/Utils";
import api from "../../../services/api";
import { getSession } from "../../../services/auth";

const FormModal = ({ data, show, handleShow, className }) => {
    const [visitante, setVisitante] = useState({});
    const [tabAtivo, setTabAtivo] = useState("perfil");
    const [carregando, setCarregando] = useState(false);
    const { addToast, removeAllToasts } = useToasts();
    const session = getSession();

    useEffect(() => {
        setVisitante(data);
        removeAllToasts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const toggle = tab => {
        if (tabAtivo !== tab) setTabAtivo(tab);
    }

    const handleSubmit = async () => {
        let response = "";
        setCarregando(true);

        const novoVisitante = new Visitante();

        novoVisitante.id = visitante.id ? visitante.id : 0;
        novoVisitante.nome = visitante.nome;
        novoVisitante.dataVisita = visitante.dataVisita;
        novoVisitante.dataCadastro = visitante.dataCadastro;
        novoVisitante.querVisita = visitante.querVisita;
        novoVisitante.religiao = visitante.religiao;

        novoVisitante.contato.id = visitante.contato.id;
        novoVisitante.contato.email = visitante.contato.email;
        novoVisitante.contato.telefone = visitante.contato.telefone;
        novoVisitante.contato.celular = visitante.contato.celular;

        novoVisitante.endereco.id = visitante.endereco?.id;
        novoVisitante.endereco.cep = visitante?.endereco?.cep;
        novoVisitante.endereco.logradouro = visitante?.endereco?.logradouro;
        novoVisitante.endereco.numero = visitante?.endereco?.numero;
        novoVisitante.endereco.complemento = visitante?.endereco?.complemento;
        novoVisitante.endereco.cidade = visitante?.endereco?.cidade;
        novoVisitante.endereco.uf = visitante?.endereco?.uf;

        if (Number(novoVisitante.id) !== 0) {
            response = await api.put("/visitantes", novoVisitante, {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            });
        } else {
            response = await api.post("/visitantes", novoVisitante, {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            });
        }

        if (!response.data.error) {
            addToast("Visitante salvo com sucesso!", { appearance: "success" });
        } else {
            console.error(response.data.error);
            addToast("Alguma coisa deu errado, por favor falar com o administrador!", { appearance: "error" });
        }

        setCarregando(false);
    }

    const handleChange = event => {
        const [item, subItem] = event.target.name.split(".");

        if (subItem) {
            setVisitante({
                ...visitante,
                [item]: {
                    ...visitante[item],
                    [subItem]: event.target.value
                }
            });
        } else {
            setVisitante({
                ...visitante,
                [event.target.name]: event.target.value
            });
        }
    }

    const handleBlur = async evento => {
        let data = await Axios.get("https://viacep.com.br/ws/" + evento.target.value + "/json/");

        data = data.data;

        setVisitante({
            ...visitante,
            endereco: {
                ...visitante.endereco,
                logradouro: data.logradouro,
                cidade: data.localidade,
                uf: data.uf
            }
        });
    }

    return (
        <>
            <Modal isOpen={show} toggle={handleShow} className={className}>
                <ModalHeader toggle={handleShow}>{visitante?.id ? `#${visitante.id} - ${visitante?.nome}` : "Novo Visitante"}</ModalHeader>
                <ModalBody>
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
                                    className={{ active: tabAtivo === 'contato' }}
                                    onClick={() => { toggle('contato'); }}
                                    style={{
                                        cursor: "pointer"
                                    }}
                                >
                                    Contato
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={{ active: tabAtivo === 'endereco' }}
                                    onClick={() => { toggle('endereco'); }}
                                    style={{
                                        cursor: "pointer"
                                    }}
                                >
                                    Endereço
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={tabAtivo}>
                            <TabPane tabId="perfil">
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="nome">Nome:</label>
                                            <input
                                                onChange={handleChange}
                                                value={visitante.nome}
                                                className="form-control"
                                                id="nome"
                                                name="nome"
                                                type="text"
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6"></div>
                                        <div className="form-group col-md-4">
                                            <label>Deseja uma visita?</label>
                                            <div className="custom-control custom-radio">
                                                <input
                                                    onChange={handleChange}
                                                    value="0"
                                                    type="radio"
                                                    className="custom-control-input"
                                                    id="querVisitaSim"
                                                    name="querVisita"
                                                    checked={visitante.querVisita === 0 ? "checked" : null}
                                                />
                                                <label className="custom-control-label" htmlFor="querVisitaSim">Sim</label>
                                            </div>
                                            <div className="custom-control custom-radio">
                                                <input
                                                    onChange={handleChange}
                                                    value="1"
                                                    type="radio"
                                                    className="custom-control-input"
                                                    id="querVisitaNao"
                                                    name="querVisita"
                                                    checked={visitante.querVisita === 1 ? "checked" : null}
                                                />
                                                <label className="custom-control-label" htmlFor="querVisitaNao">Não</label>
                                            </div>
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label htmlFor="dataVisita">Data de Visita:</label>
                                            <input
                                                onChange={handleChange}
                                                value={Utils.converteData(visitante.dataVisita, "YYYY-MM-DD")}
                                                className="form-control"
                                                id="dataVisita"
                                                name="dataVisita"
                                                type="date"
                                            />
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label htmlFor="religiao">Religião:</label>
                                            <input
                                                onChange={handleChange}
                                                value={visitante.religiao}
                                                className="form-control"
                                                id="religiao"
                                                name="religiao"
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tabId="contato">
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="email">E-mail:</label>
                                            <input
                                                onChange={handleChange}
                                                value={visitante?.contato?.email}
                                                className="form-control"
                                                id="email"
                                                name="contato.email"
                                                type="email"
                                            />
                                        </div>
                                        <div className="col-md-6"></div>
                                        <div className="form-group col-md-3">
                                            <label htmlFor="telefone">Telefone:</label>
                                            <input
                                                onChange={handleChange}
                                                value={visitante?.contato?.telefone}
                                                className="form-control"
                                                id="telefone"
                                                name="contato.telefone"
                                                type="text"
                                            />
                                        </div>

                                        <div className="form-group col-md-3">
                                            <label htmlFor="celular">Celular:</label>
                                            <input
                                                onChange={handleChange}
                                                value={visitante?.contato?.celular}
                                                className="form-control"
                                                id="celular"
                                                name="contato.celular"
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tabId="endereco">
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-sm-4 col-md-4 col-lg-4">
                                            <label htmlFor="cep">CEP:</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="fa fa-map-marker"></i>
                                                    </span>
                                                </div>
                                                <input
                                                    onChange={handleChange}
                                                    value={visitante?.endereco?.cep}
                                                    type="text"
                                                    className="form-control"
                                                    id="cep"
                                                    name="endereco.cep"
                                                    onBlur={handleBlur}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-6 col-lg-6"></div>
                                        <div className="col-sm-6 col-md-6 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="logradouro">Endereço:</label>
                                                <input
                                                    onChange={handleChange}
                                                    value={visitante?.endereco?.logradouro}
                                                    className="form-control"
                                                    id="logradouro"
                                                    name="endereco.logradouro"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-2 col-md-2 col-lg-2">
                                            <div className="form-group">
                                                <label htmlFor="numero">Número:</label>
                                                <input
                                                    onChange={handleChange}
                                                    value={visitante?.endereco?.numero}
                                                    className="form-control"
                                                    id="numero"
                                                    name="endereco.numero"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-md-4 col-lg-4">
                                            <div className="form-group">
                                                <label htmlFor="complemento">Complemento:</label>
                                                <input
                                                    onChange={handleChange}
                                                    value={visitante?.endereco?.complemento}
                                                    className="form-control"
                                                    id="complemento"
                                                    name="endereco.complemento"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-md-4 col-lg-4">
                                            <div className="form-group">
                                                <label htmlFor="cidade">Cidade:</label>
                                                <input
                                                    onChange={handleChange}
                                                    value={visitante?.endereco?.cidade}
                                                    className="form-control"
                                                    id="cidade"
                                                    name="endereco.cidade"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-md-4 col-lg-4">
                                            <div className="form-group">
                                                <label htmlFor="uf">Estado:</label>
                                                <input
                                                    onChange={handleChange}
                                                    value={visitante?.endereco?.uf}
                                                    className="form-control"
                                                    id="uf"
                                                    name="endereco.uf"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPane>
                        </TabContent>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color="success" onClick={() => handleSubmit()} disabled={carregando}>Salvar</Button>{' '}
                    <Button type="button" color="danger" onClick={handleShow} disabled={carregando}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default FormModal;