import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import Menu from "../../components/Menu";
import Button from "../../components/Button";

import { Context } from "../../services/Context";
import { getInformation } from "../../services/auth";
import api from "../../services/api";
import Utils from "../../services/Utils";

import './styles.css';
import Quantity from '../../components/Quantity';

function Cart() {
    const utils = new Utils();
    const history = useHistory();
    const { getCartItems, removeCartItem, clearCart, setOrder, getCampaign } = useContext(Context);
    const [cartItems, setCartItems] = useState([]);
    const [times, setTimes] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    const [buttonStatus, setButtonStatus] = useState("none");
    const [showItemEdit, setShowItemEdit] = useState(false);
    const [typeDelivery, setTypeDelivery] = useState(0);
    const [keyItemSelected, setKeyItemSelected] = useState(-1);
    const [itemSelected, setItemSelected] = useState({
        id: "",
        title: "",
        description: "",
        cost: 0,
        quantity: 0,
        observation: ""
    });

    useEffect(() => {
        const sessionCartItems = getCartItems();

        setCartItems(sessionCartItems);
        let total = 0;
        sessionCartItems.map(cartItem => total += (cartItem.cost * cartItem.quantity))
        setSubTotal(total);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const campaign = getCampaign();
        let time = new Date(campaign.date.split("T")[0] + "T" + campaign.timeStart),
            timeEnd = new Date(campaign.date.split("T")[0] + "T" + campaign.timeEnd),
            intervalos = [];

        intervalos.push(
            `${("0" + time.getHours()).slice(-2)}:${("0" + time.getMinutes()).slice(-2)}`
        );

        while (time < timeEnd) {
            time.setHours(time.getHours() + 1);
            intervalos.push(`${("0" + time.getHours()).slice(-2)}:${("0" + time.getMinutes()).slice(-2)}`);
        }

        setTimes(intervalos);
        // eslint-disable-next-line
    }, [])

    const updateCartItems = () => {
        let total = 0;
        const sessionCartItems = getCartItems();
        sessionCartItems.map(cartItem => {
            return total += (cartItem.cost * cartItem.quantity);
        });

        setCartItems(sessionCartItems);

        setSubTotal(total);
    };

    const handleChangeValue = (value) => {
        setItemSelected({
            ...itemSelected,
            quantity: value
        });
    }

    const handleChangeType = (event) => {
        setTypeDelivery(event.target.value);
    }

    const handleSelectItem = (item, key) => {
        setItemSelected(item);
        setKeyItemSelected(key);
        setShowItemEdit(!showItemEdit);
    }

    const handleSubmit = () => {
        if (!verifyInformations()) {
            const informName = window.confirm("Quem é você? Consegue me informar?");
            if (informName) {
                history.push("/dados?from=cart&delivery=" + typeDelivery);
                return;
            } else {
                return;
            }
        }

        setButtonStatus("loading");
        const campaign = getCampaign();
        const informations = getInformation();
        let order = {
            name: informations.name,
            contact: informations.contact,
            zipCode: informations.postalCode,
            address: informations.address,
            number: informations.number,
            complement: informations.complement,
            city: informations.city,
            type: typeDelivery,
            items: getCartItems()
        }

        api.post("/order", order)
            .then(response => {
                order = response.data;
                order.date = campaign.date;
                setOrder(order);
                setButtonStatus("success");
                setTimeout(() => {
                    clearCart();
                    setCartItems([]);
                    history.push("/pedidos");
                }, 1000);
            }).catch(error => {
                setButtonStatus("error");
                console.error(error);
            });
    }

    const verifyInformations = () => {
        const informations = getInformation();

        if (informations === null) {
            return false;
        }

        if (!informations.name && !informations.contact) {
            return false;
        }

        return true;
    }

    const handleClickEdit = async () => {
        if (itemSelected.quantity === 0) {
            removeCartItem(keyItemSelected);

            setShowItemEdit(!showItemEdit);
            updateCartItems();
        } else {
            const itemsFiltered = getCartItems().map((cartItem, key) => {
                return parseInt(key) === parseInt(keyItemSelected) ? itemSelected : cartItem;
            });

            setCartItems(itemsFiltered);
            setShowItemEdit(!showItemEdit);
        }
    }

    const buttonLabel = () => {
        return (
            itemSelected.quantity === 0 ?
                <span className="buttonRemoveLabel">Remover</span>
                :
                <>
                    <span className="buttonLabel">Atualizar</span>
                    <span className="buttonValue">
                        {utils.toLocale(itemSelected.cost * itemSelected.quantity)}
                    </span>
                </>
        )
    }

    const handleShowEditItem = event => {
        if (event.target.id === "cartItemEdit") {
            setShowItemEdit(!showItemEdit);
        }
    }

    return (
        <>
            <Menu showBack description="quase acabando!" />
            <div className="cartContainer">
                <div className="cartContent">
                    <div className="typeDelivery">
                        <div>
                            <input
                                type="radio"
                                name="type"
                                id="typeFetch"
                                value="0"
                                checked={parseInt(typeDelivery) === 0 ? true : false}
                                onChange={(event) => { handleChangeType(event) }}
                            />
                            <label htmlFor="typeFetch">Retirar</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="type"
                                id="typeDeliver"
                                value="1"
                                checked={parseInt(typeDelivery) === 1 ? true : false}
                                onChange={(event) => { handleChangeType(event) }}
                                disabled
                            />
                            <label htmlFor="typeDeliver">Entregar</label>
                        </div>
                    </div>
                    <h3 className="cartText">seu pedido!</h3>
                    <div className="cartItems">
                        {
                            cartItems.map((item, key) => {
                                return (
                                    <div className="cartItem" key={key} onClick={() => handleSelectItem(item, key)}>
                                        <p className="cartQuantity">{`${item.quantity}x`}</p>
                                        <div className="cartTitle">
                                            {item.title}
                                            <p className="cartObservation">
                                                Observação:{" "}
                                                <span>
                                                    {item.observation}
                                                </span>
                                            </p>
                                        </div>
                                        <p className="cartValue">
                                            {utils.toLocale(item.cost * item.quantity)}
                                        </p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="timeToDeliver">
                    <label htmlFor="timeToDeliver">
                        Horário para {parseInt(typeDelivery) === 0 ? "retirar" : "entregar"}:
                    </label>
                    <select name="timeToDeliver" id="timeToDeliver">
                        {times.map((time, index) => {
                            return times[index + 1] !== undefined &&
                                <option key={index} value={time}>{`${time} até ${times[index + 1]}`}</option>
                        })}
                    </select>
                </div>
                <div className="cartTotal">
                    <div className="cartSubTotal">
                        <p className="cartSubTotalText">
                            subtotal:{" "}
                            <span>
                                {utils.toLocale(subTotal)}
                            </span>
                        </p>
                        <p className="cartSubTotalText">
                            entrega:{" "}
                            <span>
                                {parseInt(typeDelivery) === 0 ? "retirar" : utils.toLocale("5.00")}
                            </span>
                        </p>
                    </div>
                    <div className="cartOrderEnd">
                        <p className="cartTotalText">
                            total:{" "}
                        </p>
                        <p className="cartTotalValue">
                            {utils.toLocale(subTotal + (parseInt(typeDelivery) === 1 ? 5.00 : 0))}
                        </p>
                        <Button
                            label="Pedir mais!!"
                            className="cartButtonReturn"
                            onClick={() => history.push("/loja")}
                        />
                        <Button
                            label="Finalizar"
                            className="cartButton"
                            onClick={() => handleSubmit()}
                            showLoading
                            status={buttonStatus}
                        />
                    </div>
                </div>
                <div
                    className={`cartItemEdit ${showItemEdit ? "showItemEdit" : "hideItemEdit"}`}
                    onClick={event => handleShowEditItem(event)}
                    id="cartItemEdit"
                >
                    <div className="cartItemEditContent" id="cartItemEditContent">
                        <p className="cartItemEditTitle">
                            {itemSelected.title}
                        </p>
                        <div className="itemCount">
                            <Quantity
                                handleChangeValue={(value) => handleChangeValue(value)}
                                update
                                item={itemSelected}
                            />
                            <Button
                                className={`buttonAdd ${itemSelected.quantity === 0 ? "buttonRemove" : null}`}
                                label={buttonLabel()}
                                onClick={() => handleClickEdit()}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default Cart;