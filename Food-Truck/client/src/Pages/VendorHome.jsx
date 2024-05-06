import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { Navbar, Container, Nav, Button,Table } from 'react-bootstrap';
import { GiShoppingCart } from "react-icons/gi";
import { IoMdContact } from "react-icons/io";

function Home() {

    const navigate = useNavigate();
    const [vendorId,setvendorId] = useState()
    const [userName, setUserName] = useState('');
    const [cookies, removeCookie] = useCookies([]);
    const [setvalue, SetValueData] = useState([])
    const [submitSuccess, setsubmitSuccess] = useState(true)
    const [vendorProduct,setVendorProduct]=useState([])
    cookies.token=localStorage.getItem("vtoken")
    sessionStorage.setItem("vendorId",vendorId)
    console.log(vendorId)
    console.log(cookies)
    useEffect(() => {
        const verifyCookies = async () => {
            if (!cookies.token) {
                navigate('/login');
            };
            const { data } = await axios.post('http://localhost:3000/vendordetails', {},
                { withCredentials: true });
            const { status } = data
            console.log(data)
            setvendorId(data.vendor._id)
            setUserName(data.vendor.vendorname)
            SetValueData([data.vendor])
            setVendorProduct(data.vendorProduct)
            return status ? toast(``, {
                position: 'top-right'
            }) : (removeCookie('token'), navigate('/login'))
        }
        verifyCookies()
    }, [cookies, navigate, removeCookie])
    const Logout = () => {
        removeCookie('token');
        navigate('/')
    }
    const handleUpdate=(id)=>{
        navigate('/vendorproductupdate',sessionStorage.setItem("vpid",id)) 
    }
    const handleDelete = (id) =>{
        axios.delete("http://localhost:3000/vendorproductdelete/" + id).then((user)=>{
            window.location.reload()
        }).catch(err =>{
            console.log(err)
        })
    }
    const profileDetails = () => {
        setsubmitSuccess(true)
    }
    return (
        <>
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
                            <Nav.Link onClick={profileDetails} ><IoMdContact /> </Nav.Link>
                            <Nav.Link href="#home"> <GiShoppingCart /> </Nav.Link>

                            <Button  variant="success" onClick={Logout}>logout</Button>
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div>

                <p  >wellcome<p className='text-light'>{userName}</p></p>
               

                {submitSuccess && (
                    <div className="popup-container">
                        <div className="popup">
                            {
                                setvalue.map((user) => (
                                    <ul>
                                        <li>
                                            {user.name}</li>
                                        <li>{
                                            user.email
                                        }</li>
                                        <li>
                                            {
                                                user.role
                                            }
                                        </li>
                                    </ul>
                                ))
                            }
                            <button onClick={() => setsubmitSuccess(false)}>Close</button>
                        </div>
                    </div>)}

            </div>
            {/* vendor products start*/}
            <div className="vendor-product">
            <Table striped bordered className=' table responsive '>
        <thead>
          <tr className='border border-1'>
          <th>Image</th>
            <th>Shopname</th>
            <th>Email</th>
            <th>Shop Number</th>
            <th>ShopAddress</th>
            <th>StartTime</th>
            <th>EndTime</th>
            <th>Price</th>
            
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            vendorProduct.map((user) => {
              return (
                <tr    key={user._id}>
                    <td><img src={`http://localhost:3000/images/${user.image}` }/></td>
                  <td>{user. shopname}</td>
                  <td>{user.email}</td>
                  <td>{user.shopmobilenumber}</td>
                  <td>{user.shopaddress}</td>
                  <td>{user.starttime}</td>
                  <td>{user.endtime}</td>
                  <td>{user.price}</td>
                  <td><Button className='' variant="primary" onClick={e=>handleUpdate(user._id)}>Update</Button></td>
                  <td><Button variant="primary" onClick={e=>handleDelete(user._id)}>Delete</Button></td>
                </tr>

              )
            })}
        </tbody>
            { <Button onClick={e=>{navigate('/vendorproductregister')}}>product register</Button> }

      </Table>
            </div>








        {/* vendor products end*/}
        </>

    )
}

export default Home