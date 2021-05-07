import Knex from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('usuarios', table => {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('email').notNullable();
        table.string('nivel').notNullable();
        table.string('senha').notNullable();
        table.string('salt').notNullable();
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('usuarios');
}