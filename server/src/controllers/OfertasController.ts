import { Request, Response } from "express";

import OfertaModel from "../Model/OfertaModel";

const ofertaModel = new OfertaModel();

class OfertasController {
    async index(request: Request, response: Response) {
        let ofertas = await ofertaModel.index();

        return response.json(ofertas);
    }

    async create(request: Request, response: Response) {
        const oferta = await ofertaModel.create(request.body);

        return response.json(oferta);
    }

    async update(request: Request, response: Response) {
        const oferta = await ofertaModel.update(request.body);

        return response.json(oferta);
    }

    async delete(request: Request, response: Response) {
        const oferta = await ofertaModel.delete(Number(request.params.id));

        return response.json(oferta);
    }
}

export default OfertasController;