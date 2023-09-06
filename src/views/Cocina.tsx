import React, { useEffect, useMemo, useState } from "react";
import { Alert, Button, Card, Col, Container, ListGroup, ListGroupItem, Row, Table } from "react-bootstrap";
import { Order } from "./Order";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import SpokenOrder from "../classes/SpokenOrder";
import { apiClient } from "../classes/apiClient";
import { OrderType } from "../types/api";




export const Cocina = () => {
    const [text, setText] = useState("")
    const [connected, setConnected] = useState(false);
    const [view, setView] = useState("orders")
    const [currentOrder, setCurrentOrder] = useState<OrderType>(undefined!)
    const talker = new SpeechSynthesisUtterance();
    talker.pitch = 0;
    talker.lang = 'es-AR'


    const say = (text: string) => {
       
        resetTranscript()
        talker.text = text
        window.speechSynthesis.speak(talker)
        SpeechRecognition.startListening({ language: 'es-BO', continuous: true })

    }
    const speakOrder = (order: any) => {
        
        let s = new SpokenOrder(order)
        say(s.getOrderText() as string)

    }
    useEffect(() => {
        if (connected) {
            resetTranscript()
            setCurrentOrder(undefined!)
            SpeechRecognition.startListening({ language: 'es-BO', continuous: true })
            say("Conectado")
        }

    }, [connected])

    const completeOrder = () => {
        console.log('asds')
        apiClient.orders.complete(currentOrder.id).then(res => {
            say('Orden completada')
            getNextOrder()
        })
    }



    const getNextOrder = () => {
        apiClient.orders.next().then(res => {
            setCurrentOrder(res)
            speakOrder(res)
        })
        .catch(err=>{
            say('No hay órdenes pendientes')
        })
    }

    const repeatCurrentorder = () => {
        if (currentOrder) {
            speakOrder(currentOrder)
        }
        else {
            say('No hay órdenes pendientes, más pilas, pendejos')
        }
    }
    const repeatLastMessage = () => {
        say("Verga que peo contigo chico!..." + text)
    }

    const speakDishes = () => {
        console.log('speking')

        let items: { [key: string]: number } = {}
        apiClient.orders.all().then((orders) => {
            orders.forEach((order: OrderType) => {
                order.order_items.forEach((item) => {
                    if (items[item.product]) {
                        items[item.product] += item.quantity
                    }
                    else {
                        items[item.product] = item.quantity
                    }

                })
            })
            let t = ''
            for (let key in items) {
                t += items[key] + key
                say(items[key] + key)
                setText(t)
            }
        })



    }


    const commands = [
        { command: "próxima orden", callback: () => getNextOrder() },
        { command: "orden actual", callback: () => repeatCurrentorder() },
        { command: 'repite', callback: () => repeatLastMessage() },
        { command: 'pendientes', callback: () => speakDishes() },
        { command: 'sale', callback: () => completeOrder() }

    ]


    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition({ commands });

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }



    return (
        <Container fluid className="px-0">
            <Row>
                <Col sm={12}>
                    <Alert variant='info' className='p-1 px-2 d-flex flex-row justify-content-between align-items-center'>
                        <p className='mb-0'>Escuchando: {listening ? "SI" : "NO"}</p>
                        <p className='mb-0'>{transcript}</p>
                        <Button variant='success' onClick={() => setConnected(true)}>Conectar</Button>
                    </Alert>

                </Col>
                {
                    currentOrder && (
                        <Col sm={12}>
                            <Card>
                                <Card.Header className='bg-primary text-white'>Orden Actual ({`# ${currentOrder.id}`})</Card.Header>
                                <Card.Body>
                                    <Table size='sm'>
                                        <thead>
                                            <th>PRODUCTO</th>
                                            <th>CANTIDAD</th>
                                        </thead>
                                        <tbody>
                                            {currentOrder.order_items.map((item) => (
                                                <tr style={{ fontSize: '1.3em' }}>
                                                    <td>{item.product}</td>
                                                    <td>{item.quantity}</td>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                }

            </Row>
        </Container>

    );

}