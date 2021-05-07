import knex from "../database/connection";

import { Evento } from "../interfaces/EventoInterface";

interface Quantidade {
    quantidade: number
}

interface Params {
    ativo: boolean
}

class EventoModel {
    async index() {
        const eventos = await knex("eventos");

        return eventos;
    }

    async create(evento: Evento) {
        try {
            const eventoInserir = {
                titulo: evento.titulo,
                tipo: evento.tipo,
                status: evento.status,
                repete: evento.repete,
                diaSemana: evento.diaSemana,
                frequencia: evento.frequencia,
                ehPago: evento.ehPago,
                valor: evento.valor,
                dataInicio: evento.dataInicio,
                dataFim: evento.dataFim,
                horaInicio: evento.horaInicio,
                horaFim: evento.horaFim
            }

            const insertedIds = await knex("eventos")
                .insert(eventoInserir);

            const eventoId = insertedIds[0];

            evento.id = eventoId;

            return evento;
        } catch (error) {
            return { error };
        }
    }

    async update(evento: Evento) {
        try {
            const eventoUpdate = {
                id: evento.id,
                titulo: evento.titulo,
                tipo: evento.tipo,
                status: evento.status,
                repete: evento.repete,
                diaSemana: evento.diaSemana,
                frequencia: evento.frequencia,
                ehPago: evento.ehPago,
                valor: evento.valor,
                dataInicio: evento.dataInicio?.split("T")[0],
                dataFim: evento.dataFim?.split("T")[0],
                horaInicio: evento.horaInicio,
                horaFim: evento.horaFim
            }

            await knex("eventos")
                .update(eventoUpdate)
                .where("id", String(evento.id));

            return eventoUpdate;
        } catch (error) {
            return { error };
        }
    }

    async delete(id: Number) {
        try {
            await knex("eventos")
                .delete()
                .where("id", id);

            return { mensagem: "Evento removido com sucesso." };
        } catch (error) {
            return { error };
        }
    }

    async inscricao(params: Params) {
        const eventos = await knex("eventos").select("id", "titulo as descricao").where(params).andWhere("dataInicio", "<>", "null");

        return eventos;
    }
}

export default EventoModel;