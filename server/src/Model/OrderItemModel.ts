import knex from "../database/connection";

import { OrderItems } from "../interfaces/OrderItemsInterface";

class OrderItemModel {
    async index() {
        const orders = await knex("order");

        return orders;
    }

    async create(items: [OrderItems], fkOrder: number) {
        try {
            const itemsFiltered = items.map(item => {
                return {
                    title: item.title,
                    quantity: item.quantity,
                    observation: item.observation,
                    cost: item.cost,
                    fkOrder,
                    fkStore: item.id
                }
            })
            await knex("orderItems").insert(itemsFiltered);
            return itemsFiltered;
        } catch (error) {
            return error;
        }
    }
}

export default OrderItemModel