import React from 'react';
import { Table } from 'react-bootstrap';
import { IngredientForm } from './Form';

export const Ingredients: React.FC = () => {
    return (
        <>
            <IngredientForm />
            <Table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Presentacion</th>
                        <th>Unidad</th>
                        <th>Precio (presentacion)</th>
                        <th>Precio Unitario</th>
                    </tr>
                </thead>
            </Table>
        </>
    )
}