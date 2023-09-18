import React from 'react'
// 🔴🟡🟢


export const ColorCircle:React.FC<{status:string}> = ({status})=>{
    if(status === 'new'){
        return <span>🟡</span> ;
    }
    if(status === 'delivered'){
        return <span>🟢</span> ;
    }
    return(
        <span>🔴</span>
    )
}