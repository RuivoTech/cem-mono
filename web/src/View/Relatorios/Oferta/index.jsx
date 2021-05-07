import React, { Component } from "react";

import Menu from "../../../componentes/Menu";
import { URL_RELATORIO } from "../../../services/api";

class Ofertas extends Component {

    async componentDidMount(){
        document.title = "Relatório de Ofertas - Cadastro de membros CEM";     
    }

    render() {
        const { toggleSidebar } = this.props;
        return (
            <>
                <div className="menu">
                    <Menu toggleSidebar={toggleSidebar} componente="oferta" />
                </div>
                <div className="row">
                    <div className="container-fluid px-2">
                        <form className="tab-content text-left" action={URL_RELATORIO + "/relatorio/oferta.php"} method="GET" target="_balnk">
                            <div className="row">
                                <div className="form-group col-md-2">
                                    <label htmlFor="dataInicio">Data inicio:</label>
                                    <input className="form-control" name="dataInicio" id="dataInicio" type="date" />
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="dataFim">Data fim:</label>
                                    <input className="form-control" name="dataFim" id="dataFim" type="date" />
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

export default Ofertas;