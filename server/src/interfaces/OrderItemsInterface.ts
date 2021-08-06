export interface OrderItems {
    id?: number,
    title: string,
    quantity: number,
    observation: string,
    cost: number,
    type: boolean,
    fkOrder: number
}