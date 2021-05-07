import Knex from "knex";
import dotenv from "dotenv";

dotenv.config();

interface Ministerio {
    id: number,
    nome: string,
    descricao: string
}

export async function seed(knex: Knex) {
    await knex(`${process.env.BD_LAST_BASE}.ministerios`)
        .then(async (response: Ministerio[]) => {
            await Promise.all(response.map(async ministerio => {

                await knex("ministerios").insert({
                    nome: ministerio.nome,
                    descricao: ministerio.descricao
                });
            }))
        })
}