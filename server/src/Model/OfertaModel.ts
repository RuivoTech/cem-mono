import knex from "../database/connection";

import { Oferta } from "../interfaces/OfertaInterface";

interface Quantidade {
    quantidade: number
}

class OfertaModel {
    async index() {
        const ofertas = await knex("ofertas");

        return ofertas;
    }

    async create(oferta: Oferta) {
        try {
            const ofertaInserir = {
                valor: oferta.valor,
                data: oferta.data,
            }

            const insertedIds = await knex("ofertas")
                .insert(ofertaInserir);

            const ofertaId = insertedIds[0];

            oferta.id = ofertaId;

            return oferta;
        } catch (error) {
            return { error };
        }
    }

    async update(oferta: Oferta) {
        try {
            const ofertaAtualizar = {
                id: oferta.id,
                valor: oferta.valor,
                data: oferta.data.split("T")[0]
            }

            await knex("ofertas")
                .update(ofertaAtualizar)
                .where("id", String(oferta.id));

            return oferta;
        } catch (error) {
            return { error };
        }
    }

    async delete(id: Number) {
        try {
            await knex("ofertas")
                .delete()
                .where("id", id);

            return { mensagem: "Oferta removida com sucesso." };
        } catch (error) {
            return { error };
        }
    }
}

export default OfertaModel;