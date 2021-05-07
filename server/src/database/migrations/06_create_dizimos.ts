import Knex from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('dizimos', table => {
        table.increments('id').primary();
        table.decimal('valor', 10.2).nullable();
        table.date('dataDizimo').nullable();
        table.integer('chEsMembro').notNullable().unsigned().references('id').inTable("membros").onDelete("CASCADE");
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('dizimos');
} 