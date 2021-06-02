import React from 'react';

import { useHistory } from 'react-router';

import { baseURL } from "../../services/api";

import './styles.css';

function Card({ item }) {
    const history = useHistory();

    const handleClick = (id) => {
        history.push({ pathname: "/item", params: { item }, search: `${id}` });
    }

    return (
        <div className="cardContainer" onClick={() => { handleClick(item.id) }}>
            <div className="cardContent">
                <div className="cardImage">
                    <img src={baseURL + "/" + item.image} alt={item.title} className="cardLogo" />
                </div>
                <div className="cardText">
                    <h3 className="cardTitle">{item.title}</h3>
                    <p className="cardDescription">
                        {item.description}
                    </p>
                    <p className="cardMoney">{item.cost.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
                </div>
            </div>
        </div>
    );
}

export default Card;