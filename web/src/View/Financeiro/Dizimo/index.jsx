import React, { useState, useEffect } from 'react';
import { useToasts } from "react-toast-notifications";

import api from "../../../services/api";
import FormModal from "./FormModal";
import Tabela from '../../../componentes/Tabela';
import Coluna from '../../../componentes/Coluna';
import InfoBox from '../../../componentes/InfoBox';
import Utils from '../../../componentes/Utils';
import { getSession } from '../../../services/auth';

const Dizimos = () => {
    const [dizimos, setDizimos] = useState([]);
    const [dizimoSelecionado, setDizimoSelecionado] = useState({});
    const [dizimoPesquisa, setDizimoPesquisa] = useState([]);
    const [quantidadeTotal, setQuantidadeTotal] = useState(0);
    const [pesquisa, setPesquisa] = useState("");
    const [membros, setMembros] = useState([]);
    const [show, setShow] = useState(false);
    const { addToast } = useToasts();
    const session = getSession();

    useEffect(() => {
        const fetchDizimo = async () => {
            const request = await api.get("/dizimos", {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            });

            setDizimos(request.data);
            setQuantidadeTotal(request.data.length);
        }

        if (!show) {
            fetchDizimo();
        }
    }, [show]);

    useEffect(() => {
        const fetchMembro = async () => {
            document.title = "Dizimos - Cadastro de membros CEM";
            const request = await api.get("/membros", {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            });

            setMembros(request.data.membros);
        };

        fetchMembro();
    }, []);


    const remover = async (id) => {
        const response = await api.delete("/dizimos/" + id, {
            headers: {
                Authorization: `Bearer ${session.token}`
            }
        });

        if (!response.data.error) {
            const items = dizimos.filter(item => item.id !== id);

            setDizimos(items);

            addToast("Dizimo removida com sucesso!", { appearance: 'success' });
        } else {
            addToast("Não foi possível remover o dizimo!", { appearance: 'error' });
        }
    }

    const pesquisar = e => {
        let filteredSuggestions = dizimos.filter((suggestion) => {
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

        setDizimoPesquisa(filteredSuggestions);
        setPesquisa(e.target.value);
    }

    const opcoes = (item) => {
        return (
            <>
                <button
                    key={item.id + "editar"}
                    className="btn btn-primary btn-xs"
                    onClick={() => {
                        setDizimoSelecionado(item);
                        setShow(true);
                    }}
                    title="Editar dizimo"
                >
                    <i className="fa fa-gear"></i>
                </button>
                {" "}
                <button
                    key={item.id + "remover"}
                    type="button"
                    onClick={() => remover(item.id)}
                    value={item.id}
                    className="btn btn-danger btn-xs"
                    title="Remover dizimo"
                >
                    <i className="fa fa-trash"></i>
                </button>
            </>
        )
    }

    const handleShow = () => {
        setDizimoSelecionado({});
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
                            data={pesquisa ? dizimoPesquisa : dizimos}
                            titulo="Dízimos"
                            mostrarBotaoNovo={true}
                            tituloBotao="Novo Dízimo"
                            handleShow={handleShow}
                        >
                            <Coluna campo="nome" titulo="Nome" tamanho="30" />
                            <Coluna
                                campo="dataDizimo"
                                titulo="Data"
                                corpo={(item) => Utils.converteData(item.dataDizimo, "DD/MM/YYYY")}
                                tamanho="8"
                            />
                            <Coluna campo="valor" titulo="Valor" corpo={(item) => Utils.converteMoeda(item.valor)} tamanho="8" />
                            <Coluna titulo="Opções" corpo={(item) => opcoes(item)} tamanho="5" />
                        </Tabela>
                    </div>
                </div>
            </div>
            <FormModal className="modal-lg" data={dizimoSelecionado} show={show} handleShow={handleShow} membros={membros} />
        </>
    )
}

export default Dizimos;