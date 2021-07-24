import React, { useState, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';

import api from "../../../services/api";
import { getSession } from "../../../services/auth";
import FormModal from "./FormModal";
import InfoBox from '../../../componentes/InfoBox';
import Tabela from '../../../componentes/Tabela';
import Coluna from '../../../componentes/Coluna';
import Utils from '../../../componentes/Utils';

const Campanha = () => {
    const [campanhas, setCampanhas] = useState([]);
    const [campanhaSelecionada, setCampanhaSelecionada] = useState({});
    const [quantidadeTotal, setQuantidadeTotal] = useState(0);
    const [show, setShow] = useState(false);
    const [campanhasPesquisa, setCampanhasPesquisa] = useState([]);
    const [pesquisa, setPesquisa] = useState("");
    const { addToast } = useToasts();
    const session = getSession();

    useEffect(() => {
        const fetchCampanha = async () => {
            document.title = "Campanha - Cadastro de membros CEM";
            let request = await api.get("/campaign", {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            });

            setCampanhas(request.data);
            setQuantidadeTotal(request.data.length);
        }

        if (!show) {
            fetchCampanha();
        }
    }, [setQuantidadeTotal, show]);

    const campanhaAtiva = (item) => {
        return item.status ? "Ativa" : "Inativa";
    }

    const remover = async (id) => {
        const respose = await api.delete("/campaign/" + id, {
            headers: {
                Authorization: `Bearer ${session.token}`
            }
        });

        if (!respose.data.error) {
            const campanhasFiltradas = campanhas.filter(item => item.id !== id);

            setCampanhas(campanhasFiltradas);

            addToast("Campanha removida com sucesso!", { appearance: "success" });
        } else {
            addToast("Não foi possível remover a campanha!", { appearance: "error" });
        }
    }

    const pesquisar = e => {
        let filteredSuggestions = campanhas.filter((suggestion) => {
            return suggestion.title
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

        setCampanhasPesquisa(filteredSuggestions);
        setPesquisa(e.target.value);
    }

    const opcoes = (item) => {
        return (
            <>
                <button
                    key={item.id + "editar"}
                    className="btn btn-primary btn-xs"
                    onClick={() => {
                        setCampanhaSelecionada(item);
                        setShow(true);
                    }}
                    title="Editar campanha"
                >
                    <i className="fa fa-gear"></i>
                </button>
                {' '}
                <button
                    key={item.id + "remover"}
                    type="button"
                    onClick={() => remover(item.id)}
                    value={item.id}
                    className="btn btn-danger btn-xs"
                    title="Remover campanha"
                >
                    <i className="fa fa-trash"></i>
                </button>
            </>
        )
    }

    const handleShow = () => {
        setCampanhaSelecionada({});
        setShow(!show);
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
                                        placeholder="Pesquise por campanha"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div className="overflow-hidden align-items-center">
                        <Tabela
                            data={pesquisa ? campanhasPesquisa : campanhas}
                            titulo="Campanha"
                            mostrarBotaoNovo={true}
                            tituloBotao="Nova campanha"
                            handleShow={handleShow}
                        >
                            <Coluna campo="title" titulo="Titulo" tamanho="10" />
                            <Coluna campo="status" titulo="Status" tamanho="4" corpo={(item) => campanhaAtiva(item)} />
                            <Coluna campo="date" titulo="Data" tamanho="4" corpo={(item) => Utils.converteData(item.date, "dd/mm/yyyy")} />
                            <Coluna campo="timeStart" titulo="Hora Inicio" tamanho="4" />
                            <Coluna campo="timeEnd" titulo="Hora Fim" tamanho="4" />
                            <Coluna titulo="Opções" corpo={(item) => opcoes(item)} tamanho="5" />
                        </Tabela>
                    </div>
                </div>
            </div>
            <FormModal className="modal-lg" data={campanhaSelecionada} show={show} handleShow={handleShow} />
        </>
    )
}

export default Campanha;