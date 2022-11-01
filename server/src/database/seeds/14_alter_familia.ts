import Knex from "knex";

export const seed = async (knex: Knex) => {
  return knex("membros")
    .join("familia as conjuge", "membros.id", "=", "conjuge.chEsConjuge")
    .select("membros.id as chEsConjuge", "membros.nome as nomeConjuge")
    .then(async (response) => {
      await Promise.all(response.map(async (conjuge: any) => {
        console.log(conjuge);
        await knex("familia")
          .where("chEsConjuge", "=", conjuge.chEsConjuge)
          .update({
            "nomeConjuge": conjuge.nomeConjuge
          })
          .then(async () => {
            await knex("membros")
              .join("familia as pai", "membros.id", "=", "pai.chEsPai")
              .select("membros.id as chEsPai", "membros.nome as nomePai")
              .then(async (response) => {
                await Promise.all(response.map(async (pai: any) => {
                  console.log(pai);
                  await knex("familia")
                    .where("chEsPai", "=", pai.chEsPai)
                    .update({
                      "nomePai": pai.nomePai
                    })
                    .then(async () => {
                      await knex("membros")
                        .join("familia as mae", "membros.id", "=", "mae.chEsMae")
                        .select("membros.id as chEsMae", "membros.nome as nomeMae")
                        .then(async (response) => {
                          await Promise.all(response.map(async (mae: any) => {
                            console.log(mae);
                            await knex("familia")
                              .where("chEsMae", "=", mae.chEsMae)
                              .update({
                                "nomeMae": mae.nomeMae
                              })
                          }))
                        })
                    })
                }))
              })
          })
      }))

    })
}