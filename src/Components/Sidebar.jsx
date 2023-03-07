import React from 'react'
import './Sidebar.css';
import { useNavigate} from 'react-router-dom'

import {auth} from '../firebaseConfig';

import logo from '../Assets/LOGO clean.png'
import {BoxArrowLeft, Gear} from 'react-bootstrap-icons'
import { Button, Nav, OverlayTrigger, Tooltip, Container } from 'react-bootstrap';
import Cookies from 'universal-cookie';


function Sidebar({L1,L2,L3,L4}) {

  let nav = useNavigate();

  
    const renderTooltip = (label) => (
      <Tooltip id="button-tooltip" >
       {label}
      </Tooltip>
    );

  
    
  
  return (

<div className='Sidebar' style={{marginTop:'10px', marginLeft:'7px', borderRadius:'10px', marginRight:'5px', display:'flex', flexDirection:'column', height:'97vh'}}>
 
<img src={logo} alt="" style={{height:'40px', width:'40px', marginBottom:'100%'}} />
   <div >
   <Nav >
   
    
      <Nav.Item style={{marginBottom:'20px'}} >
       <OverlayTrigger
       overlay={renderTooltip('Dashboard')}>
       {L1}
       </OverlayTrigger>
      </Nav.Item>
      <Nav.Item style={{marginBottom:'20px'}}>
      <OverlayTrigger
       overlay={renderTooltip('Sessions')}>
       {L2}
       </OverlayTrigger>
      </Nav.Item>
      <Nav.Item style={{marginBottom:'20px'}}>
      <OverlayTrigger
       overlay={renderTooltip('Trends')}>
       {L3}
       </OverlayTrigger>
      </Nav.Item>
      <Nav.Item style={{marginBottom:'20px'}}>
      <OverlayTrigger
       overlay={renderTooltip('Scopes')}>
       {L4}
       </OverlayTrigger>
      </Nav.Item>
      <Nav.Item style={{marginTop:'47vh'}} >
       <OverlayTrigger
        overlay={renderTooltip('Settings')}>
       <Button onClick={()=>{nav('/Settings')}}  variant='light-outline'><Gear style={{color:'white'}}/></Button>
       </OverlayTrigger>
      </Nav.Item>
     
    </Nav>
   </div>
 </div>


  )
}

export default Sidebar