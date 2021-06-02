import React, { useContext, useEffect, useState } from 'react';

import Menu from '../../components/Menu';
import Card from '../../components/Card';
import Location from '../../components/Location';

import { Context } from "../../services/Context";

import "./styles.css";

function Store() {
    const [items, setItems] = useState([]);
    const { getStore } = useContext(Context);

    useEffect(() => {
        setItems(getStore());
        //eslint-disable-next-line
    }, []);

    return (
        <>
            <Menu showCart />
            <div className="orderContainer">
                {
                    items ?
                        items.map(item => {
                            return <Card item={item} key={item.id} />
                        }) : null
                }
            </div>
            <Location />
        </>
    );
}

export default Store;