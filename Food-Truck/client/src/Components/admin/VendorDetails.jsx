import React, { useEffect, useState } from 'react'
import { Navbar, Container, Nav, Button, Table } from 'react-bootstrap';
import { MdModeEdit  ,MdDelete } from "react-icons/md";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
function VendorDetails() {
  const [vendordata, setData] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    axios.get('http://localhost:3000/admin/vendordetails').then((result) => {
      console.log(result.data)
      setData(result.data.vendorDatas)
    }).catch((err) => {
      console.log(err)
    });
  }, [])
  const handleDelete = (id) => {
    console.log(id)
    axios.delete(`http://localhost:3000/vendor/delete/${id}`).then((user) => {
        console.log(user)
        window.location.reload()
    }).catch(err => { console.log(err) })
}
const handleVendorUpdate = (id) => {
  console.log(id)
  navigate('/admin/vendor/update', sessionStorage.setItem('adminvupdateid', id))
}
  return (
    <div className="admin">
      <Table className=' table responsive col-md-4'>
        <thead>
          <tr className='border border-1'>
            <th>Vendor name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className='tbody'>
          {
            vendordata.map((vendor) => {
              return (
                <tr key={vendor._id} className='admin-data'>
                  <td>{vendor.name}</td>
                  <td>{vendor.email}</td>
                  <td>{vendor.phone}</td>
                  <td><Button className="edit-btn"variant="success" onClick={e => handleVendorUpdate(vendor._id)}><i><MdModeEdit className='edit-icon'/></i><i>Edit</i></Button></td>
                  <td><Button className="edit-btn" variant="success" onClick={e => handleDelete(vendor._id)}> <i><MdDelete className='edit-icon'/></i><i>Delete</i></Button></td>
                </tr>
              )
            })}
        </tbody>


      </Table>
    </div>
  )
}

export default VendorDetails