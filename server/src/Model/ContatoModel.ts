import knex from "../database/connection";

import { Contato } from "../interfaces/ContatoInterface";
import e from "express";

class ContatoModel {
    async findMembro(id: Number) {
        const contato = await knex("contatos as c")
            .join("membro_contato as mc", "mc.chEsContato", "c.id")
            .where("mc.chEsMembro", id)
            .select("c.*")
            .first();

        return contato;
    }

    async create(contato: Contato) {
        try {
            const contatoIserir = {
                email: contato.email,
                telefone: contato.telefone,
                celular: contato.celular
            }

            const insertedId = await knex("contatos").insert(contatoIserir);
            const contatoId = insertedId[0];

            return {
                id: contatoId,
                ...contatoIserir
            }
        } catch (error) {
            return error;
        }

    }

    async update(contato: Contato) {
        try {
            const contatoAtualizar = {
                id: contato.id,
                email: contato.email,
                telefone: contato.telefone,
                celular: contato.celular
            }

            await knex("contatos")
                .where("id", contato.id)
                .update(contatoAtualizar);

            return contatoAtualizar;
        } catch (error) {
            console.log(error);

            return error;
        }
    }

    async removeMembro(chEsMembro: Number) {
        try {
            await knex("contatos AS c")
                .join("membro_contato AS mc", "mc.chEsContato", "c.id")
                .where("mc.chEsMembro", chEsMembro)
                .delete();

            return "OK";
        } catch (error) {
            return error;
        }

    }

    async findVisitante(id: Number) {
        const contato = await knex("contatos as c")
            .join("visitante_contato as mc", "mc.chEsContato", "c.id")
            .where("mc.chEsVisitante", id)
            .select("c.*")
            .first();

        return contato;
    }

    async removeVisitante(chEsVisitante: Number) {
        try {
            await knex("contatos AS c")
                .join("visitante_contato AS mc", "mc.chEsContato", "c.id")
                .where("mc.chEsVisitante", chEsVisitante)
                .delete();

            return "OK";
        } catch (error) {
            return error
        }

    }
}

export default ContatoModel;