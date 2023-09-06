import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

export const IngredientForm: React.FC = () => {
    const [show, setShow] = useState(false)

    const handleShow = () => {
       setShow(true)
    }

    const handleClose = () => {
       setShow(false)
    }
    return (
        <>
            <Button size='sm' variant="primary" onClick={handleShow}>Nuevo</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo Ingrediente</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}