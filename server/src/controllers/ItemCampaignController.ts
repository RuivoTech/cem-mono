import { Request, Response } from "express";

import ItemCampaignModel from "../Model/ItemCampaignModel";

const itemCampaignModel = new ItemCampaignModel();

class ItemCampaignController {
    async index(request: Request, response: Response) {
        const items = await itemCampaignModel.index(parseInt(request.params.id));

        return response.json(items);
    }
    async create(request: Request, response: Response) {
        const image = request.file?.filename;
        let item = request.body;
        item.image = image ? "images/" + image : request.body.image;

        const createdItem = await itemCampaignModel.create(item);

        return response.json(createdItem);
    }
    async update(request: Request, response: Response) {
        const image = request.file?.filename;
        let item = request.body;
        item.image = image ? `images/${image}` : request.body.image;

        const updatedItem = await itemCampaignModel.update(item);

        return response.json(updatedItem);
    }
}

export default ItemCampaignController;