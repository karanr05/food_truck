import React from 'react'
import {Navbar,Container,Nav,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GiShoppingCart } from "react-icons/gi";
import { IoMdContact } from "react-icons/io";
import {useNavigate} from 'react-router-dom'
import './Navbar.css'
function Navbars() {
    const navigate=useNavigate()
    return (
        <Navbar expand="md" className="bg-body-tertiary navbar-header">
            <Container fluid>
                <Navbar.Brand href="#home">FOOD TRUCK </Navbar.Brand> 
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#home">Shops</Nav.Link>
                        <Nav.Link href="#home">About Us</Nav.Link>
                        <Nav.Link href="#home">Contact Us</Nav.Link>
                        <Button variant={'success'} onClick={e=>navigate('/login')}>Login</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navbars


