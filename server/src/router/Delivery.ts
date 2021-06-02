import express from "express";

import StoreController from "../controllers/StoreController";

const storeController = new StoreController();

const Delivery = express.Router();

Delivery.route("/store")
    .get(storeController.index)

export default Delivery;