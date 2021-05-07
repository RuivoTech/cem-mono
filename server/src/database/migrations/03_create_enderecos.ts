import Knex from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('enderecos', table => {
        table.increments('id').primary();
        table.string('cep', 20).nullable();
        table.string('logradouro').nullable();
        table.integer('numero', 5).nullable();
        table.string('complemento', 100).nullable();
        table.string('cidade').nullable();
        table.string('uf').nullable();
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('enderecos');
}