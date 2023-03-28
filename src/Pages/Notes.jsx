import React, { useState } from 'react'
import Sidebar from '../Components/Sidebar'
import { Button, Card, Modal } from 'react-bootstrap'
import {    useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { db } from '../firebaseConfig';
import {Speedometer,CardText,BarChart, Hr, Journals, Bullseye, Check, Journal, Archive } from 'react-bootstrap-icons'




function Notes() {
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
        L5={<Button variant='light-outline' onClick={()=>{nav('/Notes')}}><Journal style={{color:'white'}}/></Button>}/>
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
           <Card.Title ><h1 style={{FontWeight:'400', FontSize:'40px'}} >Notes</h1></Card.Title>
           
         <Button  variant='outline-light' style={{height:'60px', width:'120px' }} onClick={()=>{setShowModal(true)}}>Add a new note</Button>
         
         </Card>

         <Modal
         show={showModal}
         fullscreen={true}
         className='special_modal'
         onHide={()=>{setShowModal(false)}}
          
          >
            <Modal.Header closeButton closeVariant='white'>
                Your Note
            </Modal.Header>

            <Modal.Body>
               
            </Modal.Body>

         </Modal>
            </div>
        </div>
       
    </div>
  )
}

export default Notes