import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar, Container, Nav, Button, Card, Col } from 'react-bootstrap';
import axios from 'axios';
import './Comenon.css'
function VendorProductFullDedails() {
  const { id, token } = useParams()
  console.log(id)
  const navigate = useNavigate();
  const [vendorProducts, setVendorProducts] = useState([])
  console.log(token)
  const userId = sessionStorage.getItem('userid')
  const vendorId=sessionStorage.setItem('vendorid',id)
  const [userData, setUserData] = useState({ shopname: "", email: '', shopmobilenumber: '', shopaddress: "", file: "" })
  useEffect(() => {
    axios.get(`http://localhost:3000/ProductFullDetails/${id}/${token}`).then(product => {
      console.log(product)
      setVendorProducts([product.data.vendorProductDetails])
    })
  }, [])


  console.log(userData)

  return (
    <div  className='clr'>
      {
        vendorProducts.map((vendor) => (
          <Col className=''>
            <Card style={{ width: '100%', height: "100%" }} className='col-sm-12 ' >
              <div className="card-header d-flex flex-wrap">
                <div className="">
                  <Card.Img variant="top" src={`http://localhost:3000/images/${vendor.image}`} style={{width:"20rem",height:"20rem"}} />
                </div>
                <Card.Body >
                  <Card.Title>{vendor.shopname}</Card.Title>
                  <div className="vendor-email d-flex flex-wrap  ">
                    <label> Email</label>
                    <Card.Text>:   {vendor.email}</Card.Text>
                  </div>
                  <div className="vendor-email d-flex flex-wrap  ">
                    <label> ShopAddress</label>
                    <Card.Text>:   {vendor.shopaddress}</Card.Text>
                  </div>
                  <div className="vendor-email d-flex flex-wrap">
                    <label> Contect Us</label>
                    <Card.Text>:   {vendor.shopmobilenumber}</Card.Text>
                  </div>
                  <div className="vendor-email d-flex flex-wrap">
                    <label> Start Time</label>
                    <Card.Text>:   {vendor.starttime}</Card.Text>
                  </div>
                  <div className="vendor-email d-flex">
                    <label> Ending Time</label>
                    <Card.Text>:   {vendor.endtime}</Card.Text>
                  </div>
                </Card.Body>
              </div>
            </Card>
          </Col>
        ))
      }
    </div>
  )
}

export default VendorProductFullDedails