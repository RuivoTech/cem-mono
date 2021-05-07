import Knex from "knex";
import dotenv from "dotenv";

dotenv.config();

interface Contato {
    email: string,
    telefone: string,
    celular: string,
    chEs: number
}

export async function seed(knex: Knex) {
    await knex(`${process.env.BD_LAST_BASE}.contato as c`)
        .join(`${process.env.BD_LAST_BASE}.membros as m`, "m.chEsContato", "c.id")
        .join(`${process.env.BD_BASE}.membros as mt`, "mt.nome", "m.nome")
        .select("c.email", "c.telefone", "c.celular", "mt.id as chEs")
        .then(async (response: Contato[]) => {

            await Promise.all(response.map(async contato => {
                const insertedId = await knex('contatos').insert({
                    email: contato.email,
                    telefone: contato.telefone,
                    celular: contato.celular
                });
                console.log("Contato membro", insertedId[0])
                await knex("membro_contato")
                    .insert({
                        chEsMembro: contato.chEs,
                        chEsContato: insertedId[0]
                    });
            }));

        });
    await knex(`${process.env.BD_LAST_BASE}.visitante AS v`)
        .join(`${process.env.BD_BASE}.visitantes AS vt`, "vt.nome", "v.nome")
        .select("v.email", "v.telefone", "v.celular", "vt.id AS chEs")
        .then(async (response: Contato[]) => {
            await Promise.all(response.map(async contato => {
                const insertedId = await knex("contatos").insert({
                    email: contato.email,
                    telefone: contato.telefone,
                    celular: contato.celular
                });
                console.log("Contato visitante", insertedId[0]);
                await knex("visitante_contato")
                    .insert({
                        chEsVisitante: contato.chEs,
                        chEsContato: insertedId[0]
                    });
            }));
        });
}