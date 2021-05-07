import Knex from "knex";
import dotenv from "dotenv";

dotenv.config();

interface Igreja {
    ehBatizado: boolean,
    dataBatismo: string,
    igrejaBatizado: string,
    ultimoPastor: string,
    ultimaIgreja: string,
    chEsMembro: number
}

export async function seed(knex: Knex) {
    await knex(`${process.env.BD_LAST_BASE}.dadosIgreja as di`)
        .join(`${process.env.BD_LAST_BASE}.membros as m`, "m.chEsIgreja", "di.id")
        .join(`${process.env.BD_BASE}.membros as mt`, "mt.nome", "m.nome")
        .select(
            "di.isBatizado as ehBatizado",
            "di.dataBatismo",
            "di.igrejaBatizado",
            "di.ultimoPastor",
            "di.ultimaIgreja",
            "mt.id as chEsMembro"
        )
        .then(async (response: Igreja[]) => {
            await Promise.all(response.map(async igreja => {
                await knex('igreja').insert({
                    ehBatizado: igreja.ehBatizado,
                    dataBatismo: igreja.dataBatismo,
                    igrejaBatizado: igreja.igrejaBatizado,
                    ultimoPastor: igreja.ultimoPastor,
                    ultimaIgreja: igreja.ultimaIgreja,
                    chEsMembro: igreja.chEsMembro
                });
            }));

        });
    ;
}