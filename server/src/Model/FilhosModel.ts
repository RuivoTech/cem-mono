import knex from "../database/connection";
import { Filhos } from "../interfaces/FilhosInterface";

class FilhosModel {
    async create(filhos: Filhos[], chEsMembro: Number) {
        try {

            if (!filhos) {
                return;
            }

            await knex("filhos").delete().where("chEsMembro", chEsMembro);

            const filhosInseridos = filhos?.map(async filho => {
                await knex("filhos").insert({
                    chEsMembro,
                    chEsFilho: filho.chEsFilho
                });

                return {
                    chEsMembro,
                    chEsFilho: filho.chEsFilho
                }
            });

            return filhosInseridos;
        } catch (error) {
            return error;
        }
    }
}

export default FilhosModel;