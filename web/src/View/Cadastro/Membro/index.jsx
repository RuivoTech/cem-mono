import React, { useState, useEffect } from 'react';
import { useToasts } from "react-toast-notifications";

import api from "../../../services/api";
import { getSession } from "../../../services/auth";

import InfoBox from '../../../componentes/InfoBox';
import Tabela from '../../../componentes/Tabela';
import Coluna from '../../../componentes/Coluna';
import FormModal from './FormModal';
import RelatorioModal from './RelatorioModal';

const Membros = () => {
    const [membros, setMembros] = useState([]);
    const [membroSelecionado, setMembroSelecionado] = useState(0);
    const [membrosPesquisa, setMembrosPesquisa] = useState([]);
    const [ministerios, setMinisterios] = useState([]);
    const [quantidadeAtivos, setQuantidadeAtivos] = useState(0);
    const [quantidadeNovos, setQuantidadeNovos] = useState(0);
    const [quantidadeBatizados, setQuantidadeBatizados] = useState(0);
    const [show, setShow] = useState(false);
    const [showRelatorio, setShowRelatorio] = useState(false);
    const [pesquisa, setPesquisa] = useState("");
    const { addToast } = useToasts();
    const session = getSession();

    useEffect(() => {
        const fetchMembros = async () => {
            const response = await api.get("/membros", {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            });

            setQuantidadeAtivos(response.data.quantidadeAtivos);
            setQuantidadeBatizados(response.data.quantidadeBatizados);
            setQuantidadeNovos(response.data.quantidadeNovos);
            setMembros(response.data.membros);

            await fetchMinisterios();
        }

        document.title = "Membros - Cadastro de membros CEM";

        fetchMembros();
    }, []);

    useEffect(() => {
        const fetchMembros = async () => {
            const response = await api.get("/membros", {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            });

            setQuantidadeAtivos(response.data.quantidadeAtivos);
            setQuantidadeBatizados(response.data.quantidadeBatizados);
            setQuantidadeNovos(response.data.quantidadeNovos);
            setMembros(response.data.membros);
            setMembrosPesquisa(response.data.membros);
        }
        if (!show) {
            fetchMembros();
        }
    }, [show]);

    const fetchMinisterios = async () => {
        const response = await api.get("/ministerios", {
            headers: {
                Authorization: `Bearer ${session.token}`
            }
        });

        setMinisterios(response.data);
    }

    const pesquisar = e => {
        let filteredSuggestions = membros.filter((suggestion) => {
            return suggestion.nome
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toLowerCase()
                .includes(
                    e.currentTarget.value
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .toLowerCase()
                );
        });

        setMembrosPesquisa(filteredSuggestions);
        setPesquisa(e.target.value);
    }

    const remover = async (id) => {
        const request = await api.delete("/membros/" + id, {
            headers: {
                Authorization: `Bearer ${session.token}`
            }
        });

        if (!request.data.error) {
            const items = membros.filter(item => item.id !== id);

            setMembros(items);

            addToast("Membro removido com sucesso!", { appearance: 'success' });
        } else {
            addToast("Não foi possível remover o membro!", { appearance: 'error' });
        }
    }

    const opcoes = (membro) => {
        return (
            <>
                <button
                    key={membro.id + "editar"}
                    className="btn btn-primary btn-xs"
                    onClick={() => {
                        setMembroSelecionado(membro.id);
                        setShow(true);
                    }}
                    title="Editar membro"
                >
                    <i className="fa fa-gear"></i>
                </button>
                &nbsp;
                <button
                    key={membro.id + "remover"}
                    type="button"
                    onClick={() => remover(membro.id)}
                    value={membro.id}
                    className="btn btn-danger btn-xs"
                    title="Remover membro"
                >
                    <i className="fa fa-trash"></i>
                </button>
            </>
        )
    }

    const handleShow = event => {
        if (event?.key === "Escape") {
            return;
        }

        setMembroSelecionado();
        setShow(!show);
    }

    const handleShowRelatorio = () => {
        setShowRelatorio(!showRelatorio);
    }

    return (
        <>
            <div className="wrapper-content row">
                <InfoBox corFundo="primary" icone="user-circle-o" quantidade={quantidadeAtivos} titulo="Ativos" />
                <InfoBox corFundo="success" icone="check-circle" quantidade={quantidadeNovos} titulo="Novos" />
                <InfoBox corFundo="danger" icone="heart" quantidade={quantidadeBatizados} titulo="Batizados" />
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
                                        placeholder="Pesquise por nome ou sobrenome"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div className="overflow-hidden align-items-center">
                        <Tabela
                            data={pesquisa ? membrosPesquisa : membros}
                            titulo="Membros"
                            mostrarBotaoNovo={true}
                            mostrarBotaoRelatorio={true}
                            tituloBotao="Novo Membro"
                            handleShow={handleShow}
                            handleShowRelatorio={handleShowRelatorio}
                            limiteItems={20}
                        >
                            <Coluna campo="nome" titulo="Nome" tamanho="20" />
                            <Coluna campo="contato.email" titulo="E-mail" tamanho="20" />
                            <Coluna campo="contato.telefone" titulo="Telefone" tamanho="12" />
                            <Coluna campo="contato.celular" titulo="Celular" tamanho="12" />
                            <Coluna titulo="Opções" corpo={(item) => opcoes(item)} tamanho="5" />
                        </Tabela>
                    </div>
                </div>
            </div>
            <FormModal
                className="modal-lg"
                data={membroSelecionado}
                show={show}
                handleShow={handleShow}
                membros={membros}
                ministerios={ministerios}
            />

            <RelatorioModal show={showRelatorio} handleShow={handleShowRelatorio} ministerios={ministerios} />
        </>
    )
}

export default Membros;