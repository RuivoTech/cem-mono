import React, { useContext, useEffect, useState } from 'react';

import Menu from "../../components/Menu";
import Button from "../../components/Button";
import { useHistory } from 'react-router';

import { Context } from "../../services/Context";

import './styles.css';

function Cart() {
    const { getCartItems } = useContext(Context);
    const [typeDelivery, setTypeDelivery] = useState(1);
    const [subTotal, setSubTotal] = useState(0);
    const history = useHistory();

    useEffect(() => {
        let total = 0;
        getCartItems().map(cartItem => {
            return total += cartItem.cost;
        });

        setSubTotal(total);
    }, [getCartItems]);

    const handleChange = (value) => {
        setTypeDelivery(value);
    }

    const handleClick = () => {
        console.log("Finalizou!!");
    }

    return (
        <>
            <Menu showBack description="quase acabando!" />
            <div className="cartContainer">
                <div className="typeDelivery">
                    <div className="radioCheck">
                        <input
                            type="radio"
                            name="typeDelivery"
                            id="typeDelivery"
                            onChange={() => { handleChange(1) }}
                            checked={typeDelivery === 1}
                            value="1"
                        />
                        <label htmlFor="typeDelivery">Retirar</label>
                    </div>
                    <div className="radioCheck">
                        <input
                            type="radio"
                            name="typeDelivery"
                            id="typeDelivery"
                            onChange={() => { handleChange(2) }}
                            checked={typeDelivery === 2}
                            value="2"
                        />
                        <label htmlFor="typeDelivery">Entregar</label>
                    </div>
                </div>
                <div className="cartContent">
                    <h3 className="cartText">seu pedido!</h3>
                    <div className="cartItems">
                        {
                            getCartItems().map((item, key) => {
                                return (
                                    <div className="cartItem" key={key}>
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
                                            {item.cost.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
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
                                {subTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                            </span>
                        </p>
                    </div>
                    <div className="cartOrderEnd">
                        <p className="cartTotaltext">total:</p>
                        <p className="cartTotalValue">
                            {subTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                        </p>
                        <Button label="Pedir mais!!" className="cartButtonReturn" onClick={() => history.push("/loja")} />
                        <Button label="Finalizar" className="cartButton" onClick={() => handleClick()} />
                    </div>
                </div>
            </div>
        </>
    );

}

export default Cart;