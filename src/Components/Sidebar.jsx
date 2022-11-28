import React from 'react'
import './Sidebar.css';
import {Link, useNavigate} from 'react-router-dom'
import {signOut} from 'firebase/auth';
import {auth} from '../firebaseConfig';

import logo from '../Assets/LOGO clean.png'
import {BoxArrowLeft} from 'react-bootstrap-icons'
import { Button, Nav } from 'react-bootstrap';

function Sidebar({L1,L2,L3}) {

  let nav = useNavigate();

  const LogOut=()=>{
    signOut(auth).then(()=>{
      sessionStorage.clear();
      nav('/');
      
    })
    
  }
  return (
 <div className='Sidebar'>
  <img src={logo} alt="" style={{height:'40px', width:'40px'}}/>
   <div style={{marginTop: '150px',}}>
   <Nav >
      <Nav.Item style={{marginBottom:'20px'}}>
       <Button variant='dark'>{L1}</Button>
      </Nav.Item>
      <Nav.Item style={{marginBottom:'20px'}}>
      <Button variant='dark'>{L2}</Button>
      </Nav.Item>
      <Nav.Item style={{marginBottom:'20px'}}>
      <Button variant='dark'>{L3}</Button>
      </Nav.Item>
      <Nav.Item style={{marginTop:'520px'}} >
       <Button onClick={LogOut}><BoxArrowLeft/></Button>
      </Nav.Item>
    </Nav>
   </div>
 </div>

  )
}

export default Sidebar