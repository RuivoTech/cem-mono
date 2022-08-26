import React, { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';

import api from "../../../services/api";
import { getSession } from "../../../services/auth";
import Utils from "../../../componentes/Utils";

import InfoBox from '../../../componentes/InfoBox';
import FormModal from './FormModal/';
import RelatorioModal from './RelatorioModal';
import CustomTable from '../../../componentes/Table';

const colums = {
    title: "Membros",
    fields: [
        {
            id: "options",
            label: "Ações",
            minWidth: 4,
            align: "center"
        },
        {
            id: "nome",
            label: "Nome",
            minWidth: 180
        },
        {
            id: "contato.email",
            label: "E-mail",
            minWidth: 120
        },
        {
            id: "endereco",
            label: "Endereço",
            minWidth: 180,
            format: (row) => (
                `${row.logradouro}, ${row.numero} - ${row.cidade}`
            )
        },
        {
            id: "contato.telefone",
            label: "Telefone",
            minWidth: 104,
            format: (row) => Utils.mascaraTelefone(row)
        },
        {
            id: "contato.celular",
            label: "Celular",
            minWidth: 104,
            format: (row) => Utils.mascaraTelefone(row)
        }
    ]
}

const Membros = () => {
    const [membros, setMembros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [membroSelecionado, setMembroSelecionado] = useState(0);
    const [membrosPesquisa, setMembrosPesquisa] = useState([]);
    const [ministerios, setMinisterios] = useState([]);
    const [quantidadeAtivos, setQuantidadeAtivos] = useState(0);
    const [quantidadeNovos, setQuantidadeNovos] = useState(0);
    const [quantidadeBatizados, setQuantidadeBatizados] = useState(0);
    const [show, setShow] = useState(false);
    const [showRelatorio, setShowRelatorio] = useState(false);
    const [pesquisa, setPesquisa] = useState("");
    const session = getSession();

    useEffect(() => {
        const fetchMinisterios = async () => {
            const response = await api.get("/ministerios", {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            });

            setMinisterios(response.data);
            setLoading(false);
        }

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
    }, [session.token]);

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
            setLoading(false);
        }
        if (!show) {
            fetchMembros();
            setLoading(true);
        }
    }, [session.token, show]);

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
            alert("Success");
        } else {
            alert("Error")
        }
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
        <Container
            sx={{
                width: "100vw",
                minWidth: "98vw",
                padding: 0,
                margin: 0
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: {
                        xs: "column",
                        sm: "row",
                        md: "row",
                        lg: "row",
                        xl: "row"
                    },
                    justifyContent: "flex-start"
                }}
            >
                <InfoBox corFundo="primary" icone="user-circle" quantidade={quantidadeAtivos} titulo="Ativos" />
                <InfoBox corFundo="success" icone="check-circle" quantidade={quantidadeNovos} titulo="Novos" />
                <InfoBox corFundo="danger" icone="heart" quantidade={quantidadeBatizados} titulo="Batizados" />
            </Box>
            <CustomTable
                data={membros}
                colums={colums}
                loading={loading}
                showOptions
                showHeaderButtons
                deleteMember={(memberId) => remover(memberId)}
                editMember={(memberId) => {
                    setMembroSelecionado(memberId)
                    setShow(true)
                }}
                openFormModal={(event) => handleShow(event)}
            />
            <FormModal
                show={show}
                handleShow={handleShow}
                membros={membros}
                ministerios={ministerios}
                idMembro={membroSelecionado}
            />

            <RelatorioModal show={showRelatorio} handleShow={handleShowRelatorio} ministerios={ministerios} />
        </Container>
    )
}

export default Membros;