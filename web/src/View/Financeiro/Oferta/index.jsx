import React, { useState, useEffect } from 'react';
import { useToasts } from "react-toast-notifications";

import api from "../../../services/api";
import FormModal from "./FormModal";
import Utils from '../../../componentes/Utils';
import InfoBox from '../../../componentes/InfoBox';
import Tabela from '../../../componentes/Tabela';
import Coluna from '../../../componentes/Coluna';
import { getSession } from '../../../services/auth';

const Ofertas = () => {
    const [ofertas, setOfertas] = useState([]);
    const [ofertaSelecionada, setOfertaSelecionada] = useState({});
    const [ofertasPesquisa, setOfertasPesquisa] = useState([]);
    const [quantidadeTotal, setQuantidadeTotal] = useState(0);
    const [pesquisa, setPesquisa] = useState("");
    const [show, setShow] = useState(false);
    const { addToast } = useToasts();
    const session = getSession();

    useEffect(() => {
        const fetchOferta = async () => {
            document.title = "Ofertas - Cadastro de membros CEM";
            const request = await api.get("/ofertas", {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            });

            setOfertas(request.data);
            setQuantidadeTotal(request.data.length);
        }

        if (!show) {
            fetchOferta();
        }
    }, [show]);

    useEffect(() => {
        const fetchMembros = async () => {
            const response = await api.get("/ofertas", {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            });

            setOfertas(response.data);
        }
        if (!show) {
            fetchMembros();
        }
    }, [show]);

    const pesquisar = e => {
        let filteredSuggestions = ofertas.filter((suggestion) => {
            return suggestion.dataOferta.toLowerCase().includes(e.currentTarget.value.toLowerCase());
        });

        setOfertasPesquisa(filteredSuggestions);
        setPesquisa(e.target.value);
    }

    const remover = async (id) => {
        let data = await api.delete("/ofertas", id, {
            headers: {
                Authorization: `Bearer ${session.token}`
            }
        });

        if (data === "OK") {
            const items = ofertas.filter(item => item.id !== id);

            setOfertas(items);

            addToast("Oferta removida com sucesso!", { appearance: 'sucess' });
        } else {
            addToast("Não foi possível remover o oferta!", { appearance: 'error' });
        }
    }

    const opcoes = (item) => {
        return (
            <>
                <button
                    key={item.id + "editar"}
                    className="btn btn-primary btn-xs"
                    onClick={() => {
                        setOfertaSelecionada(item);
                        setShow(true);
                    }}
                    title="Editar oferta"
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
                    title="Remover oferta"
                >
                    <i className="fa fa-trash"></i>
                </button>
            </>
        )
    }

    const handleShow = () => {
        setOfertaSelecionada({});
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
                                        placeholder="Pesquise por data"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div className="overflow-hidden align-items-center">
                        <Tabela
                            data={pesquisa ? ofertasPesquisa : ofertas}
                            titulo="Ofertas"
                            mostrarBotaoNovo={true}
                            tituloBotao="Nova Oferta"
                            handleShow={handleShow}
                        >
                            <Coluna campo="valor" titulo="Valor" corpo={(item) => Utils.converteMoeda(item.valor)} tamanho="10" />
                            <Coluna campo="data" titulo="Data" corpo={(item) => Utils.converteData(item.data, "DD/MM/YYYY")} tamanho="50" />
                            <Coluna titulo="Opções" corpo={(item) => opcoes(item)} tamanho="5" />
                        </Tabela>
                    </div>
                </div>
            </div>
            <FormModal className="modal-lg" data={ofertaSelecionada} show={show} handleShow={handleShow} />
        </>
    )
}

export default Ofertas;