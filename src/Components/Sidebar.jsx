import React from 'react'
import './Sidebar.css';
import { useNavigate} from 'react-router-dom'

import {auth} from '../firebaseConfig';

import logo from '../Assets/LOGO clean.png'
import {Archive, BarChart, BoxArrowLeft, Bullseye, Check2Square, Gear, Speedometer} from 'react-bootstrap-icons'
import { Button, Nav, OverlayTrigger, Tooltip, Container } from 'react-bootstrap';
import Cookies from 'universal-cookie';


function Sidebar({L1,L2,L3,L4,L5, L6}) {

  let nav = useNavigate();

  
    const renderTooltip = (label) => (
      <Tooltip id="button-tooltip" >
       {label}
      </Tooltip>
    );

  
    
  
  return (

<div className='Sidebar' style={{marginTop:'10px', marginLeft:'7px', borderRadius:'10px', marginRight:'5px', display:'flex', flexDirection:'column', height:'97dvh',  border:' 2px solid #393d40'}}>
 
<img src={logo} alt="" style={{height:'40px', width:'40px', marginBottom:'100%'}} />
   <div >
   <Nav >
   
    
      <Nav.Item style={{marginBottom:'20px'}} >
       <OverlayTrigger
       overlay={renderTooltip('Dashboard')}>
       <Button variant='light-outline' onClick={()=>nav(`/Dashboard/`)}><Speedometer style={{color:'white'}}/></Button>
       </OverlayTrigger>
      </Nav.Item>
      
      <Nav.Item style={{marginBottom:'20px'}}>
      <OverlayTrigger
       overlay={renderTooltip('Trends')}>
      <Button variant='light-outline' onClick={()=>nav(`/Trends/`)}><BarChart style={{color:'white'}}/></Button>
       </OverlayTrigger>
      </Nav.Item>
      <Nav.Item style={{marginBottom:'20px'}}>
      <OverlayTrigger
       overlay={renderTooltip('Scopes')}>
       <Button variant='light-outline' onClick={()=>nav(`/Scopes/`)}><Bullseye style={{color:'white'}}/></Button>
       </OverlayTrigger>
      </Nav.Item>
      <Nav.Item style={{marginBottom:'20px'}}>
      <OverlayTrigger
       overlay={renderTooltip('Todos')}>
       <Button variant='light-outine' onClick={()=>nav('/Todos')}><Check2Square style={{color:'white'}}/></Button>
       </OverlayTrigger>
      </Nav.Item>
      <Nav.Item style={{marginBottom:'20px', marginTop:'45vh'}}>
      <OverlayTrigger
       overlay={renderTooltip('Sessions')}>
       <Button variant='light-outline' onClick={()=>nav(`/Sessions/`)}><Archive style={{color:'white'}}/></Button>
       </OverlayTrigger>
      </Nav.Item>
      
   
      <Nav.Item  >
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