import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBars, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import Sidebar from '../Sidebar';
import { Context } from "../../services/Context";

import logo from "../../assets/images/logo_cem_branca.png";

import './styles.css';

function Menu({ showBack, showCart, description, toHome = false }) {
    const [showSidebar, setShowSidebar] = useState(false);
    const [quantityCart, setQuantityCart] = useState(0);
    const history = useHistory();
    const { getQuantityCartItems } = useContext(Context);

    useEffect(() => {
        const quantityCart = getQuantityCartItems();

        setQuantityCart(quantityCart);
    }, [getQuantityCartItems]);

    const handleClickSidebar = () => {
        setShowSidebar(!showSidebar);
    }

    const handleClickCart = () => {
        history.push("/carrinho");
    }

    return (
        <>
            <Sidebar show={showSidebar} handleClick={() => { handleClickSidebar() }} />
            <div className="menuContainer">
                {
                    showBack ?
                        <FontAwesomeIcon
                            className="goBack"
                            onClick={() => toHome ? history.push("/loja") : history.goBack()}
                            icon={faArrowLeft}
                            color="#00BBAE" size="2x"
                        />
                        :
                        <div className="user" onClick={() => handleClickSidebar()}>
                            <FontAwesomeIcon className="menuBars" tabIndex="0" icon={faBars} color="var(--color-primary)" size="2x" />
                        </div>
                }
                {description ?
                    <p className="menuDescription">
                        {description}
                    </p> :
                    <img src={logo} alt="Centro Evangélico de Maringá" className="logo" />
                }
                {showCart ?
                    <div className="menuCart" onClick={() => handleClickCart()}>
                        <FontAwesomeIcon className="menuCartIcon" icon={faShoppingCart} color="#00BBAE" size="2x" />
                        <span className="menuCartCount">{quantityCart}</span>
                    </div>
                    : <div>" </div>}
            </div>
        </>
    );
}

export default Menu;