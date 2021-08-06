import express from "express";

import CampaignController from "../controllers/CampaignController";
import OrderController from "../controllers/OrderController";

const campaignController = new CampaignController();
const orderController = new OrderController();

const Delivery = express.Router();

Delivery.route("/store")
    .get(campaignController.store);

Delivery.route("/order")
    .post(orderController.create);

export default Delivery;