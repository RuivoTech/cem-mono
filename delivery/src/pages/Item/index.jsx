import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router';

import Menu from '../../components/Menu';
import Quantity from '../../components/Quantity';
import Button from "../../components/Button";

import { Context } from "../../services/Context";
import { baseURL } from "../../services/api";

import errorImage from "../../assets/images/sem_imagem.png";

import './styles.css';

function Item({ location }) {
    const [itemSelected, setItemSelected] = useState({
        id: "",
        title: "",
        description: "",
        cost: 0,
        quantity: 0,
        observation: ""
    });
    const [quantity, setQuantity] = useState(1);
    const [observation, setObservation] = useState("");
    const { setItemCart, getStore } = useContext(Context);
    const history = useHistory();

    useEffect(() => {
        const id = location.search.slice(1);
        const store = getStore();
        const storeSelected = store.filter(storeItem => {
            return storeItem.id === parseInt(id);
        });

        setItemSelected(storeSelected[0]);
    }, [getStore, location]);

    const buttonLabel = () => {
        return (
            <>
                <span className="buttonLabel">Adicionar</span>
                <span className="buttonValue">
                    {(itemSelected.cost * quantity).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </span>
            </>
        )
    }

    const handleChangeValue = (value) => {
        setQuantity(value);
    }

    const handleClick = () => {
        const itemCart = {
            id: itemSelected.id,
            title: itemSelected.title,
            description: itemSelected.description,
            cost: itemSelected.cost * quantity,
            quantity,
            observation
        }

        setItemCart(itemCart);
        setTimeout(() => {
            history.push("/carrinho");
        }, 500);
    }

    return (
        <>
            <Menu showBack showCart />
            <div className="itemContainer">
                <div className="itemImageCard">
                    <img
                        src={baseURL + "/" + itemSelected.image}
                        alt={itemSelected.title}
                        className="itemLogo"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = errorImage
                        }}
                    />
                </div>
                <div className="itemInformation">
                    <h2 className="itemTitle">{itemSelected.title}</h2>
                    <p className="itemDescription">
                        {itemSelected.description}
                    </p>
                    <p className="itemMoney">
                        {itemSelected.cost.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </p>
                </div>
                <div className="itemObservation">
                    <label htmlFor="description" className="labelDescription">
                        <FontAwesomeIcon icon={faCommentAlt} color="#00BBAE" size="1x" />{" "}
                        Alguma observação?
                    </label>
                    <textarea
                        name="observation"
                        id="description"
                        className="textDescription"
                        cols="5"
                        rows="5"
                        placeholder="Ex: Ponto da carne, tirar a salada, etc."
                        onChange={event => setObservation(event.target.value)}
                    ></textarea>
                </div>
                <div className="itemCount">
                    <Quantity handleChangeValue={(value) => handleChangeValue(value)} />
                    <Button className="buttonAdd" label={buttonLabel()} onClick={() => handleClick()} />
                </div>
            </div>
        </>
    );
}

export default Item;