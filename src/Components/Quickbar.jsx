import React from 'react'
import './Sidebar.css';
import { useNavigate} from 'react-router-dom'
import {signOut} from 'firebase/auth';
import {auth} from '../firebaseConfig';

import logo from '../Assets/LOGO clean.png'
import {BoxArrowLeft} from 'react-bootstrap-icons'
import { Button, Nav } from 'react-bootstrap';
import Cookies from 'universal-cookie';


function Quickbar({L1,L2,L3,L4}) {

  let nav = useNavigate();

  const LogOut=()=>{
    signOut(auth).then(()=>{
      const cookies = new Cookies();
      cookies.remove('useraidt');
      
      nav('/');
      
    })
    
  }
  return (
 <div className='Sidebar' style={{marginTop:'10px', marginLeft:'17px', borderRadius:'20px', marginRight:'5px'}}>
  
   <div style={{marginTop: '150px',}}>
   <Nav >
      <Nav.Item style={{marginBottom:'20px'}} >
       {L1}
      </Nav.Item>
      <Nav.Item style={{marginBottom:'20px'}}>
      {L2}
      </Nav.Item>
      <Nav.Item style={{marginBottom:'20px'}}>
      {L3}
      </Nav.Item>
      <Nav.Item style={{marginBottom:'20px'}}>
      {L4}
      </Nav.Item>
      
    </Nav>
   </div>
 </div>

  )
}

export default Quickbar