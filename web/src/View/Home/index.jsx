import React, { useState, useEffect } from "react";

import api from "../../services/api";
import InfoBox from "../../componentes/InfoBox";
import CustomTable from "../../componentes/Table";
import Utils from "../../componentes/Utils";
import { Box, Container } from "@mui/material";
import { useAuth } from "../../context/auth";

const mes = new Date().toLocaleString('pt-BR', { month: "long" });

const columsBirthDay = {
    title: `Aniversariantes de ${mes}`,
    fields: [
        {
            id: "dataNascimento",
            label: "Dia",
            minWidth: 10,
            format: (value) => Utils.converteData(value, "DD")
        },
        {
            id: "nome",
            label: "Nome",
            minWidth: 224
        },
        {
            id: "idade",
            label: "Idade",
            minWidth: 15
        },
    ]
}

const columsWedding = {
    title: `Casados em ${mes}`,
    fields: [
        {
            id: "dataCasamento",
            label: "Dia",
            minWidth: 10,
            format: (value) => Utils.converteData(value, "DD")
        },
        {
            id: "nome",
            label: "Nome",
            minWidth: 224
        },
        {
            id: "idade",
            label: "Tempo",
            minWidth: 16
        },
    ]
}

const Home = () => {
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
                    data={data.aniversariantes}
                    colums={columsBirthDay}
                    loading={loading}
                    sx={{
                        width: "calc(100% - 34px)"
                    }}
                />
                <CustomTable
                    data={data.casados}
                    colums={columsWedding}
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