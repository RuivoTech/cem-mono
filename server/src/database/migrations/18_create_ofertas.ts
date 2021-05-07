import Knex from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('ofertas', table => {
        table.increments('id').primary();
        table.string('valor').notNullable();
        table.date('data').notNullable();
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('ofertas');
}