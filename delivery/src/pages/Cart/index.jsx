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
    const { getCartItems, saveCartItems, removeCartItem } = useContext(Context);
    const [cartItems, setCartItems] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    const [showItemEdit, setShowItemEdit] = useState(false);
    const history = useHistory();
    const [typeDelivery, setTypeDelivery] = useState(0);
    const [itemSelected, setItemSelected] = useState({
        id: "",
        title: "",
        description: "",
        cost: 0,
        quantity: 0,
        observation: ""
    });
    const [keyItemSelected, setKeyItemSelected] = useState(-1);

    useEffect(() => {
        let total = 0;
        const sessionCartItems = getCartItems();
        sessionCartItems.map(cartItem => {
            return total += (cartItem.cost * cartItem.quantity);
        });

        setCartItems(sessionCartItems);

        setSubTotal(total);
    }, [getCartItems]);

    useEffect(() => {
        let total = 0;
        cartItems.map(cartItem => {
            return total += (cartItem.cost * cartItem.quantity);
        });
        setSubTotal(total);

        saveCartItems(cartItems);
        // eslint-disable-next-line
    }, [cartItems])

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
        const informations = getInformation();
        const order = {
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
                console.log(response.data);
            }).catch(error => {
                console.log(error);
            });
    }

    const handleClickEdit = async () => {
        if (itemSelected.quantity === 0) {
            removeCartItem(keyItemSelected);
            setShowItemEdit(!showItemEdit);
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
                        <Button label="Pedir mais!!" className="cartButtonReturn" onClick={() => history.push("/loja")} />
                        <Button
                            label="Finalizar"
                            className="cartButton"
                            onClick={() => handleSubmit()}
                            showLoading
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