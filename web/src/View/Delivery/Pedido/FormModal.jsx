import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useToasts } from "react-toast-notifications";
import Axios from "axios";

import Autocomplete from "../../../componentes/Autocomplete";
import Tabela from "../../../componentes/Tabela";

import Pedido from "../../../Model/Pedido";
import api from "../../../services/api";
import Utils from "../../../componentes/Utils";
import { getSession } from "../../../services/auth";
import Coluna from "../../../componentes/Coluna";

const FormModal = ({ data, show, handleShow, className }) => {
    const [pedido, setPedido] = useState({});
    const [campaign, setCampaign] = useState([]);
    const [items, setItems] = useState([]);
    const [itemSelecionado, setItemSelecionado] = useState({
        quantity: 1
    });
    const [carregando, setCarregando] = useState(false);
    const { addToast, removeAllToasts } = useToasts();
    const session = getSession();

    useEffect(() => {
        const request = async () => {
            api.get("/delivery/store")
                .then(response => {
                    setCampaign(response.data);
                }).catch(error => {
                    console.error(error);
                })
        }
        setPedido(data);
        setItems(data.items);
        removeAllToasts();
        request();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    useEffect(() => {
        setCarregando(false);
    }, [show]);

    const handleSubmit = async () => {
        let response = "";
        setCarregando(true);

        const novoPedido = new Pedido();

        novoPedido.id = pedido.id ? pedido.id : 0;
        novoPedido.name = pedido.name;
        novoPedido.contact = pedido.contact;
        novoPedido.type = pedido.type;
        novoPedido.status = pedido.status;
        novoPedido.zipCode = pedido.zipCode;
        novoPedido.address = pedido.address;
        novoPedido.number = pedido.number;
        novoPedido.complement = pedido.complement;
        novoPedido.city = pedido.city;
        novoPedido.items = items;

        if (Number(novoPedido.id) !== 0) {
            response = await api.put("/order", novoPedido, {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            });
        } else {
            response = await api.post("/order", novoPedido, {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            });
        }

        if (!response.data.error) {
            addToast("Pedido salvo com sucesso!", { appearance: "success" });
        } else {
            console.error(response.data.error);
            addToast("Alguma coisa deu errado, por favor falar com o administrador!", { appearance: "error" });
        }

        setCarregando(false);
    }

    const handleChange = event => {
        const [item, subItem] = event.target.name.split(".");

        if (subItem) {
            setPedido({
                ...pedido,
                [item]: {
                    ...pedido[item],
                    [subItem]: event.target.value
                }
            });
        } else {
            setPedido({
                ...pedido,
                [event.target.name]: event.target.value
            });
        }
    }

    const handleBlur = async evento => {
        let data = await Axios.get("https://viacep.com.br/ws/" + evento.target.value + "/json/");

        data = data.data;

        setPedido({
            ...pedido,
            address: data.logradouro,
            city: data.localidade
        });
    }

    const selecionarItem = (item) => {
        setItemSelecionado({
            ...itemSelecionado,
            ...item
        })
    }

    const handleChangeItem = (event) => {
        setItemSelecionado({
            ...itemSelecionado,
            [event.target.name]: event.target.value
        });
    }

    const handleAddItem = () => {
        setItems([
            ...items,
            itemSelecionado
        ]);
        setItemSelecionado({
            quantity: 1,
            title: "",
            observation: ""
        });
    }

    const handleRemoveItem = (item) => {
        const itemsFiltered = pedido.items.filter(orderItem => {
            return orderItem.id !== item.id
        });

        setPedido({
            ...pedido,
            items: itemsFiltered
        });
    }

    const opcoesItems = (item) => {
        return (
            <>
                <button
                    key={item.id + "edit"}
                    type="button"
                    onClick={() => setItemSelecionado(item)}
                    value={item.id}
                    className="btn btn-primary btn-xs"
                    title="Editar Item"
                >
                    <FontAwesomeIcon icon={["fas", "cog"]} />
                </button>
                {" "}
                <button
                    key={item.id + "remover"}
                    type="button"
                    onClick={() => handleRemoveItem(item.id)}
                    value={item.id}
                    className="btn btn-danger btn-xs"
                    title="Remover Item"
                >
                    <FontAwesomeIcon icon={["fas", "trash"]} />
                </button>
            </>
        )
    }

    const calcularValor = () => {
        let cost = 0;

        if (items) {
            items.map(item => {
                cost += (item.cost * item.quantity);
            })
        }

        return Utils.converteMoeda(cost);
    }

    return (
        <>
            <Modal isOpen={show} toggle={handleShow} className={className}>
                <ModalHeader toggle={handleShow}>{pedido?.id ? `#${pedido.id} - ${pedido?.name}` : "Novo Pedido"}</ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="name">Nome: <span className="text-danger">*</span></label>
                            <input
                                className="form-control"
                                id="name"
                                name="name"
                                type="text"
                                value={pedido.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="contact">Contato: <span className="text-danger">*</span></label>
                            <input
                                className="form-control"
                                id="contact"
                                name="contact"
                                type="text"
                                value={pedido.contact}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="type">Tipo:</label>
                            <select
                                name="type"
                                id="type"
                                className="custom-select"
                                value={pedido.type}
                                onChange={handleChange}
                            >
                                <option>Escolha...</option>
                                <option value="0">Retirar</option>
                                <option value="1">Entregar</option>
                            </select>
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="Status">Status:</label>
                            <select
                                name="status"
                                id="status"
                                className="custom-select"
                                value={pedido.status}
                                onChange={handleChange}
                            >
                                <option>Escolha...</option>
                                <option value="0">Pago</option>
                                <option value="1">Não Pago</option>
                            </select>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="zipCode">CEP:</label>
                            <input
                                className="form-control"
                                id="zipCode"
                                name="zipCode"
                                type="text"
                                value={pedido.zipCode}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <div className="col-md-9"></div>
                        <div className="form-group col-md-5">
                            <label htmlFor="address">Endereço:</label>
                            <input
                                className="form-control"
                                id="address"
                                name="address"
                                type="text"
                                value={pedido.address}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="number">Número:</label>
                            <input
                                className="form-control"
                                id="number"
                                name="number"
                                type="text"
                                value={pedido.number}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="complement">Complemento:</label>
                            <input
                                className="form-control"
                                id="complement"
                                name="complement"
                                type="text"
                                value={pedido.complement}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="city">Cidade:</label>
                            <input
                                className="form-control"
                                id="city"
                                name="city"
                                type="text"
                                value={pedido.city}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group col-md-12">
                            <hr />
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="quantity">Quantidade:</label>
                            <input
                                className="form-control"
                                id="quantity"
                                name="quantity"
                                type="number"
                                value={itemSelecionado.quantity}
                                onChange={handleChangeItem}
                            />
                        </div>
                        <div className="form-group col-md-5">
                            <label htmlFor="item">Item:</label>
                            <Autocomplete
                                className="form-control"
                                id="title"
                                name="title"
                                suggestions={campaign.items}
                                onChange={handleChangeItem}
                                onClick={(item) => selecionarItem(item)}
                                value={itemSelecionado.title}
                                field="title"
                            />
                        </div>
                        <div className="form-group col-md-5">
                            <label htmlFor="observation">Observação:</label>
                            <input
                                className="form-control"
                                id="observation"
                                name="observation"
                                type="text"
                                value={itemSelecionado.observation}
                                onChange={handleChangeItem}
                            />
                        </div>
                        <div className="col-md-10"></div>
                        <div className="form-group col-md-2">
                            <button className="btn btn-success w-75" onClick={handleAddItem}>
                                Adicionar
                            </button>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-12">
                            <Tabela data={items}>
                                <Coluna campo="quantity" titulo="Quant" tamanho="1" />
                                <Coluna campo="title" titulo="Item" tamanho="4" />
                                <Coluna campo="observation" titulo="Observação" tamanho="6" />
                                <Coluna campo="cost" titulo="Valor" tamanho="2" corpo={item => Utils.converteMoeda(item.cost)} />
                                <Coluna
                                    titulo="Opções"
                                    campo="id"
                                    corpo={(item) => opcoesItems(item)}
                                    tamanho="2"
                                />
                            </Tabela>
                        </div>
                        <div className="col-md-8"></div>
                        <div className="col-sm-4 col-md-4 col-lg-4">
                            <div className="row justify-content-end mr-4 h3">
                                Total: {calcularValor()}
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button type="button" color="success" onClick={() => handleSubmit()} disabled={carregando}>Salvar</Button>{' '}
                    <Button type="button" color="danger" onClick={handleShow} disabled={carregando}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default FormModal;