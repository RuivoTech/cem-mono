import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import Menu from '../../components/Menu';
import Loading from '../../components/Loading';

import Utils from "../../services/Utils";
import { Context } from "../../services/Context";

import './styles.css';

function Orders() {
    const utils = new Utils();
    const { getOrders } = useContext(Context);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const localOrders = getOrders() ? getOrders() : [];
        setOrders(localOrders);
        setLoading(false);
        // eslint-disable-next-line
    }, []);

    const calcTotalCost = (items) => {
        let total = 0;

        for (var i in items) { total += items[i].cost * items[i].quantity; }

        return total;
    }

    return (
        <div className="ordersContainer">
            <Menu showBack showCart={false} description="meus pedidos" toHome />
            <div className="ordersContent">
                {loading ?
                    <Loading />
                    :
                    orders.length === 0 ?
                        <div className="errorMessage">
                            <FontAwesomeIcon icon={faExclamationTriangle} color="#ff4949" size="5x" />
                            <p>
                                Que pena, você não tem pedidos!!
                            </p>
                        </div>
                        :
                        orders.map(order => {
                            const date = new Date(order.date);

                            const totalcost = calcTotalCost(order.items);
                            return (
                                <div className="orderCard" key={order.id}>
                                    <div className="orderTitle">
                                        <p className="orderData">{order.type === 0 ? "Retirada" : "Entrega"}: <span>{
                                            date.toLocaleString("pt-BR", { year: 'numeric', month: 'numeric', day: 'numeric' })
                                        }</span></p>
                                        <p className="orderCost">
                                            {utils.toLocale(totalcost)}
                                            {parseInt(order.type) === 1 ? <span> + R$ 5,00</span> : ""}
                                        </p>
                                    </div>
                                    <div className="orderCardItems">
                                        {order.items.map(item => {
                                            return (
                                                <div className="orderCardItem" key={item.fkOrder + item.fkStore}>
                                                    <p className="orderCardItemQuantity">{`${item.quantity}x`}</p>
                                                    <p className="orderCardDescription">{item.title}</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}
            </div>
        </div>
    );
}

export default Orders;