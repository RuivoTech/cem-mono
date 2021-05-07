import React, { useState, useEffect } from 'react';
import { useToasts } from "react-toast-notifications";

import api from "../../../services/api";
import FormModal from "./FormModal";
import InfoBox from '../../../componentes/InfoBox';
import Tabela from '../../../componentes/Tabela';
import Coluna from '../../../componentes/Coluna';
import { getSession } from '../../../services/auth';

const Inscricoes = () => {
    const [inscricoes, setInscricoes] = useState([]);
    const [inscricaoSelecionada, setInscricaoSelecionada] = useState({});
    const [quantidadeTotal, setQuantidadeTotal] = useState(0);
    const [membros, setMembros] = useState([]);
    const [eventos, setEventos] = useState([]);
    const [inscricoesPesquisa, setInscricoesPesquisa] = useState([]);
    const [pesquisa, setPesquisa] = useState("");
    const [show, setShow] = useState(false);
    const { addToast } = useToasts();
    const session = getSession();

    useEffect(() => {
        document.title = "Inscrições - Cadastro de membros CEM";
        fetchEventos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const fetchInscricao = async () => {
            const request = await api.get("/inscricoes", {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            });

            setInscricoes(request.data);
            setQuantidadeTotal(request.data.length);
        };

        fetchInscricao();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show]);

    const fetchEventos = async () => {
        const request = await api.get("/eventos", {
            headers: {
                Authorization: `Bearer ${session.token}`
            },
            params: {
                ativo: true
            }
        });

        setEventos(request.data);

        await fetchMembros();
    };

    const fetchMembros = async () => {
        const request = await api.get("/membros", {
            headers: {
                Authorization: `Bearer ${session.token}`
            }
        });

        setMembros(request.data.membros);
    };

    const handleShow = () => {
        setInscricaoSelecionada({});
        setShow(!show);
    }

    const remover = async (id) => {
        const response = await api.delete("/inscricoes/" + id, {
            headers: {
                Authorization: `Bearer ${session.token}`
            }
        });

        if (!response.data.error) {
            const items = inscricoes.filter(item => item.id !== id);

            setInscricoes(items);

            addToast("Inscrição removida com sucesso!", { appearance: 'success' });
        } else {
            addToast("Não foi possível remover o inscrição!", { appearance: 'error' });
        }
    }

    const pesquisar = e => {
        let filteredSuggestions = inscricoes.filter((suggestion) => {
            return suggestion.nome.toLowerCase().includes(e.currentTarget.value.toLowerCase());
        });

        setInscricoesPesquisa(filteredSuggestions);
        setPesquisa(e.target.value);
    }

    const opcoes = (item) => {
        return (
            <>
                <button
                    key={item.id + "editar"}
                    className="btn btn-primary btn-xs"
                    onClick={() => {
                        setInscricaoSelecionada(item);
                        setShow(true);
                    }}
                    title="Editar inscrição"
                >
                    <i className="fa fa-gear"></i>
                </button>
                &nbsp;
                <button
                    key={item.id + "remover"}
                    type="button"
                    onClick={() => remover(item.id)}
                    value={item.id}
                    className="btn btn-danger btn-xs"
                    title="Remover inscrição"
                >
                    <i className="fa fa-trash"></i>
                </button>
            </>
        )
    }

    const pago = (item) => {
        return item.pago ? "Sim" : "Não";
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
                            data={pesquisa ? inscricoesPesquisa : inscricoes}
                            titulo="Inscrições"
                            mostrarBotaoNovo={true}
                            tituloBotao="Nova Inscrição"
                            handleShow={handleShow}
                        >
                            <Coluna campo="nome" titulo="Nome" tamanho="15" />
                            <Coluna campo="email" titulo="E-mail" tamanho="15" />
                            <Coluna campo="telefone" titulo="Telefone" tamanho="10" />
                            <Coluna campo="celular" titulo="Celular" tamanho="10" />
                            <Coluna campo="evento" titulo="Evento" tamanho="10" />
                            <Coluna campo="pago" titulo="Pago" corpo={(item) => pago(item)} tamanho="8" />
                            <Coluna titulo="Opções" corpo={(item) => opcoes(item)} tamanho="8" />
                        </Tabela>
                    </div>
                </div>
            </div>
            <FormModal
                className="modal-lg"
                data={inscricaoSelecionada}
                show={show}
                handleShow={handleShow}
                membros={membros}
                eventos={eventos}
            />
        </>
    )
}

export default Inscricoes;