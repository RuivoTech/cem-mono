import express from "express";

import StoreController from "../controllers/StoreController";
import OrderController from "../controllers/OrderController";

const storeController = new StoreController();
const orderController = new OrderController();

const Delivery = express.Router();

Delivery.route("/store")
    .get(storeController.index)
    .post(storeController.create);

Delivery.route("/order")
    .post(orderController.create);

export default Delivery;