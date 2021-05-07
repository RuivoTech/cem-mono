import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { useToasts } from "react-toast-notifications";

import Dizimo from "../../../Model/Dizimo";
import api from "../../../services/api";
import Autocomplete from "../../../componentes/Autocomplete";
import Utils from "../../../componentes/Utils";
import { getSession } from "../../../services/auth";

const Form = ({ data, show, handleShow, className, membros }) => {
    const [dizimo, setDizimo] = useState({});
    const [carregando, setCarregando] = useState(false);
    const { addToast, removeAllToasts } = useToasts();
    const session = getSession();

    useEffect(() => {
        setDizimo(data);
        removeAllToasts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    useEffect(() => {
        setCarregando(false);
    }, [show]);

    const handleSubmit = async () => {
        let response = "";
        setCarregando(true);

        const novoDizimo = new Dizimo();

        novoDizimo.id = dizimo.id ? dizimo.id : 0;
        novoDizimo.nome = dizimo.nome;
        novoDizimo.dataDizimo = dizimo.dataDizimo;
        novoDizimo.valor = dizimo.valor;
        novoDizimo.chEsMembro = dizimo.chEsMembro;

        if (Number(novoDizimo.id) !== 0) {
            response = await api.put("/dizimos", novoDizimo, {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            });
        } else {
            response = await api.post("/dizimos", novoDizimo, {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            });
        }

        if (!response.data.error) {
            addToast("Dizimo salvo com sucesso!", { appearance: "success" });
        } else {
            console.error(response.data.error);
            addToast("Alguma coisa deu errado, por favor falar com o administrador!", { appearance: "error" });
        }

        setCarregando(false);
    }

    const handleChange = event => {
        const [item, subItem] = event.target.name.split(".");

        if (subItem) {
            setDizimo({
                ...dizimo,
                [item]: {
                    ...dizimo[item],
                    [subItem]: event.target.value
                }
            });
        } else {
            setDizimo({
                ...dizimo,
                [event.target.name]: event.target.value
            });
        }
    }

    const handleClick = (membro) => {
        setDizimo({
            ...dizimo,
            nome: membro.nome,
            chEsMembro: membro.id
        });
    }

    return (
        <>
            <Modal isOpen={show} toggle={handleShow} className={className}>
                <ModalHeader toggle={handleShow}>{dizimo?.id ? `#${dizimo.id} - ${dizimo?.nome}` : "Novo Dizimo"}</ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="nome">Nome:</label>
                            <Autocomplete
                                className="form-control col-md-12"
                                onClick={handleClick}
                                field="nome"
                                suggestions={membros}
                                value={dizimo.nome}
                                name="nome"
                                id="nome"
                                onChange={handleChange}
                                autoComplete="off"
                            />
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="dataDizimo">Data:</label>
                            <input
                                className="form-control"
                                type="date"
                                name="dataDizimo"
                                id="dataDizimo"
                                value={Utils.converteData(dizimo.dataDizimo, "YYYY-MM-DD")}
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
                                value={dizimo.valor}
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

export default Form;