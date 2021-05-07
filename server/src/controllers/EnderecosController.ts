import { Request, Response } from "express";
import knex from "../database/connection";
import Knex from "knex";

class EnderecosController {
    async index(id: Number) {
        const endereco = await knex('enderecos').where('chEsMembro', id).first();

        return (endereco);
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const endereco = await knex("enderecos").where('chEsMembro', id).first();

        if (!endereco) {
            return response.status(400).json({ message: "endereco não existe" });
        }

        return (endereco);
    }

    async create(request: Request, response: Response, chEsMembro: Number, trx: Knex) {
        const {
            cep,
            logradouro,
            numero,
            complemento,
            cidade,
            uf
        } = request.body.endereco

        const endereco = {
            cep,
            logradouro,
            numero,
            complemento,
            cidade,
            uf,
            chEsMembro
        }

        const insertedId = await trx("enderecos").insert(endereco);
        const enderecoId = insertedId[0];

        return ({
            id: enderecoId,
            ...endereco
        })
    }

}

export default EnderecosController;