import Knex from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('order', table => {
        table.increments('id').primary();
        table.string("name").notNullable();
        table.string("contact").notNullable();
        table.string("zipCode").nullable();
        table.string("address").nullable();
        table.string("number").nullable();
        table.string("complement").nullable();
        table.string("city").nullable();
        table.integer("status", 2);
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('order');
}