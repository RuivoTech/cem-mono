import knex from "../database/connection";

interface Quantidade {
    quantidade: number
}

class HomeModel {
    async index() {
        const membros = await knex<Quantidade>("membros").count("id", { as: "quantidade" });

        const visitantes = await knex<Quantidade>("visitantes").count("id", { as: "quantidade" });

        const eventos = await knex<Quantidade>("eventos").count("id", { as: "quantidade" });

        const aniversariantes = await knex("membros")
            .whereRaw("MONTH(dataNascimento) = MONTH(now())")
            .select("id", "nome", "dataNascimento", knex.raw("TIMESTAMPDIFF(YEAR, dataNascimento, NOW()) AS idade"));

        const casados = await knex("membros")
            .whereRaw("MONTH(dataCasamento) = MONTH(now())")
            .orderByRaw("DAY(dataCasamento) ASC")
            .select("id", "nome", "dataCasamento", knex.raw("TIMESTAMPDIFF(YEAR, dataCasamento, NOW()) AS idade"));

        return {
            quantidadeMembros: membros[0].quantidade,
            quantidadeVisitantes: visitantes[0].quantidade,
            quantidadeEventos: eventos[0].quantidade,
            aniversariantes,
            casados
        };
    }
}

export default HomeModel;