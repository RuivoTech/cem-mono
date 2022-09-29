import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.table('familia', table => {
    table.string('nomeConjuge').nullable();
    table.string("nomePai").nullable();
    table.string("nomeMae").nullable();
  })
}

export async function down(knex: Knex) {
  return knex.schema.table('familia', table => {
    table.dropColumn("nomeConjuge");
    table.dropColumn("nomePai");
    table.dropColumn("nomeMae");
  });
}