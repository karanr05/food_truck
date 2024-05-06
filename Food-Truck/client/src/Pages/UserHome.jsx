import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, } from 'react-router-dom';
import { Navbar, Container, Nav, Button, Card, Col } from 'react-bootstrap';
import { GiShoppingCart } from "react-icons/gi";
import { IoMdContact } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import {  toast } from 'react-toastify'
import axios from 'axios'
import './Comenon.css'

function Home() {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const disabled=false;
    const [datavalue, setValueData] = useState([]);
    const [vendorId, setvendorId] = useState();
    const [userId, setuserId] = useState();
    const [submitSuccess, setsubmitSuccess] = useState(false);
    const [vendorProducts, setVendorProducts] = useState([]);
    sessionStorage.setItem('userid', userId);
    cookies.token= localStorage.getItem('utoken');
    console.log(vendorId)
    console.log(cookies.token)
    console.log(vendorProducts)
    useEffect(() => {
        const verifyCookies = async () => {
            if (!cookies.token) {
                navigate('/login');
            };
            console.log(cookies.token)
            const { data } = await axios.post('http://localhost:3000', {},
                { withCredentials: true });
            const { status } = data
            console.log(data)
            setuserId(data.user._id)
            setValueData([data.user])
            console.log(data.vendorProduct)
            setVendorProducts(data.vendorProduct)
            return status ? toast(`hello`, {
                position: 'top-right'
            }) : (removeCookie('token'),
                navigate("/login")
            )
        }
        verifyCookies()
    }, [cookies, navigate, removeCookie])
    const Logout = () => {
        removeCookie('token');
        navigate('/')
    }
    const accountDetails = () => {
        setsubmitSuccess(true)
    }
    console.log(userId)

    return (
        <div>
            <Navbar expand="md" className="bg-body-tertiary navbar-header">
                <Container fluid>
                    <Navbar.Brand href="#home">FOOD TRUCK</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#home">Shops</Nav.Link>
                            <Nav.Link href="#home">About Us</Nav.Link>
                            <Nav.Link href="#home">Contact Us</Nav.Link>
                            <Nav.Link onClick={accountDetails}  >< IoMdContact /></Nav.Link>
                            <Nav.Link href={`/usercard/${userId}/${cookies.token}`} >< GiShoppingCart /></Nav.Link>
                            <Button variant={'success'} onClick={Logout}>Logout</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="datas">
                {submitSuccess && (
                    <div className="profile-container">
                        <div className="profile">
                            {
                                datavalue.map((user) => (<ul >
                                    <li>Name : {user.name}</li>
                                    <li>Email : {user.email}</li>
                                    <li>phone : {user.phone}</li>

                                </ul>))
                            }
                            <Button variant='' onClick={() => setsubmitSuccess(false)} ><IoClose /></Button>
                        </div>
                    </div>)}
            </div>
            <section id='card'>
                {
                    vendorProducts.map((vendor) => (
                        <Col className='' key={vendor._id}>
                            <Card style={{ width: '18rem', height :"30rem", overflow:'scroll' }} className='col-sm-12' >
                                <Card.Img variant="top" src={`http://localhost:3000/images/${vendor.image}`} />
                                <Card.Body>
                                    <Card.Title>Card Title</Card.Title>
                                    <Card.Text>{vendor.shopname}</Card.Text>
                                    <Card.Text>{vendor.shopaddress}</Card.Text>
                                    <Card.Text>{vendor.shopmobilenumber}</Card.Text>
                                    <Button variant="success" onClick={e => navigate(`/ProductFullDetails/${vendor._id}/${cookies.token}`)}>Go somewhere</Button>
                                </Card.Body>
                            </Card>
                           
                        </Col>
                    ))
                }
            </section>
        </div>

    )
}

export default Home