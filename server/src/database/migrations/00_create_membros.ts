import Knex from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('membros', table => {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('identidade', 20).nullable();
        table.date('dataNascimento').nullable();
        table.date('dataCasamento').nullable();
        table.date('dataCadastro').nullable();
        table.integer('estadoCivil', 2).nullable();
        table.integer('sexo', 1).nullable();
        table.string('profissao').nullable();
        table.boolean('ativo').nullable();
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('membros');
}