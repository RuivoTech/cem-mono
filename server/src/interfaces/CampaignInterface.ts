import { ItemCampaign } from "./ItemCampaign";

export interface Campaign {
    id?: number,
    title: string,
    status: boolean,
    date: string,
    timeStart: string,
    timeEnd: string,
    items: ItemCampaign[]
}