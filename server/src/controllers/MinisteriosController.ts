import { Request, Response } from "express";

import MinisterioModel from "../Model/MinisterioModel";

const ministerioModel = new MinisterioModel();

class MinisterioController {
    async index(request: Request, response: Response) {
        const ministerios = await ministerioModel.index();

        return response.json(ministerios);
    }

    async create(request: Request, response: Response) {
        const ministerio = await ministerioModel.create(request.body);

        return response.json(ministerio);
    }

    async update(request: Request, response: Response) {
        const ministerio = await ministerioModel.update(request.body);

        return response.json(ministerio);
    }

    async delete(request: Request, response: Response) {
        const evento = await ministerioModel.delete(Number(request.params.id));

        return response.json(evento);
    }
}

export default MinisterioController;