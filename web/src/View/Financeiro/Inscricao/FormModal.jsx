import React, { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

import Autocomplete from "../../../componentes/Autocomplete";
import Inscricao from "../../../Model/Inscricao";
import api from "../../../services/api";
import { getSession } from "../../../services/auth";

const FormModal = ({ data, show, handleShow, className, membros, eventos }) => {
    const [inscricao, setInscricao] = useState({});
    const [carregando, setCarregando] = useState(false);
    const { addToast, removeAllToasts } = useToasts();
    const session = getSession();

    useEffect(() => {
        setInscricao(data);
        removeAllToasts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    useEffect(() => {
        setCarregando(false);
    }, [show]);

    const handleSubmit = async () => {
        setCarregando(true);

        const novaInscricao = new Inscricao();

        novaInscricao.id = inscricao.id ? inscricao.id : 0;
        novaInscricao.nome = inscricao.nome;
        novaInscricao.email = inscricao.email;
        novaInscricao.celular = inscricao.celular;
        novaInscricao.pago = inscricao.pago;
        novaInscricao.chEsEvento = inscricao.chEsEvento;

        let request = "";
        if (novaInscricao.id === 0) {
            request = await api.post("/inscricoes", novaInscricao, {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            });
        } else {
            request = await api.put("/inscricoes", novaInscricao, {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            });
        }

        if (!request.data.error) {
            addToast("Inscrição salva com sucesso!", { appearance: "success" });
            setInscricao({});
        } else {
            addToast("Erro ao salvar inscrição!", { appearance: "error" });
        }
        setCarregando(false);
    }

    const handleChange = e => {
        const [item, subItem] = e.target.name.split(".");

        if (subItem) {
            setInscricao({
                ...inscricao,
                [item]: {
                    [subItem]: e.target.value
                }
            });
        } else {
            setInscricao({
                ...inscricao,
                [e.target.name]: e.target.value
            });
        }
    }

    const handleClick = (item) => {

        setInscricao({
            ...inscricao,
            nome: item.nome,
            email: item.contato.email,
            celular: item.contato.celular,
            telefone: item.contato.telefone
        });
    }

    return (
        <>
            <Modal isOpen={show} toggle={handleShow} className={className}>
                <ModalHeader toggle={handleShow}>{inscricao?.id ? `#${inscricao.id} - ${inscricao?.nome}` : "Nova Inscrição"}</ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="nome">Nome:</label>
                            <Autocomplete
                                className="form-control col-md-12"
                                onClick={handleClick}
                                field="nome"
                                suggestions={membros}
                                value={inscricao.nome}
                                name="nome"
                                id="nome"
                                onChange={handleChange}
                                autoComplete="no"
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="email">E-mail:</label>
                            <input
                                className="form-control"
                                type="text"
                                name="email"
                                id="email"
                                value={inscricao.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="celular">Celular:</label>
                            <input
                                className="form-control"
                                type="text"
                                name="celular"
                                id="celular"
                                value={inscricao.celular}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="telefone">Telefone:</label>
                            <input
                                className="form-control"
                                type="text"
                                name="telefone"
                                id="telefone"
                                value={inscricao.telefone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="pago">Pago:</label>
                            <select
                                name="pago"
                                id="pago"
                                className="custom-select"
                                value={inscricao.pago}
                                onChange={handleChange}
                            >
                                <option>Escolha...</option>
                                <option value="0">Não</option>
                                <option value="1">Sim</option>
                            </select>
                        </div>
                        <div className="form-group col-md-5">
                            <label htmlFor="chEsEvento">Evento:</label>
                            <select
                                name="chEsEvento"
                                id="chEsEvento"
                                className="custom-select"
                                value={inscricao.chEsEvento}
                                onChange={handleChange}
                            >
                                <option>Escolha...</option>
                                {eventos.map((evento) => {
                                    return <option key={evento.id} value={evento.id}>{evento.descricao}</option>
                                })}
                            </select>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button type="button" color="success" onClick={() => handleSubmit()} disabled={carregando}>Salvar</Button>{' '}
                    <Button type="button" color="danger" onClick={handleShow} disabled={carregando}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default FormModal;