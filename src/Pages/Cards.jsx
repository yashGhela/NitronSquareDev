import React, { useState, useRef, useEffect} from 'react'
import Sidebar from '../Components/Sidebar'
import { Button, Card, Modal } from 'react-bootstrap'
import {    useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { db } from '../firebaseConfig';
import {Speedometer,CardText,BarChart, Hr, Journals, Bullseye, Check, Journal, Archive, Wallet2 } from 'react-bootstrap-icons'


import { EDITOR_JS_TOOLS } from '../Components/tools';
import Editor from '../Components/Editor';



function Cards() {
    const cookie = new Cookies()
  const user=cookie.get('useraidt')
  
  let nav = useNavigate();


 


  const [showModal, setShowModal]=useState(false);
  
  return (
    <div className='Page'>

        <div className="navB">
        <Sidebar
        L1={<Button variant='light-outline' onClick={()=>nav(`/Dashboard/`)}><Speedometer style={{color:'white'}}/></Button>}
        L2={<Button variant='light-outline' onClick={()=>nav(`/Sessions/`)}><Archive style={{color:'white'}}/></Button>}
        L3={<Button variant='light-outline' onClick={()=>nav(`/Trends/`)}><BarChart style={{color:'white'}}/></Button>}
        L4={<Button variant='light-outline' onClick={()=>nav(`/Scopes/`)}><Bullseye style={{color:'white'}}/></Button>}
        L5={<Button variant='light-outline' onClick={()=>{nav('/Cards')}}><Wallet2 style={{color:'white'}}/></Button>}/>
        </div>

        <div className="bod">
            <div className="top">
            <Card style={{
            
            margin:'20px',
            height:'150px',
            backgroundImage:'radial-gradient(circle, rgba(129,222,246,1) 0%, rgba(175,94,235,1) 100%)',
            backgroundSize:'400% 400%',
            textAlign:'center',
            alignItems:'center',
            color:'white',
            padding:' 10px',
            animation:'gradient 15s ease infinite'
             }}>
           <Card.Title ><h1 style={{FontWeight:'400', FontSize:'40px'}} >Cards</h1></Card.Title>
           
         <Button  variant='outline-light' style={{height:'60px', width:'120px' }} onClick={()=>{setShowModal(true)}}>Add a new card set</Button>
         
         </Card>
         
        

         
            </div>
        </div>
       
    </div>
  )
}

export default Cards