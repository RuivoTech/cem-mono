import { Request, Response } from "express";

import InscricaoModel from "../Model/InscricaoModel";

const inscricaoModel = new InscricaoModel();

class InscricoesController {
    async index(request: Request, response: Response) {
        let inscricoes = await inscricaoModel.index();

        return response.json(inscricoes);
    }

    async create(request: Request, response: Response) {
        const inscricao = await inscricaoModel.create(request.body);

        return response.json(inscricao);
    }

    async update(request: Request, response: Response) {
        const inscricao = await inscricaoModel.update(request.body);

        return response.json(inscricao);
    }

    async delete(request: Request, response: Response) {
        const inscricao = await inscricaoModel.delete(Number(request.params.id));

        return response.json(inscricao);
    }
}

export default InscricoesController;