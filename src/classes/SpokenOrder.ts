import { OrderType } from "../types/api"
import { apiClient } from "./apiClient"

const orders = [
    {
        id: 1, products: [
            { name: "Bechamel", quantity: 10 },
            {name:"Pomo doros", quantity: 5},
            {name:"Ramen",quantity:2}
        ]
    }
]
export default class SpokenOrder {

    order: OrderType
    constructor(order:OrderType) {
      this.order = order
    }

  

    getOrderText() {
        let text = `Dictando orden numero ${this.order.id}, `
        if (this.order) {
            text+= this.order.order_items.map((product: any) => {
                return `${product.quantity} ${product.product}`
            }).join(', ')
            text+= " Para llevar"
            return text
        }
        else{
            return null
        }
    }
}