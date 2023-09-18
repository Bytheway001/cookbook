import axios from "axios"

const url = 'http://192.168.0.11:400'
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
        pending: async ()=>{
            const res = await axios.get(`${url}/orders/pending`)
            return res.data
        },
        complete: async(id:number)=>{
            const res = await axios.put(`${url}/orders/${id}`,{status:"completed"})
            return res.data
        },
        getByTable: async(table:number)=>{
            const res = await axios.get(`${url}/orders/table/${table}`)
            return res.data
        },
  
    },
    dishes:{
        all: async ()=>{
            const res = await axios.get(`${url}/dishes`)
            return res.data
        }
    },
    tables:{
        all: async ()=>{
            const res = await axios.get(`${url}/tables`)
            return res.data
        },
        get: async(id:number)=>{
            const res = await axios.get(`${url}/tables/${id}`)
            return res.data
        },
        addProducts: async(table_id:string,data:any)=>{
            const res = await axios.post(`${url}/tables/${table_id}/products`,{products:data})
            return res.data
        },
        close: async(table_id:string)=>{
            const res = await axios.put(`${url}/tables/${table_id}/close`)
            return res.data
        }
    },
    reports:{
        daily: async()=>{
            const res = await axios.get(`${url}/orders/report`)
            return res.data
        }
    }
}