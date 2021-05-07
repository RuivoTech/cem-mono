import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { useToasts } from "react-toast-notifications";

import Oferta from "../../../Model/Oferta";
import api from "../../../services/api";
import Utils from "../../../componentes/Utils";
import { getSession } from "../../../services/auth";

const FormModal = ({ data, show, handleShow, className }) => {
    const [oferta, setOferta] = useState({});
    const [carregando, setCarregando] = useState(false);
    const { addToast, removeAllToasts } = useToasts();
    const session = getSession();

    useEffect(() => {
        setOferta(data);
        removeAllToasts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    useEffect(() => {
        setCarregando(false);
    }, [show]);

    const handleSubmit = async () => {
        let response = "";
        setCarregando(true);

        const novaOferta = new Oferta();

        novaOferta.id = oferta.id ? oferta.id : 0;
        novaOferta.valor = oferta.valor;
        novaOferta.data = oferta.data;

        if (Number(novaOferta.id) !== 0) {
            response = await api.put("/ofertas", novaOferta, {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            });
        } else {
            response = await api.post("/ofertas", novaOferta, {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            });
        }

        if (!response.data.error) {
            addToast("Oferta salva com sucesso!", { appearance: "success" });
        } else {
            console.error(response.data.error);
            addToast("Alguma coisa deu errado, por favor falar com o administrador!", { appearance: "error" });
        }

        setCarregando(false);
    }

    const handleChange = event => {
        const [item, subItem] = event.target.name.split(".");

        if (subItem) {
            setOferta({
                ...oferta,
                [item]: {
                    ...oferta[item],
                    [subItem]: event.target.value
                }
            });
        } else {
            setOferta({
                ...oferta,
                [event.target.name]: event.target.value
            });
        }
    }

    return (
        <>
            <Modal isOpen={show} toggle={handleShow} className={className}>
                <ModalHeader toggle={handleShow}>{oferta?.id ? `R$ ${oferta?.valor}` : "Nova Oferta"}</ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="form-group col-md-3">
                            <label htmlFor="data">Data:</label>
                            <input
                                className="form-control"
                                type="date"
                                name="data"
                                id="dataOferta"
                                value={Utils.converteData(oferta.data, "YYYY-MM-DD")}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="valor">Valor:</label>
                            <input
                                className="form-control"
                                type="text"
                                name="valor"
                                id="valor"
                                value={oferta.valor}
                                onChange={handleChange}
                            />
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