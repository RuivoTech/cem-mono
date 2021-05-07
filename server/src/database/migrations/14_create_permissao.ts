import Knex from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('permissao', table => {
        table.integer('chEsUsuario').notNullable().unsigned().references('id').inTable('usuarios').onDelete("CASCADE");
        table.integer('chEsMenuPermissao').notNullable().unsigned().references('id').inTable('menuPermissao').onDelete("CASCADE");
        table.boolean('inserir').nullable();
        table.boolean('alterar').nullable();
        table.boolean('visualizar').nullable();
        table.boolean("remover").nullable();
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('permissao');
}