import knex from "../database/connection";

import { Order } from "../interfaces/OrderInterface";

import OrderItemModel from "./OrderItemModel";

const orderItem = new OrderItemModel();

class OrderModel {
    async index() {
        const orders = await knex<Order>("order");

        const ordersFiltered = await Promise.all(orders.map(async (order) => {
            const items = await orderItem.index(Number(order.id));

            return (
                {
                    ...order,
                    items
                }
            )
        }));

        return ordersFiltered;
    }

    async create(order: Order) {
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

            return order;
        } catch (error) {
            return { error };
        }
    }

    async update(order: Order) {
        try {
            await knex("order").update({
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

            const orderItems = await orderItem.create(order.items, Number(order.id));

            order.items = orderItems;

            return order;
        } catch (error) {
            return { error };
        }
    }

    async updatePayment(order: Order) {
        try {
            await knex("order").update({
                status: order.status
            }).where("id", Number(order.id));

            return order;
        } catch (error) {
            return { error };
        }
    }
}

export default OrderModel;