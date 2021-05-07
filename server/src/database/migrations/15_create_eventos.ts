import Knex from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('eventos', table => {
        table.increments('id').primary();
        table.boolean('ativo').notNullable().defaultTo(false);
        table.date('dataInicio').notNullable();
        table.date('dataFim').nullable();
        table.string('descricao').nullable();
        table.decimal('valor', 10.2).nullable();
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('eventos');
}