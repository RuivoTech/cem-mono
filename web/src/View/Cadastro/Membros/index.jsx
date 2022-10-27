import React, { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { Badge, Edit } from '@mui/icons-material';

import api from "../../../services/api";
import Utils from "../../../componentes/Utils";
import InfoBox from '../../../componentes/InfoBox';
import FormModal from './FormModal/';
import RelatorioModal from './RelatorioModal';
import CustomTable from '../../../componentes/Table';
import { useAuth } from '../../../context/auth';
import { GridActionsCellItem } from '@mui/x-data-grid';

const Membros = () => {
    const columns = [
        {
            field: "actions",
            headerName: "Ações",
            type: "actions",
            getActions: ({ id }) => {
                return [
                    <GridActionsCellItem
                        icon={<Badge />}
                        label="Ver"
                        onClick={() => { }}
                    />,
                    <GridActionsCellItem
                        icon={<Edit />}
                        label="Editar"
                        onClick={() => handleShowForm(id)}
                    />,
                ];
            }
        },
        {
            field: "nome",
            headerName: "Nome",
            width: 256,
        },
        {
            field: "contato.email",
            headerName: "E-mail",
            width: 240,
            renderCell: ({ row }) => row.contato.email,
        },
        {
            field: "endereco",
            headerName: "Endereço",
            width: 248,
            valueGetter: ({ value }) => `${value.logradouro}, ${value.numero} - ${value.cidade}`,
        },
        {
            field: "contato.celular",
            headerName: "Celular",
            width: 120,
            renderCell: ({ row }) => Utils.mascaraTelefone(row.contato.celular),
        },
        {
            field: "contato.telefone",
            headerName: "Telefone",
            width: 120,
            renderCell: ({ row }) => Utils.mascaraTelefone(row.contato.telefone),
        }
    ]
    const { user } = useAuth();
    const [membros, setMembros] = useState([]);
    const [quantidades, setQuantidades] = useState({
        total: 0,
        ativos: 0,
        novos: 0,
        batizados: 0
    })
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [idMembro, setIdMembro] = useState(0);

    useEffect(() => {
        fetchMembros();
    }, [user]);

    const fetchMembros = async () => {
        const response = await api.get("/membros");
        setMembros(response.data.membros);
        setQuantidades({
            total: response.data.quantidadeTotal,
            ativos: response.data.quantidadeAtivos,
            novos: response.data.quantidadeNovos,
            batizados: response.data.quantidadeBatizados
        })
        setLoading(false)
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
                width: "100%",
                minWidth: "98vw",
                padding: 0,
                paddingBottom: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <Box width="100%">
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
                    <InfoBox corFundo="info" icone="user-circle" quantidade={quantidades.total} titulo="Total" />
                    <InfoBox corFundo="primary" icone="user-circle" quantidade={quantidades.ativos} titulo="Ativos" />
                    <InfoBox corFundo="success" icone="check-circle" quantidade={quantidades.novos} titulo="Novos" />
                    <InfoBox corFundo="danger" icone="heart" quantidade={quantidades.batizados} titulo="Batizados" />
                </Box>
                <CustomTable
                    title="Membros"
                    data={membros}
                    columns={columns}
                    loading={loading}
                    showOptions
                    showHeaderButtons
                    deleteMember={(memberId) => remover(memberId)}
                    editMember={(memberId) => { handleShowForm(memberId) }}
                    openFormModal={() => { handleShowForm(0) }}
                    rowHeight={48}
                />
                <FormModal
                    show={showForm}
                    handleShow={handleShowForm}
                    membros={membros}
                    idMembro={idMembro}
                />
            </Box>
        </Container>
    )
}

export default Membros;