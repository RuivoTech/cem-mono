import Knex from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('visitante_endereco', table => {
        table.integer('chEsVisitante').notNullable().unsigned().references('id').inTable('visitantes').onDelete("CASCADE");
        table.integer('chEsEndereco').notNullable().unsigned().references('id').inTable('enderecos').onDelete("CASCADE");
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('visitante_endereco');
}