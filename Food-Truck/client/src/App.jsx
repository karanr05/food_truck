
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css'
import SignIn from "./Pages/SignIn";
import Login from "./Pages/Login";
import Index from './Pages/Index';
import Register from './Pages/VendorRegister'
import ProductRegister from './Pages/VendorProductRegister'
import UserHome from "./Pages/UserHome";
import VendorHome from "./Pages/VendorHome"
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import VendorProductUpdate from "./Pages/vendorProductUpdate";
import VendorProductFullDedails from "./Pages/vendorfullpage";
import UserDetails from "./Components/admin/UserDetails";
import VendorProductDetails from "./Components/admin/VendorProductDetails";
import VendorDetails from "./Components/admin/VendorDetails";
import AdminHome from "./Components/admin/AdminHome";
import AdminProductUpdate from "./Components/admin/AdminProductUpdate";
import VendorUpdate from "./Pages/VendorUpdate";
import AdminVendorUpdate from "./Components/admin/AdminVendorUpdate";
import AdminUserUpdate from "./Components/admin/AdminUserUpdate";
import UserUpdate from "./Pages/UserUpdate";
import LoginUserData from "./Components/admin/LoginUserDetails";
import LoginVendorData from "./Components/admin/LoginVendorDetails";
import Footer from "./Pages/Footer";

function App() {
  const hexCharacters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"]
  const getCharacter = (index) => {
    return hexCharacters[index]
  }
  const randomColor = () => {
    let hexColorRep = '#'
    for (let i = 0; i < 6; i++) {
      const randomCharacters = Math.floor(Math.random() * hexCharacters.length)
      hexColorRep += getCharacter(randomCharacters)
    }
    return hexColorRep
  }
  // console.log(randomColor())
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path='/home' element={<Home/>}/> */}
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<SignIn />} />
          <Route path="/userhome" element={<UserHome />} />
          <Route path="/vendorregister" element={<Register />} />
          <Route path="/vendorproductregister" element={<ProductRegister />} />
          <Route path="/vendorhome" element={<VendorHome />} />
          <Route path='/login' element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword/:id/:token" element={<ResetPassword />} />
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/vendorproductupdate" element={<VendorProductUpdate />} />
          <Route path="/ProductFullDetails/:id/:token" element={<VendorProductFullDedails />} />
          <Route path="/adminhome" element={<AdminHome colors={randomColor()} />} />
          <Route path="/userdetails" element={<UserDetails />} />
          <Route path="/vendorproduct" element={<VendorProductDetails />} />
          <Route path="/vendordetails" element={<VendorDetails />} />
          <Route path="/adminproductupdate" element={<AdminProductUpdate />} />
          <Route path="/user/update" element={<UserUpdate />} />
          <Route path="/vendor/update" element={<VendorUpdate />} />
          <Route path="/admin/vendor/update" element={<AdminVendorUpdate />} />
          <Route path="/admin/user/update" element={<AdminUserUpdate />} />
          <Route path="/userlogindata" element={<LoginUserData />} />
          <Route path="/vendorlogindata" element={<LoginVendorData />} />
          <Route path="/footer" element={<Footer />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
