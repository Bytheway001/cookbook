export type OrderType = {
    id:number,
    table_id:number,
    status:string,
    updated_at:string,
    delivery:boolean
    order_items:OrderItemType[],

}

export type OrderItemType = {
    id:number,
    price:number,
    dish:string,
    quantity:number,
    initials:string
}

export type DishType = {
    id:number,
    name:string,
    price:number,
    initials:string
}
export type ReportType = {
    name:string,
    quantity:number,
    total:number
}

export type TableIndexType={
    id:number,
    available:boolean,
    debt:number
}
export type TableType = {
    id:number,
    status:string,
    active_orders?:OrderType[]
}