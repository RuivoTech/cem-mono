import knex from "../database/connection";

import { ItemCampaign } from "../interfaces/ItemCampaign";

class ItemCampaignModel {
    async index(id: Number) {
        const items = await knex("store").where("fkCampaign", id);

        return items;
    }

    async create(item: ItemCampaign) {
        try {
            const insertedId = await knex("store").insert(item);

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
}

export default ItemCampaignModel;