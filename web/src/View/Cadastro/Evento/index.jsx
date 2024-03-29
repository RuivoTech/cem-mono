import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import api from "../../../services/api";
import FormModal from "./FormModal";
import InfoBox from '../../../componentes/InfoBox';
import Tabela from '../../../componentes/Tabela';
import Coluna from '../../../componentes/Coluna';
import Utils from "../../../componentes/Utils";
import { useAuth } from '../../../context/auth';

const frequencia = [
    "Diária",
    "Semanal",
    "Mensal",
    "Bimestral",
    "Trimestral",
    "Semestral",
    "Anual"
]

const diaSemana = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
]

const Evento = () => {
    const [eventos, setEventos] = useState([]);
    const [eventoSelecionado, setEventoSelecionado] = useState({});
    const [quantidadeTotal, setQuantidadeTotal] = useState(0);
    const [show, setShow] = useState(false);
    const [eventosPesquisa, setEventosPesquisa] = useState([]);
    const [pesquisa, setPesquisa] = useState("");
    const {user } = useAuth();

    useEffect(() => {
            fetchEventos();
    }, [user, show]);

    const fetchEventos = async () => {
        document.title = "Eventos - Cadastro de membros CEM";
        let request = await api.get("/eventos");
        if(!request.data.error) {
            setEventos(request.data);
            setQuantidadeTotal(request.data.length);
        }
    }

    const eventoAtivo = (evento) => {
        return evento.status ? "Ativo" : "Inativo";
    }

    const remover = async (id) => {
        const respose = await api.delete("/eventos/" + id);

        if (!respose.data.error) {
            const items = eventos.filter(item => item.id !== id);

            setEventos(items);

            alert("Evento removido com sucesso!", { appearance: "success" });
        } else {
            alert("Não foi possível remover o evento!", { appearance: "error" });
        }
    }

    const pesquisar = e => {
        let filteredSuggestions = eventos.filter((suggestion) => {
            return suggestion.titulo
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .includes(
                    e.currentTarget.value
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .toLowerCase()
                );
        });

        setEventosPesquisa(filteredSuggestions);
        setPesquisa(e.target.value);
    }

    const opcoes = (evento) => {
        return (
            <>
                <button
                    key={evento.id + "editar"}
                    className="btn btn-primary btn-xs"
                    onClick={() => {
                        setEventoSelecionado(evento);
                        setShow(true);
                    }}
                    title="Editar evento"
                >
                    <FontAwesomeIcon icon={["fas", "cog"]} />
                </button>
                {' '}
                <button
                    key={evento.id + "remover"}
                    type="button"
                    onClick={() => remover(evento.id)}
                    value={evento.id}
                    className="btn btn-danger btn-xs"
                    title="Remover evento"
                >
                    <FontAwesomeIcon icon={["fas", "trash"]} />
                </button>
            </>
        )
    }

    const handleShow = () => {
        setEventoSelecionado({});
        setShow(!show);
    }

    const setDiaSemana = (day) => {
        return diaSemana[day];
    }

    return (
        <>
            <div className="wrapper-content row">
                <div className="col-4">
                <InfoBox corFundo="primary" icone="calendar-week" quantidade={quantidadeTotal} titulo="Total" />
                </div>
                <div className="col-sm-12 col-md-12 col-lg-12 px-4">
                    <div className="row">
                        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <FontAwesomeIcon icon={faSearch} />
                                        </span>
                                    </div>
                                    <input
                                        className="form-control"
                                        onChange={pesquisar}
                                        value={pesquisa}
                                        placeholder="Pesquise por nome"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 px-4">
                    <div className="overflow-hidden align-items-center">
                        <Tabela
                            data={pesquisa ? eventosPesquisa : eventos}
                            titulo="Eventos"
                            mostrarBotaoNovo={true}
                            tituloBotao="Novo Evento"
                            handleShow={handleShow}
                        >
                            <Coluna campo="titulo" titulo="Titulo" tamanho="10" />
                            <Coluna campo="status" titulo="Status" corpo={(item) => eventoAtivo(item)} tamanho="2" />
                            <Coluna campo="ehPago" titulo="Pago" corpo={(item) => item.ehPago ? "Sim" : "Não"} tamanho="2" />
                            <Coluna campo="valor" titulo="Valor" corpo={(item) => item.valor ? Utils.converteMoeda(item.valor) : "-"} tamanho="3" />
                            <Coluna campo="repete" titulo="Repete" corpo={(item) => item.repete ? "Sim" : "Não"} tamanho="2" />
                            <Coluna
                                campo="diaSemana"
                                titulo="Dia da Semana"
                                tamanho="4"
                                corpo={(item) => setDiaSemana(item.diaSemana)}
                            />
                            <Coluna
                                campo="frequencia"
                                titulo="Frequência"
                                corpo={(item) => frequencia[item.frequencia]}
                                tamanho="3"
                            />
                            <Coluna
                                campo="dataInicio"
                                titulo="Data Inicial"
                                corpo={(item) => Utils.converteData(item.dataInicio, "DD/MM/YYYY")}
                                tamanho="5"
                            />
                            <Coluna
                                campo="dataFim"
                                titulo="Data Final"
                                corpo={(item) => Utils.converteData(item.dataFim, "DD/MM/YYYY")}
                                tamanho="5"
                            />
                            <Coluna titulo="Opções" corpo={(item) => opcoes(item)} tamanho="5" />
                        </Tabela>
                    </div>
                </div>
            </div>
            <FormModal className="modal-lg" data={eventoSelecionado} show={show} handleShow={handleShow} />
        </>
    )
}

export default Evento;