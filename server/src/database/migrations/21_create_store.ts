import Knex from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('store', table => {
        table.increments('id').primary();
        table.string("title").notNullable();
        table.text("description").notNullable();
        table.decimal("cost", 10.2).notNullable();
        table.string("image");
        table.integer("fkCampaign").notNullable().unsigned().references("id").inTable("campaign").onDelete("CASCADE");;
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('store');
}