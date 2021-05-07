import React, { useState, useEffect } from "react"
import { PDFViewer, Document, Page, View, Text, Image } from '@react-pdf/renderer';
import { useLocation } from "react-router-dom";

import api from "../../../services/api";
import Utils from "../../../componentes/Utils";
import Carregando from "../../../componentes/Carregando";
import Table from "../../../componentes/Tabela/PDF";
import Column from "../../../componentes/Coluna/PDF";

import { styles } from "./styles";

const Membro = (props) => {
    const [membros, setMembros] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const fetchMembros = async () => {
            const filters = location.search;

            const response = await api.get(`/relatorios/membros${filters}`);

            if (response.data.error) {

                return;
            }
            setMembros(response.data);

            setIsLoading(false);
        }

        fetchMembros();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) {
        return <Carregando />;
    }

    return (
        <PDFViewer style={styles.viewer}>
            <Document
                title="Relatório de membros"
                style={{ padding: "2rem" }}
            >
                <Page size="A4" style={styles.page} orientation="landscape">
                    <View style={styles.header} fixed>
                        <Image src="cem.png" style={styles.logo} />
                        <Text style={styles.headerText}>Relatório de Membros</Text>
                    </View>
                    <View style={styles.content}>
                        <Table data={membros}>
                            <Column title="Nome" field="nome" size="25" />
                            <Column
                                title="E-mail"
                                field="email"
                                size="25"
                            />
                            <Column title="Celular" field="celular" size="12" />
                            <Column title="Telefone" field="telefone" size="12" />
                            <Column
                                title="Data de Nascimento"
                                field="dataNascimento"
                                body={(item) => Utils.converteData(item.dataNascimento, "DD/MM/YYYY")}
                                size="16"
                            />
                        </Table>
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    )
}

export default Membro;