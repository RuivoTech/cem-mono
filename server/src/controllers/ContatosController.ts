import { Request, Response } from "express";
import knex from "../database/connection";
import Knex from "knex";

class ContatosController {
    async index(id: Number) {
        const contato = await knex('contatos').where('chEsMembro', id).first();

        return (contato);
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const contato = await knex("contatos").where('chEsMembro', id).first();

        if (!contato) {
            return response.status(400).json({ message: "Contato não existe" });
        }

        return (contato);
    }

    async create(request: Request, response: Response, chEsMembro: Number, trx: Knex) {
        const {
            email,
            telefone,
            celular
        } = request.body.contato

        const contato = {
            email,
            telefone,
            celular,
            chEsMembro
        }

        const insertedId = await trx("contatos").insert(contato);
        const contatoId = insertedId[0];

        return ({
            id: contatoId,
            ...contato
        })
    }

}

export default ContatosController;