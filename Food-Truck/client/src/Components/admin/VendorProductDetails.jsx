import React, { useEffect, useState } from 'react'
import { Navbar, Container, Nav, Button, Table } from 'react-bootstrap';
import axios from 'axios'
import { useNavigate } from 'react-router-dom' 
function VendorProductDetails() {
  const [vendordata, setData] = useState([]);
  const navigate=useNavigate()

  useEffect(() => {
    axios.get('http://localhost:3000/admin/vendorproductdetails').then((result) => {
      console.log(result.data)
      setData(result.data.vendorDatas)
    }).catch((err) => {
      console.log(err)
    });
  }, [])
  
  const handleDelete = (id) => {
    console.log(id)
    axios.delete(`http://localhost:3000/admin/vendorproductdelete/${id}`).then((user) => {
        console.log(user)
        window.location.reload()
    }).catch(err => { console.log(err) })
}
const handleUpdate = (id) => {
  navigate('/adminproductupdate', sessionStorage.setItem('adminpid', id))
}
  return (
    <div className="admin">
      <Table className=' table responsive col-md-4'>
        <thead>
          <tr className='border border-1'>
            <th>Image</th>
            <th>Shopname</th>
            <th>Email</th>
            <th>Shop Number</th>
            <th>ShopAddress</th>
            <th>StartTime</th>
            <th>EndTime</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className='tbody'>
          {
            vendordata.map((vendor) => {
              return (
                <tr key={vendor._id} className='admin-data'>

                  <td><img src={`http://localhost:3000/images/${vendor.image}`} alt='chh' /></td>
                  <td>{vendor.shopname}</td>
                  <td>{vendor.email}</td>
                  <td>{vendor.shopmobilenumber}</td>
                  <td>{vendor.shopaddress}</td>
                  <td>{vendor.starttime}</td>
                  <td>{vendor.endtime}</td>
                  <td><Button className='' variant="primary" onClick={e => handleUpdate(vendor._id)}>Update</Button></td>
                  <td><Button variant="primary" onClick={e => handleDelete(vendor._id)}>Delete</Button></td>
                </tr>

              )
            })}
        </tbody>


      </Table>
    </div>
  )
}

export default VendorProductDetails