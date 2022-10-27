import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import Tabela from '../../../componentes/Tabela';
import Coluna from '../../../componentes/Coluna';
import api from "../../../services/api";
import FormModal from "./FormModal";
import InfoBox from '../../../componentes/InfoBox';
import { useAuth } from '../../../context/auth';

const Ministerios = () => {
    const [ministerios, setMinisterios] = useState([]);
    const [ministerioSelecionado, setMinisterioSelecionado] = useState({});
    const [quantidadeTotal, setQuantidadeTotal] = useState(0);
    const [show, setShow] = useState(false);
    const [pesquisa, setPesquisa] = useState("");
    const [ministeriosPesquisa, setMinisteriosPesquisa] = useState([]);
    const {user} = useAuth();

    useEffect(() => {
            fetchMinisterio();
    }, [user, show]);

    const fetchMinisterio = async () => {
        document.title = "Ministerios - Cadastro de membros CEM";
        const request = await api.get("/ministerios");
        if(!request.data.error){
            setMinisterios(request.data);
            setQuantidadeTotal(request.data.length);
        }
    };

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
        const request = await api.delete("/ministerios/" + id);

        if (!request.data.error) {
            const items = ministerios.filter(item => item.id !== id);
            setMinisterios(items);

            alert("Ministerio removido com sucesso!", { appearance: 'success' });
        } else {

            alert("Não foi possível remover o ministerio!", { appearance: 'error' });
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
                <div className="col-4">
                <InfoBox corFundo="primary" icone="landmark" quantidade={quantidadeTotal} titulo="Total" />
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
                            data={pesquisa ? ministeriosPesquisa : ministerios}
                            titulo="Ministérios"
                            mostrarBotaoNovo={true}
                            tituloBotao="Novo Ministério"
                            handleShow={handleShow}
                        >
                            <Coluna campo="nome" titulo="Nome" tamanho="15" />
                            <Coluna campo="descricao" titulo="Descrição" tamanho="40" />
                            <Coluna titulo="Opções" corpo={(item) => opcoes(item)} tamanho="5" />
                        </Tabela>
                    </div>
                </div>
            </div>
            <FormModal className="modal-lg" data={ministerioSelecionado} show={show} handleShow={handleShow} />
        </>
    )
}

export default Ministerios;