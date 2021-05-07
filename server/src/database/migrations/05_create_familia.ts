import Knex from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('familia', table => {
        table.integer('chEsMembro').notNullable().unsigned().references("id").inTable("membros").onDelete("CASCADE");
        table.integer('chEsConjuge').nullable().unsigned();
        table.integer('chEsPai').nullable();
        table.integer('chEsMae').nullable();
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('familia');
}