import React, { useState, useEffect } from 'react';
import { Collapse } from 'reactstrap';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useToasts } from "react-toast-notifications";

import api from "../../../services/api";
import NovoAluno from "./form";
import Carregando from '../../../componentes/Carregando';
import Aluno from "./Aluno";


const Alunos = () => {
    const [alunos, setAlunos] = useState([]);
    const [alunoSelecionado, setAlunoSelecionado] = useState({});
    const [sugestoes, setSugestoes] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [tabelaEstaAberta, setTabelaEstaAberta] = useState(true);
    const { addToast } = useToasts();

    useEffect(() => {
        const fetchMembros = async () => {
            document.title = "Alunos - Cadastro de membros CEM";
            let data = await api.get("/membros");

            setSugestoes(data.data);

            await fetchAlunos();
        };

        fetchMembros();
    }, []);

    const fetchAlunos = async () => {
        let data = await api.get("/alunos");

        setAlunos(data.data);
        setCarregando(false);
    }

    const toggleTabelaForm = () => {
        setTabelaEstaAberta(!tabelaEstaAberta);
    }

    const onClick = event => {
        setAlunoSelecionado(event.value);
        setTabelaEstaAberta(!tabelaEstaAberta);
    }

    const handleSubmit = async event => {
        event.preventDefault();
        setCarregando(true);

        let aluno = new Aluno();

        aluno.id = this.state.AlunoSelecionado.id;
        aluno.nome = this.state.AlunoSelecionado.nome;
        aluno.email = this.state.AlunoSelecionado.email;
        aluno.rg = this.state.AlunoSelecionado.rg;
        aluno.telefone = this.state.AlunoSelecionado.telefone;
        aluno.endereco = this.state.AlunoSelecionado.endereco;

        await api.post("/alunos", aluno);

        addToast("Aluno salvo com sucesso!", { appearance: "sucess" });

        setAlunoSelecionado({});
        setCarregando(false);
    }

    const handleChange = e => {
        const [item, subItem] = e.target.name.split(".");

        if (subItem) {
            setAlunoSelecionado({
                ...this.state.AlunoSelecionado,
                [item]: {
                    [subItem]: e.target.value
                }
            });
        } else {
            setAlunoSelecionado({
                ...this.state.AlunoSelecionado,
                [e.target.name]: e.target.value
            });
        }
    }

    const remover = async (id) => {
        let data = await api.delete("/alunos", id);

        if (data === "OK") {
            const items = alunos.filter(item => item.id !== id);

            setAlunos(items);

            addToast("Aluno removida com sucesso!", { appearance: 'sucess' });
        } else {
            addToast("Não foi possível remover o aluno!", { appearance: 'error' });
        }
    }

    const opcoes = (rowData, column) => {
        return (
            <button key={rowData.id} type="button" onClick={() => remover(rowData.id)} value={rowData.id} className="btn btn-danger btn-sm" title="Remover"><i className="fa fa-trash"></i></button>
        )
    }

    return (
        <>
            <div className="row text-center">
                <div className="container-fluid px-2">
                    <Collapse isOpen={!tabelaEstaAberta}>
                        <NovoAluno data={alunoSelecionado} handleChange={handleChange} sugestoes={sugestoes}
                            handleSubmit={handleSubmit} />
                    </Collapse>
                    <Collapse isOpen={tabelaEstaAberta}>
                        <DataTable className="table" value={alunos}
                            selection={alunoSelecionado} onSelectionChange={onClick} >
                            <Column field="id" header="ID" />
                            <Column field="nome" header="Nome" />
                            <Column field="email" header="E-mail" />
                            <Column field="rg" header="RG" />
                            <Column field="telefone" header="Telefone" />
                            <Column field="endereco" header="Endereço" />
                            <Column field="id" header="Opções" body={opcoes} />
                        </DataTable>
                        {carregando && <Carregando />}
                    </Collapse>
                </div>
            </div>
        </>
    )
}

export default Alunos;