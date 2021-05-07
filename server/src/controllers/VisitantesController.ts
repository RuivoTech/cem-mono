import { Request, Response } from "express";

import VisitanteModel from "../Model/VisitanteModel";

const visitanteModel = new VisitanteModel();

class VisitantesController {
    async index(request: Request, response: Response) {
        let visitantes = await visitanteModel.index();

        return response.json(visitantes);
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const visitante = await visitanteModel.show(Number(id));

        return response.json(visitante);
    }

    async create(request: Request, response: Response) {
        try {
            const visitante = request.body;

            const novoVisitante = await visitanteModel.create(visitante);

            return response.json(novoVisitante);
        } catch (error) {
            return response.json({ error: error });
        }
    }

    async update(request: Request, response: Response) {
        try {
            const visitante = request.body;

            const novoVisitante = await visitanteModel.update(visitante);

            return response.json(novoVisitante);
        } catch (error) {
            return response.json(error);
        }
    }

    async delete(request: Request, response: Response) {
        try {
            const { id } = request.params;

            const retorno = await visitanteModel.remove(Number(id));

            return response.json(retorno);
        } catch (error) {
            return response.json(error);
        }
    }
}

export default VisitantesController;