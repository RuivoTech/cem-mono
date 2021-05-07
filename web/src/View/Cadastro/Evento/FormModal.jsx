import React, { useState, useEffect } from "react";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useToasts } from "react-toast-notifications";

import Evento from "../../../Model/Evento";
import api from "../../../services/api";
import Utils from "../../../componentes/Utils";
import { getSession } from "../../../services/auth";

const FormModal = ({ data, show, handleShow, className }) => {
    const [evento, setEvento] = useState({});
    const [carregando, setCarregando] = useState(false);
    const { addToast, removeAllToasts } = useToasts();
    const session = getSession();

    useEffect(() => {
        setEvento(data);
        removeAllToasts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    useEffect(() => {
        setCarregando(false);
    }, [show]);

    const handleSubmit = async () => {
        let response = "";
        setCarregando(true);

        const novoEvento = new Evento();

        novoEvento.id = evento.id ? evento.id : 0;
        novoEvento.titulo = evento.titulo;
        novoEvento.tipo = evento.tipo;
        novoEvento.status = evento.status;
        novoEvento.repete = evento.repete;
        novoEvento.diaSemana = evento.diaSemana;
        novoEvento.frequencia = evento.frequencia;
        novoEvento.valor = (evento.valor / 100).toFixed(2);
        novoEvento.ehPago = evento.ehPago;
        novoEvento.dataInicio = evento.dataInicio;
        novoEvento.dataFim = evento.dataFim;
        novoEvento.horaInicio = evento.horaInicio;
        novoEvento.horaFim = evento.horaFim;

        if (Number(novoEvento.id) !== 0) {
            response = await api.put("/eventos", novoEvento, {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            });
        } else {
            response = await api.post("/eventos", novoEvento, {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            });
        }

        if (!response.data.error) {
            addToast("Evento salvo com sucesso!", { appearance: "success" });
        } else {
            console.error(response.data.error);
            addToast("Alguma coisa deu errado, por favor falar com o administrador!", { appearance: "error" });
        }

        setCarregando(false);
    }

    const handleChange = event => {
        const [item, subItem] = event.target.name.split(".");
        console.log(event.target.value);
        if (subItem) {
            setEvento({
                ...evento,
                [item]: {
                    ...evento[item],
                    [subItem]: event.target.value
                }
            });
        } else {
            setEvento({
                ...evento,
                [event.target.name]: event.target.value
            });
        }
    }

    const handleChangeBox = (event) => {
        setEvento({
            ...evento,
            [event.target.name]: event.target.checked
        });
    }

    const handleChangeMoney = (event) => {
        let value = "";
        if (event.key === "Backspace") {
            value = evento.valor.toString().slice(0, -1);
        } else if (event.key >= 0 && event.key <= 9) {
            value = `${evento.valor}${event.key}`.replace("undefined", "");
        }

        setEvento({
            ...evento,
            valor: value
        });
    }

    return (
        <>
            <Modal isOpen={show} toggle={handleShow} className={className}>
                <ModalHeader toggle={handleShow}>{evento?.id ? `#${evento.id} - ${evento?.descricao}` : "Novo Evento"}</ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="titulo">Titulo:</label>
                            <input
                                className="form-control"
                                id="titulo"
                                name="titulo"
                                type="text"
                                value={evento.titulo}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="Status">Status:</label>
                            <select
                                name="status"
                                id="status"
                                className="custom-select"
                                value={evento.status}
                                onChange={handleChange}
                            >
                                <option>Escolha...</option>
                                <option value="1">Ativo</option>
                                <option value="0">Inativo</option>
                            </select>
                        </div>
                        <div className="col-md-4"></div>
                        <div className="col-md-2">
                            <label htmlFor="ehPago">É pago?</label>
                            <div className="custom-control custom-switch">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="ehPago"
                                    name="ehPago"
                                    checked={evento.ehPago}
                                    onChange={handleChangeBox}
                                />
                                <label className="custom-control-label" htmlFor="ehPago">
                                    {evento.ehPago ? "Sim" : "Não"}
                                </label>
                            </div>
                        </div>
                        {evento.ehPago ?
                            <div className="col-md-2">
                                <label htmlFor="valor">Valor:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="valor"
                                    name="valor"
                                    onKeyDown={handleChangeMoney}
                                    value={Utils.converteMoeda(evento.valor, true)}
                                />
                            </div> :
                            <div className="col-md-2"></div>
                        }
                        <div className="col-md-8"></div>
                        <div className="col-md-2">
                            <label htmlFor="repete">Se repete?</label>
                            <div className="custom-control custom-switch">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="repete"
                                    name="repete"
                                    checked={evento.repete}
                                    onChange={handleChangeBox}
                                />
                                <label className="custom-control-label" htmlFor="repete">
                                    {evento.repete ? "Sim" : "Não"}
                                </label>
                            </div>
                        </div>
                        {evento.repete ?
                            <>
                                <div className="col-md-3">
                                    <label htmlFor="diaSemana">Dia da Semana</label>
                                    <select
                                        name="diaSemana"
                                        value={evento.diaSemana}
                                        className="custom-select"
                                        onChange={handleChange}
                                    >
                                        <option>Escolha...</option>
                                        <option value="0">Domingo</option>
                                        <option value="1">Segunda</option>
                                        <option value="2">Terça</option>
                                        <option value="3">Quarta</option>
                                        <option value="4">Quinta</option>
                                        <option value="5">Sexta</option>
                                        <option value="6">Sábado</option>
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="frequencia">Frequência</label>
                                    <select
                                        name="frequencia"
                                        id="frequencia"
                                        value={evento.frequencia}
                                        className="custom-select"
                                        onChange={handleChange}
                                    >
                                        <option>Escolha...</option>
                                        <option value="0">Diária</option>
                                        <option value="1">Semanal</option>
                                        <option value="2">Mensal</option>
                                        <option value="3">Bimestral</option>
                                        <option value="4">Trimestral</option>
                                        <option value="5">Semestral</option>
                                        <option value="6">Anual</option>
                                    </select>
                                </div>
                            </> :
                            <>
                                <div className="form-group col-md-3">
                                    <label htmlFor="dataInicio">Data Inicial:</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="dataInicio"
                                        name="dataInicio"
                                        value={Utils.converteData(evento.dataInicio, "YYYY-MM-DD")}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group col-md-3">
                                    <label htmlFor="dataFim">Data Final:</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="dataFim"
                                        name="dataFim"
                                        value={Utils.converteData(evento.dataFim, "YYYY-MM-DD")}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        }
                        <div className="col-md-4"></div>
                        <div className="col-md-2">
                            <label htmlFor="tipo">Tipo:</label>
                            <select
                                name="tipo"
                                value={evento.tipo}
                                className="custom-select"
                                onChange={handleChange}
                                id="tipo"
                            >
                                <option>Escolha...</option>
                                <option value="0">Interno</option>
                                <option value="1">Externo</option>
                            </select>
                        </div>
                        {evento.tipo === "0" &&
                            <>
                                <div className="form-group col-md-3">
                                    <label htmlFor="horaInicio">Hora Inicial:</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        id="horaInicio"
                                        name="horaInicio"
                                        value={evento.horaInicio}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group col-md-3">
                                    <label htmlFor="horaFim">Hora Final:</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        id="horaFim"
                                        name="horaFim"
                                        value={evento.horaFim}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        }
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