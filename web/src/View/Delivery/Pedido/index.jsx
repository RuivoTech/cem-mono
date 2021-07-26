import React, { useState, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import api from "../../../services/api";
import Utils from '../../../componentes/Utils';
import { getSession } from "../../../services/auth";
import FormModal from "./FormModal";
import InfoBox from '../../../componentes/InfoBox';

const Pedido = () => {
    const [pedidos, setPedidos] = useState([]);
    const [pedidoSelecionado, setPedidoSelecionado] = useState({});
    const [quantidadeTotal, setQuantidadeTotal] = useState(0);
    const [show, setShow] = useState(false);
    const [pedidosPesquisa, setPedidosPesquisa] = useState([]);
    const [pesquisa, setPesquisa] = useState("");
    const { addToast } = useToasts();
    const session = getSession();

    useEffect(() => {
        const fetchPedidos = async () => {
            document.title = "Pedidos - Cadastro de membros CEM";
            let request = await api.get("/order", {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            });

            setPedidos(request.data);
            setPedidosPesquisa(request.data);
            setQuantidadeTotal(request.data.length);
        }

        if (!show) {
            fetchPedidos();
        }
    }, [setQuantidadeTotal, show]);

    const remover = async (id) => {
        const respose = await api.delete("/order/" + id, {
            headers: {
                Authorization: `Bearer ${session.token}`
            }
        });

        if (!respose.data.error) {
            const items = pedidos.filter(item => item.id !== id);

            setPedidos(items);

            addToast("Pedido removido com sucesso!", { appearance: "success" });
        } else {
            addToast("Não foi possível remover o Pedido!", { appearance: "error" });
        }
    }

    const pesquisar = e => {
        let filteredSuggestions = pedidos.filter((suggestion) => {
            return suggestion.name
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .includes(
                    e.currentTarget.value
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .toLowerCase()
                );
        });

        setPedidosPesquisa(filteredSuggestions);
        setPesquisa(e.target.value);
    }

    const opcoes = (pedido) => {
        return (
            <>
                <button
                    key={pedido.id + "editar"}
                    className="btn btn-primary btn-xs"
                    onClick={() => {
                        setPedidoSelecionado(pedido);
                        setShow(true);
                    }}
                    title="Editar pedido"
                >
                    <FontAwesomeIcon icon={["fas", "cog"]} />
                </button>
                {' '}
                <button
                    key={pedido.id + "remover"}
                    type="button"
                    onClick={() => remover(pedido.id)}
                    value={pedido.id}
                    className="btn btn-danger btn-xs"
                    title="Remover pedido"
                >
                    <FontAwesomeIcon icon={["fas", "trash"]} />
                </button>
            </>
        )
    }

    const handleShow = () => {
        setPedidoSelecionado({
            items: []
        });
        setShow(!show);
    }

    const calcularValor = (items) => {
        let cost = 0;

        items.map(item => {
            cost += (item.cost * item.quantity);
        })

        return Utils.converteMoeda(cost);
    }

    return (
        <>
            <div className="wrapper-content row">
                <InfoBox corFundo="primary" icone="utensils" quantidade={quantidadeTotal} titulo="Total" />
                <InfoBox corFundo="success" icone="dollar-sign" quantidade={quantidadeTotal} titulo="Pagos" />
                <InfoBox corFundo="danger" icone="dollar-sign" quantidade={quantidadeTotal} titulo="Não pagos" />
                <InfoBox corFundo="warning" icone="user-circle" quantidade={quantidadeTotal} titulo="Total" />
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className="row">
                        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fa fa-search color-gray"></i>
                                        </span>
                                    </div>
                                    <input
                                        className="form-control"
                                        onChange={pesquisar}
                                        value={pesquisa}
                                        placeholder="Pesquise por nome no pedido"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <div className="row justify-content-end mr-0">
                                <div className="button-group">
                                    <button
                                        className="btn btn-primary ml-2"
                                        type="button"
                                        title="novo pedido"
                                        onClick={() => handleShow()}
                                    >
                                        Novo Pedido
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div className="row ml-0 overflow-auto" style={{ height: "70vh" }}>
                        {pedidosPesquisa.map((pedido) => {
                            return (
                                <div key={pedido.id} className="col-md-2 my-2 mx-0 px-2">
                                    <div
                                        className="card m-0"
                                        style={{ minHeight: "345px" }}
                                    >
                                        <div className="card-header">
                                            <h4 className="card-title">{Utils.separarString(pedido.name, 2)}</h4>
                                            <h5 className="card-text">{Utils.mascaraTelefone(pedido.contact)}</h5>
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text row justify-content-between mx-0">
                                                <span
                                                    className={`${pedido.status ? "text-danger" : "text-success"}`}
                                                >
                                                    {!pedido.status ? "Pago" : "Não pago"}
                                                </span>
                                                <span>{pedido.type ? "Entregar" : "Retirar"}</span>
                                            </p>
                                            {pedido.address &&
                                                <p className="card-text truncate-text">
                                                    {`${pedido.address}, ${pedido.number}`}
                                                </p>
                                            }
                                            <hr />
                                            {pedido.items.map((item, index) => {
                                                return (
                                                    <p key={index} className="card-text">
                                                        {`
                                                        ${item.quantity} - ${item.title} - 
                                                        ${Utils.converteMoeda((item.cost * item.quantity))}
                                                        `}
                                                    </p>
                                                )
                                            })}
                                            <hr />
                                            <p className={`card-text ${pedido.status ? "text-danger" : "text-success"} h3`}>
                                                {calcularValor(pedido.items)}
                                            </p>
                                        </div>
                                        <div className="card-footer text-right">
                                            {opcoes(pedido)}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <FormModal className="modal-lg" data={pedidoSelecionado} show={show} handleShow={handleShow} />
        </>
    )
}

export default Pedido;