import React, { useState, useEffect } from "react";

import api from "../../services/api";
import InfoBox from "../../componentes/InfoBox";
import CustomTable from "../../componentes/Table";
import Utils from "../../componentes/Utils";
import { Box, Container } from "@mui/material";
import { useAuth } from "../../context/auth";

const columsBirthDay = [
        {
        field: "dataNascimento",
        headerName: "Dia",
        width: 24,
        valueGetter: ({ value }) => Utils.converteData(value, "DD"),
        },
        {
            field: "nome",
            headerName: "Nome",
            minWidth: 320,
        },
        {
            field: "idade",
            headerName: "Idade",
            width: 24
        },
]

const columsWedding = [
        {
        field: "dataCasamento",
        headerName: "Dia",
        width: 24,
        valueGetter: ({ value }) => Utils.converteData(value, "DD"),
        },
        {
            field: "nome",
            headerName: "Nome",
            minWidth: 306,
        },
        {
            field: "idade",
            headerName: "Tempo",
            width: 64,
        },
]

const Home = () => {
    const mes = new Date().toLocaleString('pt-BR', { month: "long" });
    const { user } = useAuth();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "Dashboard - Cadastro de Membros CEM";
    }, []);

    useEffect(() => {
        fetchHome();
    }, [user])

    const fetchHome = async () => {
        let response = await api.get("/home");

        setData(response.data);
        setLoading(false);
    };

    return (
        <Container
            sx={{
                width: "100vw",
                minWidth: "98vw",
                padding: 0,
                margin: 0,
                xs: {
                    paddingLeft: "12px",
                    paddingRight: "12px"
                },
                sm: {
                    paddingLeft: "12px",
                    paddingRight: "12px"
                },
                md: {
                    paddingLeft: "12px",
                    paddingRight: "12px"
                },
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
                    justifyContent: "center"
                }}
            >
                <InfoBox corFundo="success" icone="users" quantidade={data.quantidadeMembros} titulo="Membros" />
                <InfoBox corFundo="danger" icone="globe" quantidade={data.quantidadeVisitantes} titulo="Visitantes" />
                <InfoBox corFundo="info" icone="calendar" quantidade={data.quantidadeEventos} titulo="Eventos" />
            </Box>
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
                <CustomTable
                    title={`Aniversáriantes de ${mes}`}
                    data={data.aniversariantes}
                    columns={columsBirthDay}
                    loading={loading}
                    sx={{
                        width: "calc(100% - 34px)"
                    }}
                />
                <CustomTable
                    title={`Casados de ${mes}`}
                    data={data.casados}
                    columns={columsWedding}
                    loading={loading}
                    sx={{
                        width: "calc(100% - 34px)"
                    }}
                />
            </Box>
        </Container>
    )
}

export default Home;