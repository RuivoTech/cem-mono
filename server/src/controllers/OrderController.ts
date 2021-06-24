import { Request, Response } from "express";

import OrderModel from "../Model/OrderModel";

const orderModel = new OrderModel();

class OrderController {
    async index(request: Request, response: Response) {
        const order = await orderModel.index();

        return response.json(order);
    }
    async create(request: Request, response: Response) {
        const order = request.body;
        const createdorder = await orderModel.create(order);

        setTimeout(() => {
            return response.json(createdorder);
        }, 5000);
    }
}

export default OrderController;