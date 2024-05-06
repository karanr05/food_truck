import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
function LoginVendorData() {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/login/vendordata').then(user => {
            setData(user.data.vendorDatas)
        }).catch(err => {
            console.log(err)
        })
    }, [])
    return (
        <div className="admin">
            <Table className='responsive col-md-4 m-3'>
                <thead>
                    <tr className='border border-1 ' >
                        <th>Vendor Id</th>
                        <th>VendorName</th>
                        <th>VendorEmail</th>
                        <th>Last Login Date</th>
                        <th>Last Login Time</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody className='tbody'>
                    {
                        data.map((user) => {
                            return (
                                <tr key={user._id} className='admin-data'>
                                    <td>{user.UserId}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.lastLoginDate}</td>
                                    <td>{user.lastLogintime}</td>
                                    <td>{user.role}</td>
                                </tr>
                            )
                        })}
                </tbody>
            </Table>
        </div>
    )
}

export default LoginVendorData