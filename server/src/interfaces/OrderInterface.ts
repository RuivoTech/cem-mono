import { OrderItems } from "./OrderItemsInterface";

export interface Order {
    id?: number,
    name: string,
    contact: string,
    zipCode: string,
    address: string,
    number: number,
    complement: string,
    city: string,
    type: boolean,
    status: number,
    date: string,
    fkCampaign: number,
    items: [OrderItems]
}