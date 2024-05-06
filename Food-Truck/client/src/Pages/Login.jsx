import { Container, Form, Row, Col, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import './Comenon.css' 
import { Link } from "react-router-dom";
function Login() {
    const { register, setError, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const [userData, setUserData] = useState({ email: "", password: "" });
    const navigate = useNavigate()
    axios.defaults.withCredentials = true
    const onSubmit = async (e) => {
        try {
            await new Promise((resolve) => {
                setTimeout(resolve, 2000)
            }) 
            axios.post('http://localhost:3000/login', { ...userData }).then((user) => {
                console.log(user.data)
                if (user.data.message === 'Login Successfully') {
                    if (user.data.user.role === 'admin') {
                        localStorage.setItem("atoken",user.data.token)
                        navigate('/adminhome')
                    }
                     if(user.data.user.role==='user'){
                        localStorage.setItem("utoken",user.data.token)
                        navigate('/userhome') 
                    }
                    if(user.data.user.role==='Vendor'){
                        sessionStorage.setItem('vemail',user.data.user.email)
                        localStorage.setItem("vtoken",user.data.token)
                        navigate('/vendorhome') 
                    }
                }else{
                    throw new Error()
                }
            }).catch(err =>{
                 console.log(err)
                setError('root',{
                    message:'Incorrect password or email'
                })
                })
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <Container className="" >
            <Row className="login-row " >
                <Form className="first-col form-login  col-md-6 col-lg-6" style={{ width: '25rem' }} onSubmit={handleSubmit(onSubmit)} >
                    <h1 className="text-center">LOGIN</h1>
                    <Col>
                        <Form.Group className="mb-3" >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email"
                                className={errors && "valitate-error"}
                                {...register("email", {
                                    required: "Email is required",
                                    validate: (value) => {
                                        if (!value.includes("@")) { return "must includes in @" } return true
                                    }
                                })}
                                value={userData.email}
                                onChange={e => setUserData({ ...userData, email: e.target.value })} />
                                {errors.email&&<div className="text-danger">{errors.email.message}</div>}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password"
                                {...register('password',{
                                    required:"password is required"
                                })}
                                value={userData.password} onChange={e => setUserData({ ...userData, password: e.target.value })} 

                                />
                               
                                {errors.password&&<div className="text-danger">{errors.password.message}</div>}
                        </Form.Group>
                    </Col>
                    {errors.root&&<div className="text-danger">{errors.root.message}</div>}
                    <Col className="login-btn">
                        <Button variant="success" className="text text-" type="submit"> Login</Button>
                    </Col>
                    <Col className="login-f-d">
                        <Link to="/signup">Don't have an Account ?</Link> <Link to='/forgotpassword'>Forgot password?</Link>

                    </Col>
                </Form>
            </Row>
        </Container>
    )
};

export default Login;