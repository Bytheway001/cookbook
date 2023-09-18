import React, { useCallback, useEffect, useState } from 'react';
import { Badge, Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
import { apiClient } from '../classes/apiClient';
import { TopBar } from '../Layout';
import { OrderItemType, OrderType } from '../types/api';
import { parseMessage } from '../websockets/messages';
import { useWS } from '../websockets/Provider';

const OrderSquare: React.FC<{ item: OrderItemType, table_id: number }> = ({ item, table_id }) => (
    <div className="border border-danger mb-2 mx-2 d-flex flex-column align-items-center justify-content-center" style={{ width: 100, height: 100, position: 'relative' }}>

        <p style={{ fontSize: '2em' }} className='mb-0'><strong>{item.quantity}</strong></p>
        <p style={{ fontSize: '2em' }} className='mb-0'><strong>{item.initials}</strong></p>

    </div>
)
export const Cocina: React.FC = () => {
    const [connected, setConnected] = useState(false)
    const { lastMessage, subscribe, playSound, connectionStatus } = useWS();
    const [currentOrder, setCurrentOrder] = useState<OrderType>(null!)
    const [pendingOrders, setPendingOrders] = useState<OrderType[]>([])
    const completeOrder = () => {
        apiClient.orders.complete(currentOrder.id).then(res => {

            setCurrentOrder(res)
            apiClient.orders.pending().then(res => {
                setPendingOrders(res)
            })
        })

    }

    useEffect(() => {
        console.log("Subscribing")
        subscribe()
    }, [subscribe])

    useEffect(() => {
        let m = parseMessage(lastMessage)
        if (m) {
            if (m.command == 'New Order') {
                playSound();
                refresh()
            }
        }

    }, [lastMessage])

    const handleOrderClick = (order: OrderType) => {
        if (currentOrder && currentOrder.id === order.id) {
            setCurrentOrder(null!)
        }
        else {
            setCurrentOrder(order)
        }

    }

    const refresh = useCallback(() => {
        apiClient.orders.pending().then(res => {
            setPendingOrders(res)
        })
    }, [])


    useEffect(() => {
        refresh()
    }, [refresh])
    if (connected) {
        return (
            <>
                <TopBar title="Comanda" action="/" />

                <Container className='mt-4'>
                    <Row>
                        <Col xs={12} className='mt-4'>
                            {
                                pendingOrders.map((order, i) => (
                                    <Card key={i} className={`mb-4 ${currentOrder?.id === order.id ? 'border border-success' : 'border border-primary'} `}>
                                        <Card.Header onClick={() => handleOrderClick(order)} className={`${currentOrder?.id === order.id ? 'bg-success' : 'bg-primary'} text-white d-flex justify-content-between`}>
                                            #{order.id}
                                            {order.delivery ?
                                                <Badge bg='warning' className='blink d-flex align-items-center'>PARA LLEVAR </Badge> : <Badge bg="secondary d-flex align-items-center"> MESA</Badge>}
                                        </Card.Header>
                                        <Card.Body onClick={() => handleOrderClick(order)} >
                                            <Row>
                                                <Col sm={9} className='d-flex flex-row'>{order.order_items.map((item) => (<OrderSquare item={item} table_id={order.table_id} />))}</Col>
                                            </Row>
                                        </Card.Body>
                                        {
                                            currentOrder?.id === order.id && (
                                                <Card.Footer>
                                                    <Button className="w-100" onClick={()=>completeOrder()}>SALE</Button>
                                                </Card.Footer>

                                            )
                                        }
                                    </Card>
                                ))
                            }
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
    else {
        return (
            <div className='d-flex flex-column align-items-center justify-content-center h-100'>
                <Button onClick={() => setConnected(true)} size='lg' variant='success'>CONECTAR</Button>
            </div>

        )
    }

}