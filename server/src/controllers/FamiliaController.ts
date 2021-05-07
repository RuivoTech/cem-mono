import knex from "../database/connection";
import { Familia } from "../interfaces/FamiliaInterface";

import { Parentes } from "../interfaces/ParentesInterface";
import FamiliaModel from "../Model/FamiliaModel";

const familiaModel = new FamiliaModel();

class FamiliaController {
    async save(parentes: Parentes, chEsMembro: Number) {
        try {
            const familia = await familiaModel.create(parentes, chEsMembro);

            return familia;
        } catch (error) {
            console.log(error);

            return error;
        }
    }

    async findMembro(id: Number) {
        const membro = familiaModel.findMembro(id);

        return membro;
    }


    async removeMembro(id: Number) {
        try {
            familiaModel.removeMembro(id);

            return "ok";
        } catch (error) {
            console.log(error);

            return error;
        }
    }
}

export default FamiliaController;