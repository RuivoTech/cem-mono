import Knex from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('ministerioMembro', table => {
        table.integer('chEsMembro').notNullable().unsigned().references('id').inTable('membros').onDelete("CASCADE");
        table.integer('chEsMinisterio').notNullable().unsigned().references('id').inTable('ministerios').onDelete("CASCADE");
        table.boolean("checked").notNullable().defaultTo(false);
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('ministerioMembro');
}