import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
    return (
        <div className='h-100 d-flex flex-column justify-content-center px-2'>
            <h1 className="text-center">Elije una funcion</h1>
            <Link to='/kitchen' className='w-100'>
                <Button size='lg' className='w-100 mb-2'>Cocina</Button>
            </Link>
            <Link to='/waiter' className='w-100'>

                <Button size='lg' className='w-100 mb-2'>Mesa</Button>
            </Link>
            <Link to='/report' className='w-100'>
                <Button size='lg' className='w-100 mb-2'>Resumen</Button>
            </Link>
            <Button size='lg' className='w-100 mb-2'>Inventario</Button>
        </div>
    )
}