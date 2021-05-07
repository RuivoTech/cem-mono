import { Request, Response } from "express";

import MembrosModel from "../Model/MembroModel";
import VisitanteModel from "../Model/VisitanteModel";

const membrosModel = new MembrosModel();
const visitanteModel = new VisitanteModel();

interface Filters {
    constant: string,
    value: [] | string
}

export default class RelatoriosController {
    async switch(request: Request, response: Response) {
        const { route } = request.params;
        const filters = request.query;

        let relatorio: any = {};

        switch (route) {
            case "membros":
                relatorio = await membrosModel.relatorio(filters);
                break;
            case "visitantes":
                relatorio = await visitanteModel.relatorio(filters);
                break;
            default:
                break;
        }

        return response.json(relatorio);
    }
}