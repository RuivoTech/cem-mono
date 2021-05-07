import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { Link } from "react-router-dom";

const RelatorioModal = ({ show, handleShow }) => {
    const [aniversariante, setAniversariante] = useState(false);
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");
    const [sexo, setSexo] = useState("");
    const [estadoCivil, setEstadoCivil] = useState("");
    const [url, setUrl] = useState("/relatorios/membro");

    useEffect(() => {
        document.title = "Relatório de Visitantes - Cadastro de membros CEM";
    }, []);

    useEffect(() => {
        handleChangeUrl();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [aniversariante, dataFim, dataInicio, sexo, estadoCivil]);

    const handleChangeAniversariante = () => {
        setAniversariante(!aniversariante);
    }

    const handleChangeUrl = () => {
        const filtros = {};

        if (aniversariante) {
            filtros.aniversariante = aniversariante;
        }

        if (!aniversariante && dataInicio !== "") {
            filtros.dataInicio = dataInicio;
        }

        if (!aniversariante && dataFim !== "") {
            filtros.dataFim = dataFim;
        }

        if (sexo) {
            filtros.sexo = sexo;
        }

        if (estadoCivil) {
            filtros.estadoCivil = estadoCivil;
        }

        setUrl("/relatorios/membro?" + Object.keys(filtros).map((filtro) => { return `${filtro}=${filtros[filtro]}` }).join("&"));
    }

    return (
        <Modal isOpen={show} toggle={handleShow} className="modal-lg">
            <ModalHeader toggle={handleShow}>
                Relatório de Membros
            </ModalHeader>
            <ModalBody>
                <div className="row">
                    <div className="col-md-4 h3">Data de Nascimento:</div>
                    <div className="custom-control custom-checkbox col-md-8 h5">
                        <input
                            className="custom-control-input"
                            name="aniversariante"
                            id="aniversariante"
                            type="checkbox"
                            onChange={handleChangeAniversariante}
                            checked={aniversariante}
                        />
                        <label className="custom-control-label" htmlFor="aniversariante">Aniversariantes do Mês</label>
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="dataInicio">De:</label>
                        <input
                            className="form-control"
                            name="dataInicio"
                            id="dataInicio"
                            type="date"
                            onChange={e => setDataInicio(e.target.value)}
                            disabled={aniversariante}
                            value={dataInicio}
                        />
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="dataFim">Até:</label>
                        <input
                            className="form-control"
                            name="dataFim"
                            id="dataFim"
                            type="date"
                            onChange={e => setDataFim(e.target.value)}
                            disabled={aniversariante}
                            value={dataFim}
                        />
                    </div>

                    <div className="col-md-12 h3">Sexo:</div>
                    <div className="form-group col-md-2">
                        <select
                            className="form-control"
                            name="sexo"
                            onChange={e => setSexo(e.target.value)}
                            value={sexo}
                        >
                            <option value="">Escolha...</option>
                            <option value="1">Homem</option>
                            <option value="2">Mulher</option>
                        </select>
                    </div>
                    <div className="col-md-12 h3">Estado Civil:</div>
                    <div className="form-group col-md-2">
                        <select
                            name="estadoCivil"
                            className="form-control"
                            onChange={e => setEstadoCivil(e.target.value)}
                            value={estadoCivil}
                        >
                            <option value="">Escolha...</option>
                            <option value="1">Solteiro(a)</option>
                            <option value="2">Casado(a)</option>
                            <option value="3">Divorciado(a)</option>
                            <option value="4">Viúvo(a)</option>
                            <option value="5">Separado(a)</option>
                        </select>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Link to={`${url}`} target="_blank" className="btn btn-success">Gerar Relatório</Link>
                {/* <Button type="button" color="success" onClick={handleSubmit}>Gerar Relatório</Button>{' '} */}
                <Button type="button" color="danger" onClick={handleShow}>Cancelar</Button>
            </ModalFooter>
        </Modal>
    )
}

export default RelatorioModal;