import React, { useState, useEffect } from 'react';
import { useToasts } from "react-toast-notifications";

import Tabela from '../../../componentes/Tabela';
import Coluna from '../../../componentes/Coluna';
import api from "../../../services/api";
import FormModal from "./FormModal";
import InfoBox from '../../../componentes/InfoBox';
import { getSession } from '../../../services/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Ministerios = () => {
    const [ministerios, setMinisterios] = useState([]);
    const [ministerioSelecionado, setMinisterioSelecionado] = useState({});
    const [quantidadeTotal, setQuantidadeTotal] = useState(0);
    const [show, setShow] = useState(false);
    const [pesquisa, setPesquisa] = useState("");
    const [ministeriosPesquisa, setMinisteriosPesquisa] = useState([]);
    const { addToast } = useToasts();
    const session = getSession();

    useEffect(() => {
        const fetchMinisterio = async () => {
            document.title = "Ministerios - Cadastro de membros CEM";
            const request = await api.get("/ministerios", {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            });

            setMinisterios(request.data);
            setQuantidadeTotal(request.data.length);
        };

        if (!show) {
            fetchMinisterio();
        }
    }, [show]);

    const pesquisar = e => {
        let filteredSuggestions = ministerios.filter((suggestion) => {
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

        setMinisteriosPesquisa(filteredSuggestions);
        setPesquisa(e.target.value);
    }

    const remover = async (id) => {
        const request = await api.delete("/ministerios/" + id, {
            headers: {
                Authorization: `Bearer ${session.token}`
            }
        });

        if (!request.data.error) {
            const items = ministerios.filter(item => item.id !== id);
            setMinisterios(items);

            addToast("Ministerio removido com sucesso!", { appearance: 'success' });
        } else {

            addToast("N??o foi poss??vel remover o ministerio!", { appearance: 'error' });
        }
    }

    const opcoes = (ministerio) => {
        return (
            <>
                <button
                    key={ministerio.id + "editar"}
                    className="btn btn-primary btn-xs"
                    onClick={() => {
                        setMinisterioSelecionado(ministerio);
                        setShow(true);
                    }}
                    title="Editar ministerio"
                >
                    <FontAwesomeIcon icon={["fas", "cog"]} />
                </button>
                {" "}
                <button
                    key={ministerio.id + "remover"}
                    type="button"
                    onClick={() => remover(ministerio.id)}
                    value={ministerio.id}
                    className="btn btn-danger btn-xs"
                    title="Remover ministerio"
                >
                    <FontAwesomeIcon icon={["fas", "trash"]} />
                </button>
            </>
        )
    }

    const handleShow = () => {
        setMinisterioSelecionado({});
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
                                        placeholder="Pesquise por minist??rio"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div className="overflow-hidden align-items-center">
                        <Tabela
                            data={pesquisa ? ministeriosPesquisa : ministerios}
                            titulo="Minist??rios"
                            mostrarBotaoNovo={true}
                            tituloBotao="Novo Minist??rio"
                            handleShow={handleShow}
                        >
                            <Coluna campo="nome" titulo="Nome" tamanho="15" />
                            <Coluna campo="descricao" titulo="Descri????o" tamanho="50" />
                            <Coluna titulo="Op????es" corpo={(item) => opcoes(item)} tamanho="5" />
                        </Tabela>
                    </div>
                </div>
            </div>
            <FormModal className="modal-lg" data={ministerioSelecionado} show={show} handleShow={handleShow} />
        </>
    )
}

export default Ministerios;