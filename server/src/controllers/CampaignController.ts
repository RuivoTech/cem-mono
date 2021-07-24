import { NextFunction, Request, Response } from "express";

import CampaignModel from "../Model/CampaignModel";
import ItemCampaignModel from "../Model/ItemCampaignModel";

const campaignModel = new CampaignModel();
const itemCampaignModel = new ItemCampaignModel();

class CampaignController {
    async index(request: Request, response: Response) {
        const campaign = await campaignModel.index();

        return response.json(campaign);
    }
    async store(request: Request, response: Response) {
        const campaigns = await campaignModel.store();

        return response.json(campaigns);
    }
    async show(request: Request, response: Response, next: NextFunction) {
        try {
            const { id } = request.params;
            if (!id) {
                next();
                return;
            }

            let campaign = await campaignModel.show(Number(id));
            const items = await itemCampaignModel.index(Number(id));

            campaign.items = items;

            return response.json(campaign);
        } catch (error) {
            return response.json(error);
        }
    }
    async create(request: Request, response: Response) {
        let campaign = request.body;

        const createdCampaign = await campaignModel.create(campaign);

        return response.json(createdCampaign);
    }
    async update(request: Request, response: Response) {
        let campaign = request.body;

        const updatedCampaign = await campaignModel.update(campaign);

        return response.json(updatedCampaign);
    }
}

export default CampaignController;