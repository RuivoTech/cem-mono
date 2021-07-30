import knex from "../database/connection";

import ItemCampaignModel from "../Model/ItemCampaignModel";
import { Campaign } from "../interfaces/CampaignInterface";

const itemCampaignModel = new ItemCampaignModel();

class CampaignModel {
    async index() {
        const campaigns = await knex<Campaign>("campaign");

        const camapignsFiltered = await Promise.all(campaigns.map(async (campaign) => {
            const items = await itemCampaignModel.index(Number(campaign.id));

            return (
                {
                    ...campaign,
                    items
                }
            )
        }));

        return camapignsFiltered;
    }

    async showActive() {
        const campaign = await knex<Campaign>("campaign").where("status", "=", true).first();

        return campaign;
    }

    async store() {
        const campaign = await knex<Campaign>("campaign").where("status", true).first();

        if (!campaign) {
            return { message: "Campanha não existe" };
        }

        campaign.items = await itemCampaignModel.index(Number(campaign?.id));

        return campaign;
    }

    async show(id: Number) {
        const campaign = await knex("campaign").where("id", id).first();

        return campaign;
    }

    async create(campaign: Campaign) {
        try {
            const insertedId = await knex("campaign").insert(campaign);

            const campaignId = insertedId[0];

            campaign.id = campaignId;

            return campaign;
        } catch (error) {
            return { error };
        }
    }

    async update(campaign: Campaign) {
        try {
            await knex("store").update(campaign);

            return campaign;
        } catch (error) {
            return { error };
        }
    }
}

export default CampaignModel;