import Knex from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('ministerios', table => {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.text('descricao').notNullable();
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('ministerios');
}