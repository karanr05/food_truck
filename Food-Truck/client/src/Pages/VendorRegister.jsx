import { Container, Form, Row, Col, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import axios from 'axios'
import { useNavigate,Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function Register() {
    const { register, setError, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const [submitSuccess, setsubmitSuccess] = useState(false)
    const [userData, setUserData] = useState({ name: "", email: "", phone: '', password: "", role: 'Vendor' })
    const navigate = useNavigate()
    const onSubmit = async (e) => {
        console.log(userData)
        try {
            setsubmitSuccess(true)
            await new Promise((resolve) => { setTimeout(resolve, 2000) })
            axios.post('http://localhost:3000/vendorregister', userData).then((user) => {
            // console.log(user.data.email)
            if (user.data === "User already exists") {
                throw new Error()
            } else {
                
                navigate('/login')
            }
        }).catch((err) => { console.log(err) })
            
        } catch (error) {
            setError("root", { message: "User already exists" })
        }

        
    }
    return (
        <>
            <Container className="container" id="owner-register">
                <Row className="d-flex justify-content-md̥-center login-row">
                    <Col className=" first-col " md={6}>
                        <form onSubmit={handleSubmit(onSubmit)} className="form-register form-login">
                            <h1 className="text-center">Register</h1>
                            <Col>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Your Name</Form.Label>
                                    <Form.Control type="text" name="name" className={errors.name && "regi-inp-err"}
                                        {...register("name", {
                                            required: "Name is Required",
                                            validate: (value) => {
                                                if (value[0].trim() === value[0].toUpperCase()) {
                                                    return true
                                                }
                                                return 'First letter is capital '
                                            }
                                        })}
                                        value={userData.name} onChange={e => setUserData({ ...userData, name: e.target.value })} />
                                    {errors.name && <div className="text-danger">{errors.name.message}</div>}
                                
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3"  >
                                    <Form.Label>Email Id</Form.Label>
                                    <Form.Control type="email" name="email" className={errors.email && "regi-inp-err"}
                                        {...register("email", {
                                            required: "Email is required",
                                            validate: (value) => {
                                                if (!value.includes("@")) { return "must includes in @" }
                                                return true
                                            }
                                        })}
                                        value={userData.email}
                                        onChange={e => setUserData({ ...userData, email: e.target.value })} placeholder="Enter email example@gmail.com" />
                                    {errors.email && <div className="text-danger">{errors.email.message}</div>}
                                
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control type="number" name="phone" className={errors.phone && "regi-inp-err"}
                                        {...register('phone', {
                                            required: 'phone number is required',
                                            minLength: {
                                                value: 10,
                                                message: 'The phone number must contanin 10 numbers'
                                            }
                                        })}
                                        value={userData.phone}
                                        onChange={e => setUserData({ ...userData, phone: e.target.value })} placeholder="Enter The Phone Number" />
                                    {errors.phone && <div className="text-danger">{errors.phone.message}</div>}
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter The Password" className={errors.password && "regi-inp-err"}
                                        {...register('password', {
                                            required: 'The is required',
                                            pattern: {
                                                value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                                                message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long',
                                            }
                                        })}
                                        value={userData.password} onChange={e => setUserData({ ...userData, password: e.target.value })} />
                                    {errors.password && <div className="text-danger">{errors.password.message}</div>}
                                </Form.Group>
                            </Col>
                            <Col  className="login-f-d">
                                <Button variant="primary" type="submit" disabled={isSubmitting} >{isSubmitting ? "loading....." : "submit"}</Button>
                                <Link to='/login'>do you have an account login ?</Link>
                            </Col>
                            {errors.root && <div className="text-danger">{errors.root.message}</div>}
                        </form>
                        {submitSuccess && (
                            <div className="popup-container">
                                <div className="popup">
                                    <p>Form submitted successfully!</p>
                                    <button onClick={() => setsubmitSuccess(false)}>Close</button>
                                </div>
                            </div>)}
                    </Col>
                </Row>
            </Container>
        </>
    )
};
export default Register