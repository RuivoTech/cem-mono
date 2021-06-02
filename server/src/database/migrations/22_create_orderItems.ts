import Knex from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('orderItems', table => {
        table.string("title");
        table.integer("quantity");
        table.text("observation");
        table.decimal("cost", 10.2);
        table.boolean("type");
        table.integer("fkOrder").notNullable().unsigned().references('id').inTable("order").onDelete("CASCADE");
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('orderItems');
}