import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Badge, InputGroup, ListGroup, ListGroupItem, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { apiClient } from '../classes/apiClient';
import { DishType } from '../types/api';
export const AddProduct: React.FC<{ submitOrder: any }> = ({ submitOrder }) => {
    const [products, setProducts] = useState<{ id: number, qty: number }[]>([]);
    const [dishes, setDishes] = useState<DishType[]>([]);
    const [show, setShow] = useState(false);
    useEffect(() => {
        if (show) {
            apiClient.dishes.all().then((d) => {

                setDishes(d);
            })
        }
    }, [show])

    const addProduct = (id: number, qty: number) => {

        let i = products.findIndex((p) => p.id === id);
        if (i === -1) {
            if (qty > 0) {
                products.push({ id: id, qty: qty })
            }

        }
        else {
            if (products[i].qty + qty >= 0) {
                products[i].qty += qty;
            }
        }
        setProducts([...products])
    }

    const handleSubmitOrder = () => {
        submitOrder(products)
        setProducts([])
        setShow(false)
    }



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>Agregar Productos</Button>

            <Modal className='text-light' centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table size='sm'>
                        <tbody>
                            {
                                dishes.map((dish,key) => (
                                    <Product key={key} dish={dish} addProduct={addProduct} count={products.find(x => x.id === dish.id)?.qty || 0} />
                                ))
                            }
                        </tbody>


                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button size='sm' variant="danger" onClick={handleClose}>Cancelar</Button>
                    <Button size='sm' variant="success" onClick={handleSubmitOrder}>Agregar Productos</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

const Product: React.FC<{ dish: DishType, addProduct: any, count: number }> = ({ dish, addProduct, count }) => {
    return (
        <tr>
            <td>
                <h4 className='mb-0'> <Badge pill className='w-100 mr-2' bg='primary'>{dish.initials}</Badge></h4></td>
            <td className='ps-2'>{dish.name}</td>
            <td className='text-end'>{dish.price}</td>
            <td style={{ textAlign: 'right' }}>
                <InputGroup size='sm' className='justify-content-end' >
                    <Button variant='danger' onClick={() => addProduct(dish.id, -1)}><FontAwesomeIcon icon={faMinus} /> </Button>
                    <InputGroup.Text >{count}</InputGroup.Text>
                    <Button variant='success' onClick={() => addProduct(dish.id, 1)}>  <FontAwesomeIcon icon={faPlus} /> </Button>
                </InputGroup>
            </td>


        </tr>
    )
}