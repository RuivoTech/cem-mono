import knex from "../database/connection";

import { Ministerio } from "../interfaces/MinisterioInterface";

interface Quantidade {
    quantidade: number
}

class MinisterioModel {
    async index() {
        const ministerios = await knex("ministerios");

        return ministerios;
    }

    async create(ministerio: Ministerio) {
        try {
            const minsiterioInserir = {
                nome: ministerio.nome,
                descricao: ministerio.descricao,
            }

            const insertedIds = await knex("ministerios")
                .insert(minsiterioInserir);

            const ministerioId = insertedIds[0];

            ministerio.id = ministerioId;

            return ministerio;
        } catch (error) {
            return { error };
        }
    }

    async update(ministerio: Ministerio) {
        try {
            const ministerioInserir = {
                id: ministerio.id,
                nome: ministerio.nome,
                descricao: ministerio.descricao
            }

            await knex("ministerios")
                .update(ministerioInserir)
                .where("id", String(ministerio.id));

            return ministerio;
        } catch (error) {
            return { error };
        }
    }

    async delete(id: Number) {
        try {
            await knex("ministerios")
                .delete()
                .where("id", id);

            return { mensagem: "Ministerio removido com sucesso." };
        } catch (error) {
            return { error };
        }
    }
}

export default MinisterioModel;