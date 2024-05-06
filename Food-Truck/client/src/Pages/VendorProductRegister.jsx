import { Container, Form, Row, Col, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";


function ProductRegister() {
    const { register, setError, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const [submitSuccess, setsubmitSuccess] = useState(false)
    const email=sessionStorage.getItem('vemail')
    const [userData, setUserData] = useState({ shopname: "", email: email, shopmobilenumber: '', shopaddress: "", starttime: "",endtime:"",file: "", role: 'VendorProduct' })
    const navigate = useNavigate()
    
    const onSubmit = async (e) => {
        console.log(email)
        console.log(userData)
        try {
            setsubmitSuccess(true)
            await new Promise((resolve) => { setTimeout(resolve, 2000) })
            const formData = new FormData();
            formData.append("shopname", userData.shopname);
            formData.append('email', userData.email);
            formData.append('shopmobilenumber', userData.shopmobilenumber);
            formData.append('shopaddress', userData.shopaddress);
            formData.append('starttime', userData.starttime);
            formData.append('endtime', userData.endtime);
            formData.append("role",userData.role);
            formData.append('file', userData.file);
            
            axios.post('http://localhost:3000/productregister', formData).then((user) => {
                console.log(user.data)
                if (user.data === "User already exists") {
                    throw new Error()
                } else {
                    navigate("/vendorhome" )
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
                    <h1 className="text-center">Product Register</h1>
                    <Col>
                        <Form.Group className="mb-3" >
                            <Form.Label>Shop Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter The Phone Number" className={errors.ShopName&&'regi-inp-err'}  
                            {...register("ShopName", {
                                required: 'ShopName is required',
                                validate: (value) => {
                                    console.log(value[0].toUpperCase())
                                    if (value[0].trim() === value[0].toUpperCase()) {
                                        return true
                                    }
                                    return 'First letter is capital '
                                }
                            })}
                            value={userData.name} onChange={e => setUserData({ ...userData, shopname: e.target.value })} />
                        {errors.ShopName && <div className="text-light">{errors.ShopName.message}</div>}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="text" disabled 
                             

                       
                            value={userData.email} onChange={e => setUserData({ ...userData, email: e.target.value })} />
                        </Form.Group>
                    </Col>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Shop Address</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Enter shop address" className={errors.ShopAddress&&'regi-inp-err'}  
                           {...register("ShopAddress", {
                            required: 'ShopAddress is required',
                          
                        })}
                        value={userData.shopaddress} onChange={e => setUserData({ ...userData, shopaddress: e.target.value })}/>
                    {errors.ShopAddress&& <div className="text-light">{errors.ShopAddress.message}</div>}
                    </Form.Group>
                    <Col>
                    <Row>
                        <Form.Group as={Col} className="" >
                            <Form.Label>Start Time</Form.Label>
                            <Form.Control type="time" placeholder="Enter working time" className={errors.StartTime&&'regi-inp-err'} 
                            {...register("StartTime", {
                                required: 'StartTime is required',
                              
                            })}
                            value={userData.start} onChange={e => setUserData({ ...userData, starttime: e.target.value })}/>
                        {errors.StartTime&& <div className="text-light">{errors.StartTime.message}</div>}
                        </Form.Group>
                        <Form.Group as={Col} className="" >
                            <Form.Label>End Time</Form.Label>
                            <Form.Control type="time" placeholder="Enter working time" className={errors.EndTime&&'regi-inp-err'} 
                              {...register("EndTime", {
                                required: 'EndTime is required',
                              
                            })}
                            value={userData.endtime} onChange={e => setUserData({ ...userData, endtime: e.target.value })}/>
                        {errors.EndTime&& <div className="text-light">{errors.EndTime.message}</div>}
                        </Form.Group>
                        </Row>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" >
                            <Form.Label>Shop Mobile Number</Form.Label>
                            <Form.Control type="number" placeholder="Enter The shop mobile number" className={errors.ShopMobileNumber&&'regi-inp-err'} 
                               {...register('ShopMobileNumber', {
                                required: "Phone Number required",
                                minLength: {
                                    value: 10,
                                    message: 'The phone number must contanin 10 numbers'
                                }
                            })}
                            value={userData.ShopMobileNumber} onChange={e => setUserData({ ...userData, ShopMobileNumber: e.target.value })}/>
                         {errors.phone && <div className="text-light">{errors.phone.message}</div>}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Choose Image</Form.Label>
                            
                            <Form.Control type="file" placeholder="Enter The Phone Number" onChange={e => setUserData({ ...userData, file: e.target.files[0] })} />
                        </Form.Group>

                    </Col>
                    <Col className="login-btn">
                        <Button variant="success" className="text text-" type="submit">Register</Button>
                    </Col>
                </Form>
            </Row>
        </Container>
    )
}
export default ProductRegister