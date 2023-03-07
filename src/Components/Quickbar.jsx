import React from 'react'
import './Sidebar.css';
import { useNavigate} from 'react-router-dom'
import {signOut} from 'firebase/auth';
import {auth} from '../firebaseConfig';

import logo from '../Assets/LOGO clean.png'
import {BoxArrowLeft} from 'react-bootstrap-icons'
import { Button, Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Cookies from 'universal-cookie';


function Quickbar({L1,L2,L3,L4,L5,L6,L7}) {

  let nav = useNavigate();

  const renderTooltip = (label) => (
    <Tooltip id="button-tooltip" >
     {label}
    </Tooltip>
  );

  const LogOut=()=>{
    signOut(auth).then(()=>{
      const cookies = new Cookies();
      cookies.remove('useraidt');
      
      nav('/');
      
    })
    
  }
  return (
 <div className='Sidebar' style={{height:'55vh', marginLeft:'17px', borderRadius:'10px', marginRight:'5px', backgroundColor:'#282b2e', marginTop:'6%'}}>
  
   <div style={{marginTop: '50%',}}>
   <Nav style={{height:'100%',}} >

      <Nav.Item style={{marginBottom:'20px'}} >
      <OverlayTrigger
      overlay={renderTooltip('Sounds')}>
      {L1}
      </OverlayTrigger>
      </Nav.Item>
      <Nav.Item style={{marginBottom:'20px'}}>
      <OverlayTrigger
      overlay={renderTooltip('Timer')}>
      {L2}
      </OverlayTrigger>
      </Nav.Item>
      <Nav.Item style={{marginBottom:'20px'}}>
      <OverlayTrigger
      overlay={renderTooltip('Quick Trends')}>
      {L3}
      </OverlayTrigger>
      </Nav.Item>
      <Nav.Item style={{marginBottom:'20px'}}>
      <OverlayTrigger
      overlay={renderTooltip('Quick Scopes')}>
      {L4}
      </OverlayTrigger>
      </Nav.Item>
      <Nav.Item style={{marginBottom:'20px'}}>
      <OverlayTrigger
      overlay={renderTooltip('Worlds')}>
      {L5}
      </OverlayTrigger>
      </Nav.Item>
      <Nav.Item style={{marginBottom:'20px'}}>
      <OverlayTrigger
      overlay={renderTooltip('To Dos')}>
      {L6}
      </OverlayTrigger>
      </Nav.Item>
      <Nav.Item style={{marginBottom:'20px'}}>
      <OverlayTrigger
      overlay={renderTooltip('Exit')}>
      {L7}
      </OverlayTrigger>
      </Nav.Item>
      
    </Nav>
   </div>
 </div>

  )
}

export default Quickbar