import React from 'react'
import {Navbar,Container,Nav, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate }from 'react-router-dom'
import Navbars from '../Components/Navbar/Navbar';
import Footer from './Footer';

function Index() {
  const navigate=useNavigate();
  return (<>
  <Navbars/>
   {/* <!-- Start Hero Section --> */}
    <div className="hero">
      <Container>
        <div className="row justify-content-between">
          <div className="col-lg-5">
            <div className="intro-excerpt ">
              <h1>Fresh & Organic <span clsas="d-block">Eat Smart Live Better</span></h1>
              <p className="mb-4">Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.</p>
              <div className=''>
                <Button className="hero-btn-user mx-3" variant='outline-success' onClick={e=>navigate('/signup')}>User</Button>
                <Button className="hero-btn-user" variant='outline-success' onClick={e=>navigate('/vendorregister')}>Vendor</Button>
              </div>
            </div>
          </div>
          <div className="col-lg-7">
          </div>
        </div>
      </Container>
    </div>
   
  {/* <!-- End Hero Section --> */}
  </>
  
  )
}

export default Index