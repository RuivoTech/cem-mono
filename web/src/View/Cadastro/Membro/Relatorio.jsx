import React, { Component } from "react";
import { NotificationManager } from "react-notifications";

import api, { URL_RELATORIO } from "../../../services/api";
import Menu from "../../../componentes/Menu";
import { getSession } from "../../../services/auth";

const session = getSession();

class Membros extends Component {
    state = {
        Ministerios: [],
        urlValue: {
            aniversariantes: false
        }
    }

    async componentDidMount() {
        document.title = "Relatório de Membros - Cadastro de membros CEM";
        await this.fetchMinisterios();
    }

    fetchMinisterios = async () => {
        let data = await api.get("/ministerio/listar", {
            headers: {
                Authorization: `Bearer ${session.token}`
            }
        });
        this.setState({
            Ministerios: data
        });
    }

    handleChange = event => {
        let valor = event.target.type === "checkbox" ? !this.state.urlValue.aniversariantes : event.target.value;
        this.setState({
            urlValue: {
                ...this.state.urlValue,
                [event.target.name]: valor
            }
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        let params = this.state.urlValue;

        if (this.state.urlValue.dataInicio && !this.state.urlValue.dataFim) {
            NotificationManager.warning("Por favor, Preencha Data Até!", "Alerta");
            return;
        }

        if (this.state.urlValue.dataFim && !this.state.urlValue.dataInicio) {
            NotificationManager.warning("Por favor, Preencha Data De!", "Alerta");
            return;
        }

        let urlValue = Object.keys(params).map(key => {
            return params[key] !== "" ? key + '=' + params[key] : null
        }).join('&');

        window.open(URL_RELATORIO + "/relatorio/membro.php?" + urlValue, "_blank");
    }

    render() {
        const { toggleSidebar } = this.props;
        return (
            <>
                <div className="menu">
                    <Menu toggleSidebar={toggleSidebar} componente="dizimo" />
                </div>
                <div className="row">
                    <div className="container-fluid px-2">
                        <form className="tab-content text-left" onSubmit={this.handleSubmit}>
                            <div className="tab-pane active">
                                <div className="row">
                                    <div className="col-md-3 h3">Data de Nascimento:</div>
                                    <div className="custom-control custom-checkbox col-md-9 h5">
                                        <input className="custom-control-input" name="aniversariantes" id="aniversariantes"
                                            type="checkbox" onChange={this.handleChange} />
                                        <label className="custom-control-label" htmlFor="aniversariantes">Aniversariantes do Mês</label>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label htmlFor="dataInicio">De:</label>
                                        <input className="form-control" name="dataInicio" id="dataInicio" type="date"
                                            readOnly={this.state.urlValue.aniversariantes} onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label htmlFor="dataFim">Até:</label>
                                        <input className="form-control" name="dataFim" id="dataFim" type="date"
                                            disabled={this.state.urlValue.aniversariantes} onChange={this.handleChange} />
                                    </div>

                                    <div className="col-md-6"></div>
                                    <div className="col-md-12 h3">Ministério:</div>
                                    <div className="form-group col-md-3">
                                        <select name="ministerio" className="form-control" onChange={this.handleChange}>
                                            <option value="">Escolha...</option>
                                            {this.state.Ministerios.map((ministerio) => {
                                                return <option key={ministerio.id} value={ministerio.id}>{ministerio.nome}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="col-md-12 h3">Sexo:</div>
                                    <div className="form-group col-md-2">
                                        <select className="form-control" name="sexo" onChange={this.handleChange}>
                                            <option value="">Escolha...</option>
                                            <option value="1">Homem</option>
                                            <option value="2">Mulher</option>
                                        </select>
                                    </div>
                                    <div className="col-md-12 h3">Estado Civil:</div>
                                    <div className="form-group col-md-2">
                                        <select name="estadoCivil" className="form-control" onChange={this.handleChange}>
                                            <option value="">Escolha...</option>
                                            <option value="1">Solteiro(a)</option>
                                            <option value="2">Casado(a)</option>
                                            <option value="3">Divorciado(a)</option>
                                            <option value="4">Viúvo(a)</option>
                                            <option value="5">Separado(a)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="botoes">
                                <hr className="bg-white" />
                                <div className="row">
                                    <div className="col-md-2">
                                        <button className="btn btn-success btn-lg btn-block" type="submit">Gerar Relatório</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}

export default Membros;