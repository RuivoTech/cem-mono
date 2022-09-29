import knex from "../database/connection";

import FilhosModel from "./FilhosModel";

import { Parentes } from "../interfaces/ParentesInterface";
import { Familia } from "../interfaces/FamiliaInterface";
import { Filhos } from "../interfaces/FilhosInterface";

const filhosModel = new FilhosModel();

class FamiliaModel {
    async create(parentes: Parentes, chEsMembro: Number) {
        try {
            const familiaInserir = {
                chEsMembro,
                chEsConjuge: parentes?.chEsConjuge,
                chEsPai: parentes?.chEsPai,
                chEsMae: parentes?.chEsMae,
                nomeConjuge: parentes.nomeConjuge,
                noemPai: parentes.nomePai,
                nomeMae: parentes.nomeMae
            }

            await knex("familia").delete().where("chEsMembro", chEsMembro);

            await knex("familia").insert(familiaInserir);

            const filhos = await filhosModel.create(parentes.filhos, chEsMembro);

            return {
                ...familiaInserir,
                filhos
            }
        } catch (error) {
            console.log("create", error);

            return error;
        }

    }

    async update(parentes: Parentes, chEsMembro: Number) {
        try {
            const familiaAtualizar = {
                chEsConjuge: parentes?.chEsConjuge,
                chEsPai: parentes?.chEsPai,
                chEsMae: parentes?.chEsMae,
                nomeConjuge: parentes.nomeConjuge,
                noemPai: parentes.nomePai,
                nomeMae: parentes.nomeMae
            }

            await knex("familia")
                .where("chEsMembro", chEsMembro)
                .update(familiaAtualizar)

            const filhos = await filhosModel.create(parentes.filhos, chEsMembro);

            return {
                ...familiaAtualizar,
                filhos
            }
        } catch (error) {
            console.log("update", error);

            return error;
        }
    }

    async findMembro(id: Number) {
        const familia = await knex<Familia>("familia")
            .where("familia.chEsMembro", "=", id.toString())
            .first();

        const filhos: Filhos[] = await knex<Filhos[]>("filhos AS f")
            .where("f.chEsMembro", String(id))
            .join("membros AS m", "m.id", "f.chEsFilho")
            .join("membro_contato AS mc", "mc.chEsMembro", "f.chEsFilho")
            .join("contatos AS c", "c.id", "mc.chEsContato")
            .select("f.*", "m.nome", "c.email", "c.telefone", "c.celular");

        return { ...familia, filhos };
    }

    async removeMembro(chEsMembro: Number) {
        try {
            await knex("familia")
                .where({ chEsMembro })
                .delete();

            await knex("filhos")
                .where({ chEsMembro })
                .delete();

            return "OK";
        } catch (error) {
            return error;
        }

    }
}

export default FamiliaModel;