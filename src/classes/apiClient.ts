import axios from "axios"

const url = 'http://localhost:400'
export const apiClient = {
    orders:{
        all: async ()=>{
            const res = await axios.get(`${url}/orders`)
            return res.data
        },
        next: async ()=>{
            const res = await axios.get(`${url}/orders/next`)
            return res.data
        },
        complete: async(id:number)=>{
            const res = await axios.put(`${url}/orders/${id}`,{status:"completed"})
            return res.data
        }
    }
}