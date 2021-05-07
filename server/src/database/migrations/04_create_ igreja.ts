import Knex from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('igreja', table => {
        table.increments('id').primary();
        table.boolean('ehBatizado').nullable();
        table.date('dataBatismo').nullable();
        table.string('igrejaBatizado').nullable();
        table.string('ultimoPastor').nullable();
        table.string('ultimaIgreja').nullable();
        table.integer('chEsMembro').notNullable().unsigned().references("id").inTable("membros").onDelete("CASCADE");
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('igreja');
}