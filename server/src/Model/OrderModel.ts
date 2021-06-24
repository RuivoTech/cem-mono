import knex from "../database/connection";

import { Order } from "../interfaces/OrderInterface";

import OrderItemModel from "./OrderItemModel";

const orderItem = new OrderItemModel();

class OrderModel {
    async index() {
        const orders = await knex("order");

        return orders;
    }

    async create(order: Order) {
        const date = new Date();
        try {
            const insertedId = await knex("order").insert({
                name: order.name,
                contact: order.contact,
                zipCode: order.zipCode,
                address: order.address,
                number: order.number,
                complement: order.complement,
                city: order.city,
                type: order.type,
                status: 1
            });

            const orderId = insertedId[0];

            const orderItems = await orderItem.create(order.items, orderId);

            order.id = orderId;
            order.items = orderItems;
            order.date = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`

            return order;
        } catch (error) {
            return { error };
        }
    }
}

export default OrderModel;