import { Request, Response } from "express";

import DizimoModel from "../Model/DizimoModel";

const dizimoModel = new DizimoModel();

class DizimosController {
    async index(request: Request, response: Response) {
        let dizimos = await dizimoModel.index();

        return response.json(dizimos);
    }

    async create(request: Request, response: Response) {
        const dizimo = await dizimoModel.create(request.body);

        return response.json(dizimo);
    }

    async update(request: Request, response: Response) {
        const dizimo = await dizimoModel.update(request.body);

        return response.json(dizimo);
    }

    async delete(request: Request, response: Response) {
        const dizimo = await dizimoModel.delete(Number(request.params.id));

        return response.json(dizimo);
    }
}

export default DizimosController;