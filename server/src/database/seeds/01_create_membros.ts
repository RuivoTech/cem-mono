import Knex from "knex";
import dotenv from "dotenv";

dotenv.config();

export async function seed(knex: Knex) {
    await knex(`${process.env.BD_LAST_BASE}.membros`)
        .select(
            "nome",
            "rg as identidade",
            "dataNasc as dataNascimento",
            "estadoCivil", "sexo", "profissao", "ativo")
        .then(async response => {
            await knex('membros').insert(response);
        });
    ;
}