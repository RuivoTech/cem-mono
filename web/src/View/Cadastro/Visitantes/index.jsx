import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAuth } from '../../../context/auth';
import api from "../../../services/api";
import FormModal from "./FormModal";
import RelatorioModal from "./RelatorioModal";
import Tabela from '../../../componentes/Tabela';
import Coluna from '../../../componentes/Coluna';
import InfoBox from '../../../componentes/InfoBox';

const Visitantes = () => {
    const { user } = useAuth();
    const [visitantes, setVisitantes] = useState([]);
    const [quantidadeTotal, setQuantidadeTotal] = useState(0);
    const [visitanteSelecionado, setVisitanteSelecionado] = useState({});
    const [visitantesPesquisa, setVisitantesPesquisa] = useState([]);
    const [pesquisa, setPesquisa] = useState("");
    const [show, setShow] = useState(false);
    const [showRelatorio, setShowRelatorio] = useState(false);

    useEffect(() => {
        fetchVisitante();
    }, [user]);

    const fetchVisitante = async () => {
        const response = await api.get("/visitantes");
        if(!response.data.error) {
        setVisitantes(response.data);
        setQuantidadeTotal(response.data.length);
        }
    };

    const pesquisar = e => {
        let filteredSuggestions = visitantes.filter((suggestion) => {
            return suggestion.nome
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .includes(
                    e.currentTarget.value
                        .toLowerCase()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                );
        });

        setVisitantesPesquisa(filteredSuggestions);
        setPesquisa(e.target.value);
    }

    const remover = async (id) => {
        const response = await api.delete("/visitantes/" + id);

        if (!response.data.error) {
            const items = visitantes.filter(item => item.id !== id);

            setVisitantes(items);

            alert("Visitante removido com sucesso!", { appearance: 'success' });
        } else {
            alert("Não foi possível remover o visitante!", { appearance: 'error' });
        }
    }

    const opcoes = (visitante) => {
        return (
            <>
                <button
                    key={visitante.id + "editar"}
                    className="btn btn-primary btn-xs"
                    onClick={() => {
                        setVisitanteSelecionado(visitante);
                        setShow(true);
                    }}
                    title="Editar membro"
                >
                    <FontAwesomeIcon icon={["fas", "cog"]} />
                </button>
                {' '}
                <button
                    key={visitante.id + "remover"}
                    type="button"
                    onClick={() => remover(visitante.id)}
                    value={visitante.id}
                    className="btn btn-danger btn-xs"
                    title="Remover membro"
                >
                    <FontAwesomeIcon icon={["fas", "trash"]} />
                </button>
            </>
        )
    }

    const handleShow = () => {
        setVisitanteSelecionado({});
        setShow(!show);
    }

    const handleShowRelatorio = () => {
        setShowRelatorio(!showRelatorio);
    }

    return (
        <>
            <div className="wrapper-content row" style={{width: "calc(100% - 8px)"}}>
                    <div className="col-4">
                <InfoBox corFundo="primary" icone="user-circle" quantidade={quantidadeTotal} titulo="Total" />
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
                            data={pesquisa ? visitantesPesquisa : visitantes}
                            titulo="Visitantes"
                            mostrarBotaoNovo={true}
                            tituloBotao="Novo Visitante"
                            handleShow={handleShow}
                            handleShowRelatorio={handleShowRelatorio}
                        >
                            <Coluna campo="nome" titulo="Nome" tamanho="15" />
                            <Coluna campo="contato.email" titulo="E-mail" tamanho="15" />
                            <Coluna campo="contato.telefone" titulo="Telefone" tamanho="10" />
                            <Coluna campo="contato.celular" titulo="Celular" tamanho="10" />
                            <Coluna titulo="Opções" corpo={(item) => opcoes(item)} tamanho="5" />
                        </Tabela>
                    </div>
                </div>
            </div>
            <FormModal className="modal-lg" data={visitanteSelecionado} show={show} handleShow={handleShow} />

            <RelatorioModal show={showRelatorio} handleShow={handleShowRelatorio} />
        </>
    )
}

export default Visitantes;