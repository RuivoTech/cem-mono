import Knex from "knex";
import dotenv from "dotenv";

dotenv.config();

interface MenuPermissao {
    id: number,
    nome: string,
    descricao: string,
    grupo: string
}

export async function seed(knex: Knex) {
    await knex(`${process.env.BD_LAST_BASE}.menuPermissao`)
        .then(async (response: MenuPermissao[]) => {
            await Promise.all(response.map(async menuPermissao => {

                await knex("menuPermissao").insert({
                    nome: menuPermissao.nome,
                    descricao: menuPermissao.descricao,
                    grupo: menuPermissao.grupo
                });
            }))
        })
}