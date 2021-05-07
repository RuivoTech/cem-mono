import React, { useState } from "react";
import "./styles.css";
import Paginacao from "../Paginacao";

const Tabela = ({
    titulo,
    tituloBotao,
    mostrarBotaoNovo,
    mostrarBotaoRelatorio,
    data = [],
    handleShow,
    handleShowRelatorio,
    height,
    corLinha,
    children = [],
    limiteItems = 20
}) => {
    const [items, setItems] = useState([]);

    const renderValor = (campo, item) => {
        const [grupo, subGrupo] = campo.split(".");
        let retorno = "";

        if (grupo && subGrupo) {
            retorno = item[grupo][subGrupo];
        } else {
            retorno = item[campo];
        }

        return retorno;
    }

    function renderItems(dados) {
        setItems(dados);
    }

    return (
        <>
            <div className="tabela">
                {titulo &&
                    <div className="tabela-titulo">
                        <div className="h1 pull-left">{titulo}</div>
                        <div className="tabela-config">
                            {mostrarBotaoRelatorio &&
                                <button
                                    type="button"
                                    onClick={() => handleShowRelatorio()}
                                    className="btn btn-outline-secondary mr-2"
                                >
                                    Gerar PDF
                                    </button>}
                            {mostrarBotaoNovo &&
                                <div className="button-group">
                                    <button
                                        className="btn btn-outline-primary ml-2"
                                        type="button"
                                        title={tituloBotao}
                                        onClick={() => handleShow()}>
                                        {tituloBotao}
                                    </button>
                                </div>}
                        </div>
                    </div>}
                <div className="tabela-corpo">
                    <div className="table-responsive">
                        <div className="dataTables_wrapper">
                            <div className="overflow-hidden" style={height}>
                                <table className="table table-sm table-striped table-hover">
                                    <thead className="thead-light">
                                        <tr >
                                            {children.map((child) => {
                                                return (<th scope="col" key={child.props.titulo} style={{ width: child.props.tamanho + "vw" }}>{child.props.titulo}</th>)
                                            })}
                                        </tr>
                                    </thead>
                                    <tbody
                                        className="overflow-auto"
                                        style={{ maxHeight: "calc(80vh - 230px)" }}
                                    >
                                        {items?.map((item, index) => {
                                            return (
                                                <tr role="row" key={index} className={corLinha ? corLinha(item) : null}>
                                                    {React.Children.map(children, child => {
                                                        const valor = child.props.corpo ? child.props.corpo(item) : renderValor(child.props.campo, item);

                                                        return React.cloneElement(child, {
                                                            valor,
                                                            className: child.props.className
                                                        })
                                                    })}
                                                </tr>
                                            )
                                        })}

                                    </tbody>
                                </table>
                            </div>
                            <Paginacao data={data} renderItems={response => renderItems(response)} limiteItems={limiteItems} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Tabela;