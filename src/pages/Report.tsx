import React, { useEffect, useState } from 'react';
import react from 'react';
import { Table } from 'react-bootstrap';
import { apiClient } from '../classes/apiClient';
import { TopBar } from '../Layout';
import { ReportType } from '../types/api';


export const Report: React.FC = () => {
    const [data, setData] = useState<ReportType[]>([])
    useEffect(() => {
        apiClient.reports.daily().then(res => {
            setData(res)
        })
    },[])
    return (
        <>
            <TopBar title="Reporte del Dia" action="/" />
            <div className='d-flex flex-column content'>
                <Table variant='bordered'>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Cant.</th>
                            <th>Subt.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(t=>(
                                <tr>
                                    <td>{t.name}</td>
                                    <td>{t.quantity}</td>
                                    <td>{t.total}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                    <tfoot>
                        <tr >
                            <th className='text-success'  colSpan={2}>Total</th>
                         
                            <th className='text-success'>{data.reduce((a,b)=>a+b.total,0)}</th>
                        </tr>
                    </tfoot>

                </Table>
            </div>
        </>
    )

}