import React, { Component } from 'react';
import { Collapse } from 'reactstrap';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useToasts } from "react-toast-notifications";

import api from "../../../services/api";
import Utils from "../../../componentes/Utils";
import NovaAtividade from "./form";
import Menu from "../../../componentes/Menu";
import Carregando from '../../../componentes/Carregando';
import Atividade from "./Atividade";

const { addToast } = useToasts();

class Atividades extends Component {

    state = {
        carregando: false,
        data: [{
            id: 0,
            tipo: "",
            data: "",
            descricao: "",
            modulo: ""
        }],
        AtividadeSelecionada: {
            id: 0,
            tipo: "",
            data: "",
            descricao: "",
            modulo: ""
        },
        modulos: [{
            id: "",
            descricao: ""
        }],
        tipos: [{
            id: "1",
            descricao: "Trabalho"
        },
        {
            id: "2",
            descricao: "Prova"
        },
        {
            id: "3",
            descricao: "Recuperação"
        }],
        isOpen: true,
        tabelaEstaAberta: true,
        error: ""
    }

    async componentDidMount() {
        document.title = "Atividades - Cadastro de membros CEM";
        this.setState({
            carregando: true
        })
        await this.fetchModulo();
    }

    fetchModulo = async () => {
        let data = await api.get("/modulo/listar");

        this.setState({
            modulos: data
        });

        await this.fetchAtividades();
    };

    fetchAtividades = async () => {
        let data = await api.get("/atividade/listar");

        this.setState({
            carregando: false,
            data
        });
    }

    toggleTabelaForm = () => {
        this.setState({
            tabelaEstaAberta: !this.state.tabelaEstaAberta
        })
    }

    onClick = e => {
        this.setState({
            AtividadeSelecionada: e.value,
            tabelaEstaAberta: !this.state.tabelaEstaAberta
        });
    }

    pesquisa = e => {
        this.setState({
            pesquisa: e.target.value
        });
    }

    handleSubmit = async e => {
        e.preventDefault();

        let atividade = new Atividade();

        atividade.id = this.state.AtividadeSelecionada.id;
        atividade.nome = this.state.AtividadeSelecionada.nome;
        atividade.email = this.state.AtividadeSelecionada.email;
        atividade.rg = this.state.AtividadeSelecionada.rg;
        atividade.telefone = this.state.AtividadeSelecionada.telefone;
        atividade.endereco = this.state.AtividadeSelecionada.endereco;

        this.setState({
            carregando: true
        });
        let data = await api.post("/atividade/salvar", atividade);

        addToast("Atividade salvo com sucesso!", { appearance: "sucess" });

        this.setState({
            carregando: false,
            AtividadeSelecionada: {
                id: 0,
                tipo: "",
                data: "",
                descricao: "",
                modulo: ""
            },
            error: data
        });

        this.fetchAtividades();
    }

    handleChange = e => {
        const [item, subItem] = e.target.name.split(".");

        if (subItem) {
            this.setState({
                AtividadeSelecionada: {
                    ...this.state.AtividadeSelecionada,
                    [item]: {
                        [subItem]: e.target.value
                    }
                }
            });
        } else {
            this.setState({
                AtividadeSelecionada: {
                    ...this.state.AtividadeSelecionada,
                    [e.target.name]: e.target.value
                }
            });
        }
    }

    remover = async (id) => {
        let data = await api.delete("/atividade/remover", id);

        if (data === "OK") {
            const items = this.state.data.filter(item => item.id !== id);

            this.setState({
                tabelaEstaAberta: true,
                data: items,
            });

            addToast("Atividade removida com sucesso!", { appearance: 'sucess' });
        } else {

            this.setState({
                tabelaEstaAberta: true,
            });
            addToast("Não foi possível remover o atividade!", { appearance: 'error' });
        }
    }

    opcoes = (rowData, column) => {
        return (
            <button key={rowData.id} type="button" onClick={() => this.remover(rowData.id)} value={rowData.id} className="btn btn-danger btn-sm" title="Remover"><i className="fa fa-trash"></i></button>
        )
    }

    selecionarSugestao = event => {
        let atividadeSelecionada = this.state.sugestoes.filter(atividade => {
            return atividade.id === event.currentTarget.id ? atividade : null;
        });

        atividadeSelecionada = atividadeSelecionada[0];

        this.setState({
            AtividadeSelecionada: {
                ...this.state.AtividadeSelecionada,
                nome: atividadeSelecionada.nome,
                email: atividadeSelecionada.contato.email,
                telefone: atividadeSelecionada.contato.celular,
                rg: atividadeSelecionada.rg,
                endereco: atividadeSelecionada.endereco.logradouro + ", " + atividadeSelecionada.endereco.complemento
            }
        });
    }

    selecionarTipo = (rowData, column) => {

        let tipo = this.state.tipos.filter(tipo => tipo.id === rowData.idTipo);

        return tipo[0] ? tipo[0].descricao : null;
    }

    render() {
        const { toggleSidebar } = this.props;
        return (
            <>
                <div className="menu">
                    <Menu toggleTabelaForm={this.toggleTabelaForm} toggleSidebar={toggleSidebar} componente="Dizimo"
                        pesquisa={this.pesquisa} mostrarBotao="true" />
                </div>
                <div className="row text-center">
                    <div className="container-fluid px-2">
                        <Collapse isOpen={!this.state.tabelaEstaAberta}>
                            <NovaAtividade data={this.state.AtividadeSelecionada} handleChange={this.handleChange} modulos={this.state.modulos}
                                handleLimpar={this.handleLimpar} handleSubmit={this.handleSubmit} />
                        </Collapse>
                        <Collapse isOpen={this.state.tabelaEstaAberta}>
                            <DataTable className="table" value={this.state.data} selectionMode="single" globalFilter={this.state.pesquisa}
                                selection={this.state.AtividadeSelecionada} onSelectionChange={this.onClick} >
                                <Column field="id" header="ID" />
                                <Column field="descricao" header="Descrição" />
                                <Column field="idTipo" header="Tipo" body={this.selecionarTipo} />
                                <Column field="modulo" header="Módulo" />
                                <Column field="data" header="Data" body={rowData => Utils.converteData(rowData, "data")} />
                                <Column field="id" header="Opções" body={this.opcoes} />
                            </DataTable>
                            {this.state.carregando && <Carregando />}
                        </Collapse>
                    </div>
                </div>
            </>
        )
    }
}

export default Atividades;