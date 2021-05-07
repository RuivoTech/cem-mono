import { Request, Response } from "express";

import EventoModel from "../Model/EventoModel";

const eventoModel = new EventoModel();

class EventoController {
    async index(request: Request, response: Response) {
        const eventos = await eventoModel.index();

        return response.json(eventos);
    }

    async create(request: Request, response: Response) {
        const eventos = await eventoModel.create(request.body);

        return response.json(eventos);
    }

    async update(request: Request, response: Response) {
        const eventos = await eventoModel.update(request.body);

        return response.json(eventos);
    }

    async delete(request: Request, response: Response) {
        const evento = await eventoModel.delete(Number(request.params.id));

        return response.json(evento);
    }

    async inscricao(request: Request, response: Response) {
        const params = request.params;
        const eventos = await eventoModel.inscricao({ ativo: Boolean(params.ativo) });

        return response.json(eventos);
    }
}

export default EventoController;