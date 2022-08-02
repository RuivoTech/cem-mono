import knex from "../database/connection";

import { ItemCampaign } from "../interfaces/ItemCampaign";

class ItemCampaignModel {
    async index(id: Number) {
        const items = await knex("store").where("fkCampaign", id);

        return items;
    }

    async create(item: ItemCampaign) {
        try {
            const itemInsert = {
                title: item.title,
                cost: item.cost,
                description: item.description,
                image: item.image,
                fkCampaign: item.fkCampaign
            }

            const insertedId = await knex("store").insert(itemInsert);

            const itemId = insertedId[0];

            item.id = itemId;

            return item;
        } catch (error) {
            return { error };
        }
    }

    async update(item: ItemCampaign) {
        try {
            await knex("store").update(item);

            return item;
        } catch (error) {
            return { error };
        }
    }

    async deleteFromCampaign(id: Number) {
        try {
            const deleted = await knex("store").delete().where("fkCampaign", id);
            console.log(id, deleted);

            return deleted;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

export default ItemCampaignModel;