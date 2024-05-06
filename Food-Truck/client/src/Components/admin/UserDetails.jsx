import React, { useEffect, useState } from 'react'
import { Navbar, Container, Nav, Button, Table } from 'react-bootstrap';
import { MdModeEdit  ,MdDelete } from "react-icons/md";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function UserDetails() {
  const [userdata, setData] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    axios.get('http://localhost:3000/admin/userdetails').then((result) => {
      console.log(result.data)
      setData(result.data.userDetails)
    }).catch((err) => {
      console.log(err)
    });
  }, [])
  const handleDelete = (id) => {
    console.log(id)
    axios.delete(`http://localhost:3000/user/delete/${id}`).then((user) => {
      console.log(user)
      window.location.reload()
    }).catch(err => { console.log(err) })
  }
  const handleUserUpdate = (id) => {
    console.log(id)
    navigate('/admin/user/update', sessionStorage.setItem('adminuupdateid', id))
  }
  return (
    <div className="admin">
      <Table className='responsive col-md-4 m-3'>
        <thead>
          <tr className='border border-1 ' >
            <th>User Name</th>
            <th>User Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className='tbody'>
          {
            userdata.map((user) => {
              return (
                <tr key={user._id} className='admin-data'>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                  <td><Button className="edit-btn" variant="success" onClick={e => handleUserUpdate(user._id)}><i><MdModeEdit className='edit-icon' /></i><i>Edit</i></Button></td>
                  <td><Button className="edit-btn" variant="success" onClick={e => handleDelete(user._id)}> <i><MdDelete className='edit-icon' /></i><i>Delete</i></Button></td>
                </tr>
              )
            })}
        </tbody>
      </Table>
    </div>
  )
}

export default UserDetails