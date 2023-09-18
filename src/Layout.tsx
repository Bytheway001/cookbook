import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useMemo, useRef } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const TopBar: React.FC<{ title: string, action: string }> = ({ title, action }) => {
    const navigate = useNavigate();
    return (
        <div className='border-success border p-2 d-flex flex-row align-items-center topbar '>
            <FontAwesomeIcon icon={faArrowCircleLeft} size='lg' onClick={() => navigate(action)} />
            <p className='w-100 mb-0 text-center'>{title}</p>
        </div>
    )
}
export const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
   

    return (
        <Container fluid className='d-flex flex-column bg-dark text-light h-100 p-0 m-0'>
        
            {children}
        </Container>
    )
}