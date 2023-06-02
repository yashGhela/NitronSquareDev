import React from 'react'
import './Sidebar.css';
import { useNavigate} from 'react-router-dom'
import {signOut} from 'firebase/auth';
import {auth} from '../firebaseConfig';

import logo from '../Assets/LOGO clean.png'
import {BoxArrowLeft} from 'react-bootstrap-icons'
import { Button, Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Cookies from 'universal-cookie';


function Quickbar({L1,L2,L3,L4,L5,L6,L7,L8,L9}) {

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
 <div className='Sidebar' style={{height:'60%', marginLeft:'17px', borderRadius:'10px', marginRight:'5px', boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',backdropFilter: 'blur( 50px )', background:'rgba( 255, 255, 255, 0.25 )', marginTop:'6%', border:'2px solid #b1b4b5'}}>
  
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
      overlay={renderTooltip('Media')}>
      {L8}
      </OverlayTrigger>
      </Nav.Item>
      <Nav.Item style={{marginBottom:'20px'}}>
      <OverlayTrigger
      overlay={renderTooltip('Spotify')}>
      {L9}
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