import Knex from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('contatos', table => {
        table.increments('id').primary();
        table.string('email').nullable();
        table.string('telefone', 20).nullable();
        table.string('celular', 20).nullable();
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('contatos');
}