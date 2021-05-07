import Knex from "knex";
import dotenv from "dotenv";

dotenv.config();

interface Evento {
    id: number,
    descricao: string,
    dataInicio: string,
    dataFim: string,
    valor: string,
    ativo: boolean
}

export async function seed(knex: Knex) {
    await knex(`${process.env.BD_LAST_BASE}.eventos`)
        .then(async (response: Evento[]) => {
            await Promise.all(response.map(async evento => {

                await knex("eventos").insert({
                    descricao: evento.descricao,
                    dataInicio: evento.dataInicio,
                    dataFim: evento.dataFim,
                    valor: evento.valor,
                    ativo: evento.ativo
                });
            }))
        })
}