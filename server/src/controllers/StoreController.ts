import { Request, Response } from "express";

import StoreModel from "../Model/StoreModel";

const storeModel = new StoreModel();

class StoreController {
    async index(request: Request, response: Response) {
        const store = await storeModel.index();

        return response.json(store);
    }
    async create(request: Request, response: Response) {
        console.log(request);

        /* const store = request.body;
        const createdStore = await storeModel.create(store);

        return response.json(createdStore); */
        return response.send("Tudo Certo");
    }
}

export default StoreController;