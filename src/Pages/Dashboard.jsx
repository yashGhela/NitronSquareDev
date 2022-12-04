import { collection, orderBy, query, limit, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import {   useNavigate } from 'react-router-dom';

import Sidebar from '../Components/Sidebar'
import './Page.css';
import { db } from '../firebaseConfig';
import {Speedometer,CardText,BarChart } from 'react-bootstrap-icons'
import {Button, Modal, Card, Row, Col,  Accordion, AccordionButton} from 'react-bootstrap';




function Dashboard() {
  
  
  const user = sessionStorage.getItem('useraidt');
  const subRef=collection(db, 'Users',user,'Sessions');
  const [recsesList, setRecsesList]=useState([]); //Recent Sessions 
  const [modalShow, setModalShow]=useState(false);


 const q = query(subRef,orderBy('time', 'desc'),limit(5));


 useEffect(() => {  //loads all the tenants
    
 
  onSnapshot(q, (snapshot) => {
   setRecsesList(
      snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
    
    
  });
}, []);
 

  let nav = useNavigate();

  

  return (
    <div className='Page'>
      
     
       
        <div className="navB">
        <Sidebar
        L1={<Button variant='dark' onClick={()=>nav(`/Dashboard/${user}`)}><Speedometer/></Button>}
        L2={<Button variant='dark' onClick={()=>nav(`/Sessions/${user}`)}><CardText/></Button>}
        L3={<Button variant='dark' onClick={()=>nav(`/Trends/${user}`)}><BarChart/></Button>}/>
        </div>
       
        
     
       
        <div className="bod">
        
          <Card style={{
            width:'93vw',
             margin:'20px',
             height:'250px',
             backgroundImage:'linear-gradient(-45deg ,rgb(163, 207, 137) ,rgb(182, 95, 177), rgb(238, 168, 103))',
             backgroundSize:'400% 400%',
             textAlign:'center',
             alignItems:'center',
             color:'white',
             padding:' 10px',
             animation:'gradient 15s ease infinite'
              }}>
            <Card.Title ><h1 style={{FontWeight:'bold', FontSize:'40px'}}>Start A New Sessions</h1></Card.Title>
            
          <Button  variant='outline-light' style={{height:'60px', width:'100px' }} onClick={()=>{nav(`/SesSettings/${user}`)}}>Lets Go!</Button>
          
          </Card>
         

         
        
        <div className="Recent">
          <h1 >Recent Sessions:</h1>
         
            {recsesList.map((rec)=>{
              return(
                
                <div>
                  
                 
                  <Card style={{background:'black' , display:'flex', width:'100%', marginBottom:'20px', fontWeight:'lighter', padding:'15px', cursor:'pointer'}} onClick={()=>{setModalShow(true) }}  >
                    <Row>
                      <Col xs={6} > <h3 style={{fontWeight:'400', fontSize:'20px'}}>{rec.subject}</h3></Col>
                      <Col > <h3 style={{fontWeight:'400', fontSize:'20px'}}>{rec.WorkTime}</h3></Col>
                      <Col > <h3 style={{fontWeight:'400', fontSize:'20px'}}>{rec.BreakTime}</h3></Col>
                      <Col > <h3 style={{fontWeight:'400', fontSize:'20px'}}>{rec.time}</h3></Col>
                      
      
                   
                      </Row>
                  
                    </Card>

                    <Modal
                      
                      show={modalShow}
                       size="lg"
                       aria-labelledby="contained-modal-title-vcenter"
                       onHide={()=>{setModalShow(false)}}
                       centered>
                    <Modal.Header closeButton>
                    <Modal.Title  id="contained-modal-title-vcenter">
                     Session
                    </Modal.Title>
                    </Modal.Header>
                     <Modal.Body>
                       <h4 style={{fontWeight:'bold', fontSize:'20px'}}>Subject: </h4>
                       <h4  style={{fontWeight:'400', fontSize:'20px'}}>{rec.subject}</h4>
                       <h4 style={{fontWeight:'bold', fontSize:'20px'}}>Work Time: </h4>
                       <h4 style={{fontWeight:'400', fontSize:'20px'}}>{rec.WorkTime} minutes</h4>
                       <h4 style={{fontWeight:'bold', fontSize:'20px'}}> Break Time: </h4>
                       <h4 style={{fontWeight:'400', fontSize:'20px'}}>{rec.BreakTime} minutes</h4>
                       <h4 style={{fontWeight:'bold', fontSize:'20px'}}>Date: </h4>
                        <h4 style={{fontWeight:'400', fontSize:'20px'}}>{rec.time}</h4>
                       <h4 style={{fontWeight:'bold', fontSize:'20px'}}>Rating: </h4>
                        <h4 style={{fontWeight:'400', fontSize:'20px'}}>{rec.rating}⭐</h4>
                       <h5 style={{fontWeight:'bold', fontSize:'20px'}}>Description:</h5>
                       <p style={{fontWeight:'400', fontSize:'15x', padding:'10px', backgroundColor:'light-gray'}}>{rec.description}</p>
                     </Modal.Body>
                     </Modal>

                    
              
                  </div>                      
              )
            })}

             
             
          </div>
        </div>
        </div>
      
      
      
      
    
  )
}

export default Dashboard