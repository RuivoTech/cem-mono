import React, { useState, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';

import api from "../../../services/api";
import { getSession } from "../../../services/auth";
import FormModal from "./FormModal";
import InfoBox from '../../../componentes/InfoBox';
import Tabela from '../../../componentes/Tabela';
import Coluna from '../../../componentes/Coluna';
import Utils from "../../../componentes/Utils";

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
    const { addToast } = useToasts();
    const session = getSession();

    useEffect(() => {
        const fetchEventos = async () => {
            document.title = "Eventos - Cadastro de membros CEM";
            let request = await api.get("/eventos", {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            });

            setEventos(request.data);
            setQuantidadeTotal(request.data.length);
        }

        if (!show) {
            fetchEventos();
        }
    }, [setQuantidadeTotal, show]);

    const eventoAtivo = (evento) => {
        return evento.status ? "Ativo" : "Inativo";
    }

    const remover = async (id) => {
        const respose = await api.delete("/eventos/" + id, {
            headers: {
                Authorization: `Bearer ${session.token}`
            }
        });

        if (!respose.data.error) {
            const items = eventos.filter(item => item.id !== id);

            setEventos(items);

            addToast("Evento removido com sucesso!", { appearance: "success" });
        } else {
            addToast("Não foi possível remover o evento!", { appearance: "error" });
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
                    <i className="fa fa-gear"></i>
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
                    <i className="fa fa-trash"></i>
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
                <InfoBox corFundo="primary" icone="user-circle-o" quantidade={quantidadeTotal} titulo="Total" />
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className="row">
                        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fa fa-search color-gray"></i>
                                        </span>
                                    </div>
                                    <input
                                        className="form-control"
                                        onChange={pesquisar}
                                        value={pesquisa}
                                        placeholder="Pesquise por evento"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
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