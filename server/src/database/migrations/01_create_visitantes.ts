import Knex from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('visitantes', table => {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.date('dataVisita').nullable();
        table.date('dataCadastro').nullable();
        table.string('religiao').nullable();
        table.boolean('querVisita').nullable();
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('visitantes');
}