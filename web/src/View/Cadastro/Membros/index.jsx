import React, { useState, useEffect } from 'react';
import { Box, Container, TextField } from '@mui/material';

import api from "../../../services/api";
import Utils from "../../../componentes/Utils";

import InfoBox from '../../../componentes/InfoBox';
import FormModal from './FormModal/';
import RelatorioModal from './RelatorioModal';
import CustomTable from '../../../componentes/Table';
import { useAuth } from '../../../context/auth';

const colums = {
    title: "Membros",
    fields: [
        {
            id: "options",
            label: "Ações",
            minWidth: 80,
            align: "center"
        },
        {
            id: "nome",
            label: "Nome",
            minWidth: 160
        },
        {
            id: "contato.email",
            label: "E-mail",
            minWidth: 100
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
    const { user } = useAuth();
    const [membros, setMembros] = useState([]);
    const [filteredData, setFilteredData] = useState(null);
    const [quantidades, setQuantidades] = useState({
        ativos: 0,
        novos: 0,
        batizados: 0
    })
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [idMembro, setIdMembro] = useState(0);

    useEffect(() => {
        const fetchMembros = async () => {
            const response = await api.get("/membros");
            setMembros(response.data.membros);
            setQuantidades({
                ativos: response.data.quantidadeAtivos,
                novos: response.data.quantidadeNovos,
                batizados: response.data.quantidadeBatizados
            })
            setLoading(false)
        }

        document.title = "Membros - Cadastro de membros CEM";

        fetchMembros();
    }, [user]);

    const searchData = event => {
        let filteredSuggestions = membros.filter((suggestion) => {
            return suggestion.nome
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toLowerCase()
                .includes(
                    event.currentTarget.value
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .toLowerCase()
                );
        });

        setFilteredData(filteredSuggestions);
    }

    const remover = async (id) => {
        const request = await api.delete("/membros/" + id);

        if (!request.data.error) {
            const items = membros.filter(item => item.id !== id);

            setMembros(items);
            alert("Success");
        } else {
            alert("Error")
        }
    }

    const handleShowForm = (id) => {
        setShowForm(!showForm);

        setIdMembro(id > 0 ? id : 0);
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
                <InfoBox corFundo="primary" icone="user-circle" quantidade={quantidades.ativos} titulo="Ativos" />
                <InfoBox corFundo="success" icone="check-circle" quantidade={quantidades.novos} titulo="Novos" />
                <InfoBox corFundo="danger" icone="heart" quantidade={quantidades.batizados} titulo="Batizados" />
            </Box>
            <TextField
                onChange={event => searchData(event)}
                label="Pesquisar membros pelo nome"
                sx={{ marginLeft: 2, width: "50%" }}
                variant="filled"
            />
            <CustomTable
                data={filteredData ? filteredData : membros}
                colums={colums}
                loading={loading}
                showOptions
                showHeaderButtons
                deleteMember={(memberId) => remover(memberId)}
                editMember={(memberId) => { handleShowForm(memberId) }}
                openFormModal={() => { handleShowForm(0) }}
            />
            <FormModal
                show={showForm}
                handleShow={handleShowForm}
                membros={membros}
                idMembro={idMembro}
            />
        </Container>
    )
}

export default Membros;