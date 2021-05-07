import Knex from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('pedidoDelivery', table => {
        table.increments('id').primary();
        table.string("nome").notNullable();
        table.string("telefone").notNullable();
        table.integer("chEscardapio").notNullable();
        table.string("imagem");
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('pedidoDelivery');
}