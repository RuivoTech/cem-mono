import Knex from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('membro_contato', table => {
        table.integer('chEsMembro').notNullable().unsigned().references('id').inTable('membros').onDelete("CASCADE");
        table.integer('chEsContato').notNullable().unsigned().references('id').inTable('contatos').onDelete("CASCADE");
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('membro_contato');
}