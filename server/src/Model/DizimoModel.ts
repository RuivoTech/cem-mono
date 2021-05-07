import knex from "../database/connection";

import { Dizimo } from "../interfaces/DizimoInterface";

interface Quantidade {
    quantidade: number
}

class DizimoModel {
    async index() {
        const dizimos = await knex("dizimos AS d")
            .join("membros AS m", "m.id", "d.chEsMembro")
            .select(
                "d.id",
                "d.valor",
                "d.dataDizimo",
                "d.chEsMembro",
                "m.nome"
            );

        return dizimos;
    }

    async create(dizimo: Dizimo) {
        try {
            const dizimoInserir = {
                valor: dizimo.valor,
                dataDizimo: dizimo.dataDizimo,
                chEsMembro: dizimo.chEsMembro
            }

            const insertedIds = await knex("dizimos")
                .insert(dizimoInserir);

            const dizimoId = insertedIds[0];

            dizimo.id = dizimoId;

            return dizimo;
        } catch (error) {
            return { error };
        }
    }

    async update(dizimo: Dizimo) {
        try {
            const dizimoAtualizar = {
                id: dizimo.id,
                valor: dizimo.valor,
                dataDizimo: dizimo.dataDizimo.split("T")[0],
                chEsMembro: dizimo.chEsMembro
            }

            await knex("dizimos")
                .update(dizimoAtualizar)
                .where("id", String(dizimo.id));

            return dizimo;
        } catch (error) {
            return { error };
        }
    }

    async delete(id: Number) {
        try {
            await knex("dizimos")
                .delete()
                .where("id", id);

            return { mensagem: "Dizimo removido com sucesso." };
        } catch (error) {
            return { error };
        }
    }
}

export default DizimoModel;