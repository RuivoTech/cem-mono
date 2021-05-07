import Knex from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('inscricoes', table => {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('email').notNullable();
        table.string("celular").nullable();
        table.string("telefone").nullable();
        table.integer("chEsEvento").notNullable().unsigned().references('id').inTable('eventos').onDelete("CASCADE");
        table.boolean("pago").notNullable().defaultTo(false);
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('inscricoes');
}