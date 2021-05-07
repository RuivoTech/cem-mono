import Knex from "knex";
import dotenv from "dotenv";

dotenv.config();

interface Oferta {
    id: number,
    valorOferta: string,
    dataOferta: string,
}

export async function seed(knex: Knex) {
    await knex(`${process.env.BD_LAST_BASE}.ofertas`)
        .then(async (response: Oferta[]) => {
            await Promise.all(response.map(async oferta => {

                await knex("ofertas").insert({
                    valor: oferta.valorOferta,
                    data: oferta.dataOferta,
                });
            }))
        })
}