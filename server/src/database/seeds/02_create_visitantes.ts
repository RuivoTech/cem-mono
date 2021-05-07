import Knex from "knex";
import dotenv from "dotenv";

dotenv.config();

export async function seed(knex: Knex) {
    await knex(`${process.env.BD_LAST_BASE}.visitante`)
        .select("nome", "dataVisita", "religiao", "visita AS querVisita")
        .then(async response => {
            await knex('visitantes').insert(response);
        });
    ;
}