import Knex from "knex";
import dotenv from "dotenv";

dotenv.config();

interface Endereco {
    cep: number,
    logradouro: string,
    numero: number,
    complemento: string,
    cidade: string,
    uf: string,
    chEs: number
}

export async function seed(knex: Knex) {
    await knex(`${process.env.BD_LAST_BASE}.endereco as e`)
        .join(`${process.env.BD_LAST_BASE}.membros as m`, "m.chEsEndereco", "e.id")
        .join(`${process.env.BD_BASE}.membros as mt`, "mt.nome", "m.nome")
        .select("e.cep", "e.logradouro", "e.complemento", "e.cidade", "e.estado", "mt.id as chEs")
        .then(async (response: Endereco[]) => {

            await Promise.all(response.map(async endereco => {
                const [numero, complemento] = endereco.complemento.split(" ");

                const insertedId = await knex('enderecos').insert({
                    cep: endereco.cep,
                    logradouro: endereco.logradouro,
                    numero: Number(numero.replace(",", "")),
                    complemento,
                    cidade: endereco.cidade,
                    uf: endereco.uf
                });
                console.log("Endereco membro", insertedId[0]);
                await knex("membro_endereco")
                    .insert({
                        chEsMembro: endereco.chEs,
                        chEsEndereco: insertedId[0]
                    });
            }));

        });
    await knex(`${process.env.BD_LAST_BASE}.visitante AS v`)
        .join(`${process.env.BD_BASE}.visitantes AS vt`, "vt.nome", "v.nome")
        .select("v.cep", "v.logradouro", "v.complemento", "vt.id AS chEs")
        .then(async (response: Endereco[]) => {
            await Promise.all(response.map(async endereco => {
                const [numero, complemento] = endereco.complemento.split(" ");

                const insertedId = await knex("enderecos").insert({
                    cep: endereco.cep,
                    logradouro: endereco.logradouro,
                    numero: Number(numero.replace(",", "")),
                    complemento
                });
                console.log("Endereco visitante", insertedId[0]);
                await knex("visitante_endereco").insert({
                    chEsVisitante: endereco.chEs,
                    chEsEndereco: insertedId[0]
                });
            }));
        });
}