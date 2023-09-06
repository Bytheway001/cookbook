import React from "react"
import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap"

export const Order = () => {
    return (
        <Card className='mb-2'>
            <Card.Header className="bg-warning d-flex flex-row justify-content-between align-items-center">
                <p className="mb-0">#12345</p>
                <Button size='sm' variant='info'>Tomar Orden</Button>
            </Card.Header>
            <Card.Body>
                <ListGroup>
                    <ListGroupItem>
                        <strong>Para La Mesa</strong>
                    </ListGroupItem>
                    <ListGroupItem>10 Calabresa</ListGroupItem>
                    <ListGroupItem>10 Calabresa</ListGroupItem>
                    <ListGroupItem>10 Calabresa</ListGroupItem>
                </ListGroup>
            </Card.Body>
        </Card>
    )
}