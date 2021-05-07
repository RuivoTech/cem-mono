import Knex from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('cardapio', table => {
        table.increments('id').primary();
        table.string("nome").notNullable();
        table.text("descricao").notNullable();
        table.decimal("preco", 10.2).notNullable();
        table.string("imagem");
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('cardapio');
}