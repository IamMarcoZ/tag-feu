import React, { useState } from 'react';
import ConditionalNavLink from './ConditionalNavLink';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const CustomNavbar = () => {
    
    return (
        <div className='row'>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">FEU</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link className='ml-5 mr-5' href="#main">Home</Nav.Link>
                        <Nav.Link className='ml-5 mr-5' href="#table">Gestione Tag giornalieri</Nav.Link>
                        <Nav.Link className='ml-5 mr-5' href="#tableForEmail">Pricing</Nav.Link>
                        <Nav.Link className='ml-5 mr-5' href="#defectsWip">Defects</Nav.Link>
                        <Nav.Link className='ml-5 mr-5' href="#issues">Issues</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
};

export default CustomNavbar;
