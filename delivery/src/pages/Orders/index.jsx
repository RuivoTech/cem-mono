import React from 'react';
import Menu from '../../components/Menu';

import './styles.css';

const pedidos = [
    {
        id: 1,
        data: "29/05",
        items: [
            {
                id: 1,
                description: "marmita individual",
                quantity: 2,
                cost: 28.00
            },
            {
                id: 2,
                description: "combo familia",
                quantity: 1,
                cost: 44.00
            },
            {
                id: 3,
                description: "marmita grande",
                quantity: 1,
                cost: 18.00
            }
        ]
    },
    {
        id: 2,
        data: "18/04",
        items: [
            {
                id: 4,
                description: "marmita individual",
                quantity: 1,
                cost: 14.00
            },
            {
                id: 5,
                description: "combo familia",
                quantity: 1,
                cost: 44.00
            }
        ]
    }
]

function Orders() {

    const calcTotalCost = (items) => {
        let total = 0;

        for (var i in items) { total += items[i].cost; }

        return total;
    }

    return (
        <div className="ordersContainer">
            <Menu showBack showCart={false} description="meus pedidos" />
            <div className="ordersContent">
                {pedidos.map(pedido => {
                    const totalcost = calcTotalCost(pedido.items);
                    return (
                        <div className="orderCard" key={pedido.id}>
                            <div className="orderTitle">
                                <p className="orderData">Retirada: <span>{pedido.data}</span></p>
                                <p className="orderCost">{totalcost.toLocaleString("pt-BR", { style: 'currency', currency: "BRL" })}</p>
                            </div>
                            <div className="orderCardItems">
                                {pedido.items.map(item => {
                                    return (
                                        <div className="orderCardItem" key={item.id}>
                                            <p className="orderCardItemQuantity">{`${item.quantity}x`}</p>
                                            <p className="orderCardDescription">{item.description}</p>
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