import knex from "../database/connection";

import { Igreja } from "../interfaces/IgrejaInterface";

class IgrejaModel {
    async create(igreja: Igreja, chEsMembro: Number) {
        try {
            const igrejaIserir = {
                ehBatizado: igreja.ehBatizado,
                dataBatismo: igreja.dataBatismo,
                igrejaBatizado: igreja.igrejaBatizado,
                ultimoPastor: igreja.ultimoPastor,
                ultimaIgreja: igreja.ultimaIgreja,
                chEsMembro
            }

            const insertedId = await knex("igreja").insert(igrejaIserir);
            const igrejaId = insertedId[0];

            return {
                id: igrejaId,
                ...igrejaIserir
            }
        } catch (error) {
            return error;
        }
    }

    async update(igreja: Igreja, chEsMembro: Number) {
        try {
            const igrejaAtualizar = {
                id: igreja.id,
                ehBatizado: igreja.ehBatizado,
                dataBatismo: igreja.dataBatismo?.split("T")[0],
                igrejaBatizado: igreja.igrejaBatizado,
                ultimoPastor: igreja.ultimoPastor,
                ultimaIgreja: igreja.ultimaIgreja,
                chEsMembro
            }

            await knex("igreja")
                .where("id", igreja.id)
                .update(igrejaAtualizar);

            return igrejaAtualizar;
        } catch (error) {
            console.log(error);

            return error;
        }
    }

    async findMembro(id: Number) {
        const igreja = await knex("igreja")
            .where("chEsMembro", id)
            .first();

        return igreja;
    }

    async removeMembro(chEsMembro: Number) {
        try {
            await knex("igreja")
                .where({ chEsMembro })
                .delete();

            return "OK";
        } catch (error) {
            return error;
        }

    }
}

export default IgrejaModel;