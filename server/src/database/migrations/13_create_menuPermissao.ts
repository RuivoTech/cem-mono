import Knex from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('menuPermissao', table => {
        table.increments('id').primary();
        table.string('nome').notNullable().defaultTo(false);
        table.string('descricao').notNullable();
        table.string('grupo').nullable();
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('menuPermissao');
}