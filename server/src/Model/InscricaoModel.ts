import knex from "../database/connection";

import { Inscricao } from "../interfaces/InscricaoInterface";

interface Quantidade {
    quantidade: number
}

class InscricaoModel {
    async index() {
        const inscricoes = await knex("inscricoes AS i")
            .join("eventos AS e", "e.id", "i.chEsEvento")
            .select(
                "i.id",
                "i.nome",
                "i.email",
                "i.celular",
                "i.telefone",
                "i.pago",
                "i.chEsEvento",
                "e.descricao AS evento"
            );

        return inscricoes;
    }

    async create(inscricao: Inscricao) {
        try {
            const inscricaoInserir = {
                nome: inscricao.nome,
                email: inscricao.email,
                celular: inscricao.celular,
                telefone: inscricao.telefone,
                chEsEvento: inscricao.chEsEvento,
                pago: inscricao.pago
            }

            const insertedIds = await knex("inscricoes")
                .insert(inscricaoInserir);

            const inscricaoId = insertedIds[0];

            inscricao.id = inscricaoId;

            return inscricao;
        } catch (error) {
            return { error };
        }
    }

    async update(inscricao: Inscricao) {
        try {
            const inscricaoAtualizar = {
                id: inscricao.id,
                nome: inscricao.nome,
                email: inscricao.email,
                celular: inscricao.celular,
                telefone: inscricao.telefone,
                chEsEvento: inscricao.chEsEvento,
                pago: inscricao.pago
            }

            await knex("inscricoes")
                .update(inscricaoAtualizar)
                .where("id", String(inscricao.id));

            return inscricao;
        } catch (error) {
            return { error };
        }
    }

    async delete(id: Number) {
        try {
            await knex("inscricoes")
                .delete()
                .where("id", id);

            return { mensagem: "Inscrição removida com sucesso." };
        } catch (error) {
            return { error };
        }
    }
}

export default InscricaoModel;