import React, { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { Badge, Edit } from '@mui/icons-material';

import api from "../../../services/api";
import InfoBox from '../../../componentes/InfoBox';
import CustomTable from '../../../componentes/Table';
import { useAuth } from '../../../context/auth';
import FormModal from './FormModal/';

const Usuarios = () => {
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
            minWidth: 240
        },
        {
            field: "email",
            headerName: "E-mail",
            minWidth: 240
        },
        {
            field: "nivel",
            headerName: "Nivel"
        },
        {
            field: "active",
            headerName: "Ativo",
            renderCell: ({ row }) => row.active ? "Sim" : "Não",
        }
    ]
    const [usuarios, setUsuarios] = useState([]);
    const [quantidadeTotal, setQuantidadeTotal] = useState(0);
    const [userIdSelected, setUserIdSelected] = useState(0);
    const [showFormModal, setShowFormModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        fetchUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const fetchUsers = () => {
        setLoading(true);
        api.get("/usuarios")
            .then(response => {
                if (response.data?.error) {
                    return;
                }

                setUsuarios(response.data);

                const quantidade = response.data.length;

                setQuantidadeTotal(quantidade);

                setLoading(false);
            })
            .catch(error => {
                console.log(error)
                setLoading(false);
            });
    }

    function handleShowForm(id) {
        setShowFormModal(!showFormModal);
        setUserIdSelected(id);
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
            <Box width="25%">
                <InfoBox corFundo="primary" icone="users" quantidade={quantidadeTotal} titulo="Total" />
            </Box>
            <CustomTable
                loading={loading}
                title="Usuários"
                data={usuarios}
                columns={columns}
                rowHeight={48}
                showHeaderButtons
                openFormModal={() => handleShowForm(0)}
            />
            <FormModal 
                show={showFormModal}
                handleShow={() => handleShowForm(0)}
                userId={userIdSelected}
            />
        </Container>
    )
}

export default Usuarios;