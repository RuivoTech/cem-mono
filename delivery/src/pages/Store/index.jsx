import React, { useContext, useEffect, useState } from 'react';

import Menu from '../../components/Menu';
import Card from '../../components/Card';
import Location from '../../components/Location';
import Loading from "../../components/Loading";

import api from '../../services/api';
import { Context } from "../../services/Context";

import "./styles.css";

function Store() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { setCampaign } = useContext(Context);

    useEffect(() => {
        const request = async () => {
            try {
                const store = await api.get("/store");

                setCampaign(store.data);
                setItems(store.data.items);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }

        request();
    }, [setCampaign]);

    return (
        <>
            <Menu showCart />
            <div className="orderContainer">
                {loading ?
                    <Loading />
                    :
                    items ?
                        items.map(item => {
                            return <Card item={item} key={item.id} />
                        }) :
                        <p className="errorMessage">
                            Ops, nenhum produto cadastrado!!
                        </p>
                }
            </div>
            <Location />
        </>
    );
}

export default Store;