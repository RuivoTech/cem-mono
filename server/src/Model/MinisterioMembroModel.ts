import knex from "../database/connection";

import { MinisterioMembro } from "../interfaces/MinisterioMembroInterface";
import MinisterioModel from "./MinisterioModel";

interface Quantidade {
    quantidade: number
}

class MinisterioMembroModel {
    async findMembro(id: Number) {
        const ministerios = await knex("ministerioMembro")
            .where("chEsMembro", id)

        return ministerios;
    }

    async create(ministerios: MinisterioMembro[], chEsMembro: Number) {
        try {
            const ministeriosInserir = ministerios.map(async ministerio => {
                return (
                    await knex("ministerioMembro")
                        .insert({
                            chEsMembro,
                            chEsMinisterio: ministerio.chEsMinisterio,
                            checked: ministerio.checked
                        })
                )
            });

            return ministeriosInserir;
        } catch (error) {
            return error;
        }
    }

    async update(ministerios: MinisterioMembro[], chEsMembro: Number) {
        try {
            console.log(ministerios);
            await knex("ministerioMembro")
                .delete()
                .where("chEsMembro", chEsMembro);

            const ministeriosAtualizados = ministerios.map(async ministerio => {
                return (
                    await knex("ministerioMembro")
                        .insert({
                            chEsMembro,
                            chEsMinisterio: ministerio.chEsMinisterio,
                            checked: ministerio.checked
                        })
                )
            });

            return ministeriosAtualizados;
        } catch (error) {
            return error;
        }
    }

    async deleteMembro(chEsMembro: Number) {
        try {
            await knex("ministerioMembro")
                .delete()
                .where("chEsMembro", chEsMembro);

            return "OK";
        } catch (error) {
            return error;
        }
    }
}

export default MinisterioMembroModel;