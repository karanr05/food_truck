import { Container, Form, Row, Col, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState,useEffect } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";


function AdminProductUpdate() {
    const { register, setError, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const [submitSuccess, setsubmitSuccess] = useState(false)
    const id= sessionStorage.getItem('adminpid')
    const [userData, setUserData] = useState({  shopname: "", email: '', shopmobilenumber: '', shopaddress: "", starttime: "",endtime:"",  file: "", role: 'VendorProduct' })
    const navigate = useNavigate()
    useEffect(() => {
        axios.get('http://localhost:3000/getproductdetails/' + id).then(user => {
            console.log(user)
            setUserData({shopname:user.data.
                pdls.shopname,
                email: user.data.pdls.email,
                shopmobilenumber: user.data.pdls.shopmobilenumber,
                shopaddress: user.data.pdls.shopaddress,
                starttime: user.data.pdls.starttime,
                endtime: user.data.pdls.endtime,
               
                
            })
        }).catch(err => {
           console.log(err)
       })
    }, [])
  
    
    const onSubmit = async (e) => {
        console.log(id)
        console.log(userData)
        try {
            setsubmitSuccess(true)
            await new Promise((resolve) => { setTimeout(resolve, 2000) })
            const formData = new FormData();
            formData.append("shopname", userData.shopname)
            formData.append('email', userData.email)
            formData.append('shopmobilenumber', userData.shopmobilenumber)
            formData.append('shopaddress', userData.shopaddress)
            formData.append('starttime', userData.starttime)
            formData.append('endtime', userData.endtime)
            formData.append('role', userData.role)
            formData.append('file', userData.file);
            console.log(formData)
            axios.put('http://localhost:3000/productupdate/'+id, formData).then((user) => {
                console.log(user.data)
                if (user.data.message === "Product update Successfully") {
                    navigate("/adminhome")
                } else {
                    
                }
            }).catch((err) => { console.log(err) })
            
        } catch (error) {
            setError("root", { message: "User already exists" })
        }
    }

    return (
        <Container>
            <Row className="login-row " >
                <Form className="first-col form-login  col-md-6 col-lg-6" style={{ width: '25rem' }} onSubmit={handleSubmit(onSubmit)} >
                    <h1 className="text-center">Product Update</h1>
                    <Col>
                        <Form.Group className="mb-3" >
                            <Form.Label>Shop Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter The Phone Number" 
                            
                            value={userData.shopname} onChange={e => setUserData({ ...userData, shopname: e.target.value })} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="text" 
                            
                            value={userData.email} onChange={e => setUserData({ ...userData, email: e.target.value })} />
                        </Form.Group>
                    </Col>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Shop Address</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Enter shop address"   
                        
                        value={userData.shopaddress} onChange={e => setUserData({ ...userData, shopaddress: e.target.value })}/>
                    </Form.Group>
                    <Col>
                    <Row>
                        <Form.Group as={Col} className="" >
                            <Form.Label>Start Time</Form.Label>
                            <Form.Control type="time" placeholder="Enter working time"
                            
                            value={userData.starttime} onChange={e => setUserData({ ...userData, starttime: e.target.value })}/>
                        </Form.Group>
                        <Form.Group as={Col} className="" >
                            <Form.Label>End Time</Form.Label>
                            <Form.Control type="time" placeholder="Enter working time" 
                            
                            value={userData.endtime} onChange={e => setUserData({ ...userData, endtime: e.target.value })}/>
                        </Form.Group>
                        </Row>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" >
                            <Form.Label>Shop Mobile Number</Form.Label>
                            <Form.Control type="number" placeholder="Enter The shop mobile number" 
                            
                            value={userData.shopmobilenumber} onChange={e => setUserData({ ...userData, shopmobilenumber: e.target.value })}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Choose Image</Form.Label>
                            <Form.Control type="file" placeholder="Enter The Phone Number" onChange={e => setUserData({ ...userData, file: e.target.files[0] })} />
                        </Form.Group>
                    </Col>
                    <Col className="login-btn">
                        <Button variant="success" className="text text-" type="submit" >Update</Button>
                    </Col>
                </Form>
            </Row>
        </Container>
    )
}
export default AdminProductUpdate