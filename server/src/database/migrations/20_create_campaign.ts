import Knex from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('campaign', table => {
        table.increments('id').primary();
        table.string("title").notNullable();
        table.boolean("status").notNullable();
        table.date("date").notNullable();
        table.time("timeStart");
        table.time("timeEnd");
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('campaign');
}