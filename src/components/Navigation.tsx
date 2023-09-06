import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Navigation: React.FC = () => (
    <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand as={Link} to="/">Cookbook</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/ingredients" href="#home">Ingredientes</Nav.Link>
                    <Nav.Link href="#link">Recetas</Nav.Link>
                    <Nav.Link href="#link">Platos</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
)