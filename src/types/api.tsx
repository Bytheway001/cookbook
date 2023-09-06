export type OrderType = {
    id:number,
    status:string,
    updated_at:string,
    delivery:boolean
    order_items:OrderItemType[],

}

export type OrderItemType = {
    id:number,
    product:string,
    quantity:number,
}