import { Request, Response } from "express";

import StoreModel from "../Model/StoreModel";

const storeModel = new StoreModel();

class StoreController {
    async index(request: Request, response: Response) {
        const store = await storeModel.index();

        return response.json(store);
    }
    async create(request: Request, response: Response) {
        const image = request.file?.filename;
        let store = request.body;
        store.image = image;
        const createdStore = await storeModel.create(store);

        return response.json(createdStore);
    }
    async update(request: Request, response: Response) {
        const image = request.file?.filename;
        let store = request.body;
        store.image = image;
        const updatedStore = await storeModel.update(store);

        return response.json(updatedStore);
    }
}

export default StoreController;