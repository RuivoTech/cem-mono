import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import api from "../../../services/api";
import FormModal from "./FormModal";
import InfoBox from '../../../componentes/InfoBox';
import Tabela from '../../../componentes/Tabela';
import Coluna from '../../../componentes/Coluna';
import { useAuth } from '../../../context/auth';

const Inscricoes = () => {
    const [inscricoes, setInscricoes] = useState([]);
    const [inscricaoSelecionada, setInscricaoSelecionada] = useState({});
    const [quantidadeTotal, setQuantidadeTotal] = useState(0);
    const [membros, setMembros] = useState([]);
    const [eventos, setEventos] = useState([]);
    const [inscricoesPesquisa, setInscricoesPesquisa] = useState([]);
    const [pesquisa, setPesquisa] = useState("");
    const [show, setShow] = useState(false);
    const {user} = useAuth();

    useEffect(() => {
        document.title = "Inscrições - Cadastro de membros CEM";
        fetchEventos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    useEffect(() => {
        
        fetchInscricao();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show]);

    const fetchInscricao = async () => {
        const request = await api.get("/inscricoes");
        if(!request.data.error) {
            setInscricoes(request.data);
            setQuantidadeTotal(request.data.length);
        }
    };

    const fetchEventos = async () => {
        const request = await api.get("/eventos", {
            params: {
                ativo: true
            }
        });
        if(!request.data.error) {
            setEventos(request.data);
        }

        await fetchMembros();
    };

    const fetchMembros = async () => {
        const request = await api.get("/membros");
        if(!request.data.error) {
            setMembros(request.data.membros);
        }
    };

    const handleShow = () => {
        setInscricaoSelecionada({});
        setShow(!show);
    }

    const remover = async (id) => {
        const response = await api.delete("/inscricoes/" + id);

        if (!response.data.error) {
            const items = inscricoes.filter(item => item.id !== id);

            setInscricoes(items);

            alert("Inscrição removida com sucesso!", { appearance: 'success' });
        } else {
            alert("Não foi possível remover o inscrição!", { appearance: 'error' });
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
                    <FontAwesomeIcon icon={["fas", "cog"]} />
                </button>
                {" "}
                <button
                    key={item.id + "remover"}
                    type="button"
                    onClick={() => remover(item.id)}
                    value={item.id}
                    className="btn btn-danger btn-xs"
                    title="Remover inscrição"
                >
                    <FontAwesomeIcon icon={["fas", "trash"]} />
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
                <div className="col-4">
                <InfoBox corFundo="primary" icone="calendar-day" quantidade={quantidadeTotal} titulo="Total" />
                </div>
                <div className="col-sm-12 col-md-12 col-lg-12 px-4">
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

                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 px-4">
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