import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, ButtonGroup, Col, Container, ListGroup, ListGroupItem, Row, Table } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { apiClient } from '../classes/apiClient';
import { ColorCircle } from '../components/ColorCircle';
import { TopBar } from '../Layout';
import { TableType } from '../types/api';
import { AddProduct } from './AddProduct';

export const TableDetail: React.FC = () => {
    const [detail, setDetail] = useState<TableType>({} as TableType);

    const refreshTable = useCallback(() => {
        apiClient.tables.get(parseInt(params.id!) as number).then((d) => {
            setDetail(d);
        })
    }, [])
    const params = useParams();
    useEffect(() => {
        refreshTable()
    }, [])

    const submitOrder = (data: any) => {

        apiClient.tables.addProducts(params.id!, data).then(res => {
            refreshTable()
        })
    }

    const closeTable = () => {
        if (window.confirm('¿Está seguro que desea cerrar la mesa?')) {
            apiClient.tables.close(params.id!).then(res => {
                refreshTable()
            })
        }
    }


    return (
        <>
            <TopBar title={`Mesa #${params.id}`} action="/waiter" />
            <div className='d-flex flex-column content'>
                <Row className='mt-5'>
                    <h2 className="text-center">Orden Actual</h2>
                </Row>
                {
                    detail?.active_orders && detail.active_orders.length >0 ?
                        <>
                            <Table size='sm' className='text-light'>
                                <thead>
                                    <tr>
                                    <th>⚪️</th>
                                        <th>Cant.</th>
                                        <th>Desc</th>
                                        <th className='text-end'>Subt</th>
                                  
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        detail.active_orders.map(order=>{
                                            return order.order_items.map((x,i)=>(
                                                <tr key={i}>
                                                      <td><ColorCircle status={order.status}/></td>
                                                    <td>{x.quantity}</td>
                                                    <td>{x.dish}</td>
                                                    <td className='text-end'>{x.quantity * x.price}</td>
                                                  
                                                </tr>
                                            ))
                                        })
                                    }
                            
                               

                                </tbody>
                                <tfoot>
                                  
                                        <tr>
                                        <th colSpan={3} >TOTAL:</th>
                                        <th className='text-end'>
                                            {detail.active_orders?.flatMap(x=>x.order_items).reduce((acc, item) => acc + (item.price*item.quantity), 0)}
                                        </th>
                                    </tr>  
                                </tfoot>
                            </Table>


                        </>
                        : <p className='text-center'>La mesa no posee orden activa</p>

                }
                <Row>
                    <Col>
                        <ButtonGroup size='sm' className='w-100'>
                            <AddProduct submitOrder={submitOrder} />
                            {detail.active_orders && detail.active_orders.length>0 && <Button variant='danger' onClick={closeTable}>Cerrar mesa</Button>} 
                        </ButtonGroup>
                    </Col>
                </Row>
            </div>
        </ >
    )
}