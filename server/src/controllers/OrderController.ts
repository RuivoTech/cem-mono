import { Request, Response } from "express";

import OrderModel from "../Model/OrderModel";

const orderModel = new OrderModel();

class OrderController {
    async index(request: Request, response: Response) {
        const order = await orderModel.index();

        return response.json(order);
    }
    async show(request: Request, response: Response) {
        const { id } = request.params;
        const order = await orderModel.show(parseInt(id));

        return response.json(order);
    }
    async create(request: Request, response: Response) {
        const order = request.body;
        const createdorder = await orderModel.create(order);

        return response.json(createdorder);
    }
    async update(request: Request, response: Response) {
        const order = request.body;
        const createdorder = await orderModel.update(order);

        return response.json(createdorder);
    }

    async updatePayment(request: Request, response: Response) {
        const order = request.body;
        const createdorder = await orderModel.updatePayment(order);

        return response.json(createdorder);
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const orderDeleted = await orderModel.delete(parseInt(id));

        return response.json(orderDeleted);
    }
}

export default OrderController;