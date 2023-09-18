import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { apiClient } from '../classes/apiClient';
import { TopBar } from '../Layout';
import { TableIndexType } from '../types/api';

export const Waiter: React.FC = () => {
    const [tables, setTables] = useState<any[]>([])
    useEffect(() => {
        apiClient.tables.all().then(res => {
            console.log(res)
            setTables(res)
        })
    }, [])

    return (
        <>
            <TopBar title="Seleccionar mesa" action="/" />
            <div className='d-flex flex-column justify-content-center content'>
                <Row className='g-0'>
                    {
                        tables.map((table) => (
                            <Table table={table} />
                        ))
                    }

                </Row>
            </div>
        </>
    )
}

const Table: React.FC<{ table: TableIndexType }> = ({ table }) => {
    return (
        <Col xs={6} className='mb-3 p-3' >
            <Link to={`/table/${table.id}`}>
                <Button variant={table.available ? 'success' : 'danger'} style={{ height: 180 }} className='w-100 align-items-center justify-content-center'>
                    <h1 className='mb-0'>{table.id}</h1>
                    <p className='mb-0'>Consumo: Bs {table.debt}</p>
                </Button>
            </Link>
        </Col>
    )
}