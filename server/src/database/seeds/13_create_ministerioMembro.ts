import Knex from "knex";
import dotenv from "dotenv";

dotenv.config();

interface MinisterioMembro {
    id: number,
    chEsMembro: number,
    chEsMinisterio: number,
    checked: boolean
}

export async function seed(knex: Knex) {
    await knex(`${process.env.BD_LAST_BASE}.ministerioMembro AS nmn`)
        .join(`${process.env.BD_LAST_BASE}.membros AS nm`, "nm.id", "nmn.chEsMembro")
        .join(`${process.env.BD_BASE}.membros AS tm`, "tm.nome", "nm.nome")
        .join(`${process.env.BD_LAST_BASE}.ministerios AS min`, "nmn.chEsMinisterio", "min.id")
        .join(`${process.env.BD_BASE}.ministerios AS tmin`, "tmin.nome", "min.nome")
        .select("tm.id AS chEsMembro", "tmin.id AS chEsMinisterio", "nmn.checked")
        .then(async (response: MinisterioMembro[]) => {
            await Promise.all(response.map(async ministerio => {

                await knex("ministerioMembro").insert({
                    chEsMembro: ministerio.chEsMembro,
                    chEsMinisterio: ministerio.chEsMinisterio,
                    checked: ministerio.checked
                });
            }))
        })
}