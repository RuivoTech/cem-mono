import React, { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

import Ministerio from "../../../Model/Ministerio";
import api from "../../../services/api";
import { getSession } from "../../../services/auth";

const FormModal = ({ data, show, handleShow, className }) => {
    const [ministerio, setMinisterio] = useState({});
    const [carregando, setCarregando] = useState(false);
    const { addToast, removeAllToasts } = useToasts();
    const session = getSession();

    useEffect(() => {
        console.log(data);
        setMinisterio(data);
        removeAllToasts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    useEffect(() => {
        setCarregando(false);
    }, [show]);

    const handleSubmit = async () => {
        let response = "";
        setCarregando(true);

        const novoMinisterio = new Ministerio();

        novoMinisterio.id = ministerio.id ? ministerio.id : 0;
        novoMinisterio.nome = ministerio.nome;
        novoMinisterio.descricao = ministerio.descricao;

        if (Number(novoMinisterio.id) !== 0) {
            response = await api.put("/ministerios", novoMinisterio, {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            });
        } else {
            response = await api.post("/ministerios", novoMinisterio, {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            });
        }

        if (!response.data.error) {
            addToast("Ministerio salvo com sucesso!", { appearance: "success" });
        } else {
            console.error(response.data.error);
            addToast("Alguma coisa deu errado, por favor falar com o administrador!", { appearance: "error" });
        }

        setCarregando(false);
    }

    const handleChange = event => {
        setMinisterio({
            ...ministerio,
            [event.target.name]: event.target.value
        });
    }

    return (
        <>
            <Modal isOpen={show} toggle={handleShow} className={className}>
                <ModalHeader toggle={handleShow}>{ministerio?.id ? `#${ministerio.id} - ${ministerio?.nome}` : "Novo Ministerio"}</ModalHeader>
                <ModalBody>
                    <div>
                        <div className="row">
                            <div className="form-group col-md-6">
                                <label htmlFor="nome">Nome:</label>
                                <input className="form-control" id="nome" name="nome" type="text" value={ministerio.nome} required
                                    onChange={handleChange} />
                            </div>
                            <div className="col-md-6"></div>
                            <div className="form-group col-md-8">
                                <label htmlFor="descricao">Descrição:</label>
                                <textarea className="form-control" name="descricao" id="descricao" value={ministerio.descricao} rows="10"
                                    onChange={handleChange} />
                            </div>
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