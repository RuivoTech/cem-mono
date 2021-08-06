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
    const [pedidosPesquisa, setPedidosPesquisa] = useState([]);
    const [quantidade, setQuantidade] = useState(0);
    const [campaigns, setCampaigns] = useState([]);
    const [campaignSelected, setCampaignSelected] = useState(0);
    const [show, setShow] = useState(false);
    const [pesquisa, setPesquisa] = useState("");
    const { addToast } = useToasts();
    const session = getSession();

    useEffect(() => {
        document.title = "Pedidos - Cadastro de membros CEM";
        const fetchCampaign = async () => {
            let request = await api.get("/campaign", {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            });

            setCampaigns(request.data);
        }

        if (!show) {
            fetchCampaign();
        }
    }, [show]);

    useEffect(() => {
        campaigns.map(campaign => {
            campaign.status && setCampaignSelected(campaign);
        });
    }, [campaigns])

    useEffect(() => {
        const fetchPedidos = async () => {
            let request = await api.get(`/order${campaignSelected !== 0 ? `/${campaignSelected.id}` : ""}`, {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            });

            setPedidos(request.data);
            setPedidosPesquisa(request.data);
        }

        fetchPedidos();
    }, [campaignSelected])

    useEffect(() => {
        const total = pedidos.length;
        let pagos = 0;
        let aPagar = 0;

        pedidos.forEach(pedido => {
            pagos += pedido.status;
            aPagar += !pedido.status;
        });

        setQuantidade({
            total,
            pagos,
            aPagar
        })
    }, [pedidos]);

    const remover = async (id) => {
        const respose = await api.delete("/order/" + id, {
            headers: {
                Authorization: `Bearer ${session.token}`
            }
        });

        if (!respose.data.error) {
            const items = pedidos.filter(item => item.id !== id);

            setPedidos(items);
            setPedidosPesquisa(items);

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
                    key={pedido.id + "payment"}
                    className="btn btn-success btn-xs"
                    onClick={() => {
                        handlePay(pedido.id)
                    }}
                    title="Realizar pagamento"
                >
                    <FontAwesomeIcon icon={["fas", "dollar-sign"]} />
                </button>
                {' '}
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

    const handlePay = async (id) => {
        const response = await api.put("/orderPayment", {
            id,
            status: true
        },
            {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            });

        if (response.status === 200) {
            const ordersFiltered = pedidos.map(pedido => {
                return parseInt(pedido.id) === parseInt(response.data.id) ?
                    {
                        ...pedido,
                        status: response.data.status
                    }
                    : pedido
            });

            setPedidos(ordersFiltered);
            setPedidosPesquisa(ordersFiltered);
            addToast("Pedido salvo com sucesso!", { appearance: "success" });
        } else {
            console.error(response.data.error);
            addToast("Alguma coisa deu errado, por favor falar com o administrador!", { appearance: "error" });
        }

    }

    const handleShow = () => {
        setPedidoSelecionado({
            items: []
        });
        setShow(!show);
    }

    const handleChangeCampaign = (event) => {
        const selectedCampaign = campaigns.filter(
            campaign => parseInt(campaign.id) === parseInt(event.target.value) && campaign
        )

        setCampaignSelected(selectedCampaign[0]);
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
                <InfoBox corFundo="info" icone="shopping-cart" quantidade={quantidade.total} titulo="Total" />
                <InfoBox corFundo="success" icone="dollar-sign" quantidade={quantidade.pagos} titulo="Pagou" />
                <InfoBox corFundo="danger" icone="cash-register" quantidade={quantidade.aPagar} titulo="Receber" />
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className="row bg-gray align-items-center">
                        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6 align-items-center">
                            <div className="form-group mt-2">
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
                                <div className="col-md-4"></div>
                                <div className="col-md-4">
                                    <select
                                        name="campaign"
                                        id="campaign"
                                        className="custom-select"
                                        onChange={handleChangeCampaign}
                                        value={campaignSelected.id}
                                    >
                                        {campaigns.map(campaign => {
                                            return <option
                                                key={campaign.id}
                                                value={campaign.id}
                                            >
                                                {campaign.title}
                                            </option>
                                        })}
                                    </select>
                                </div>
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
                                            <div className="m-0" style={{ minHeight: "60px" }}>
                                                {pedido.items.map((item, index) => {
                                                    return (
                                                        <div key={index} className="m-0">
                                                            {`${item.quantity} - ${item.title}`}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            <hr />
                                            <p
                                                className={
                                                    `card-text m-0 h3 text-right ${pedido.status ?
                                                        "text-success"
                                                        : "text-danger"}`}
                                            >
                                                {calcularValor(pedido.items)}
                                            </p>
                                            <p className="card-text">
                                                {pedido.timeDelivery && `${pedido.type ? "Entregar" : "Retirar"}: ${pedido.timeDelivery}`}
                                            </p>
                                            {pedido.address &&
                                                <>
                                                    <hr />
                                                    <p className="card-text mb-0 truncate-text">
                                                        {`${pedido.address}, ${pedido.number}`}
                                                    </p>
                                                </>
                                            }
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
            <FormModal
                className="modal-lg"
                data={pedidoSelecionado}
                show={show}
                handleShow={handleShow}
                campaign={campaignSelected}
            />
        </>
    )
}

export default Pedido;