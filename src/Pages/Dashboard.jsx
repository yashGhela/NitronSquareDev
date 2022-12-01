import { collection, orderBy, query, limit, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import {   useNavigate } from 'react-router-dom';

import Sidebar from '../Components/Sidebar'
import './Page.css';
import { db } from '../firebaseConfig';
import {Speedometer,CardText,BarChart } from 'react-bootstrap-icons'
import {Button, Container, Card, Row, Col} from 'react-bootstrap';

function Dashboard() {
  
  const user = sessionStorage.getItem('useraidt');
  const subRef=collection(db, 'Users',user,'Sessions');
  const [recsesList, setRecsesList]=useState([]); //Recent Sessions 


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
                
                  <Card style={{background:'black' , display:'flex', width:'100%', marginBottom:'20px', fontWeight:'lighter', padding:'15px'}}>
                    <Row>
                      <Col xs={6}> <h3 style={{fontWeight:'400', fontSize:'20px'}}>{rec.subject}</h3></Col>
                      <Col > <h3 style={{fontWeight:'400', fontSize:'20px'}}>{rec.WorkTime} Minutes</h3></Col>
                      <Col > <h3 style={{fontWeight:'400', fontSize:'20px'}}>{rec.BreakTime} Minutes</h3></Col>
                      <Col > <h3 style={{fontWeight:'400', fontSize:'20px'}}>{rec.time}</h3></Col>

                  
                  

                    </Row>
         
                  </Card>
         
                  
                  
               
              )
            })}

             
             
          </div>
        </div>
        </div>
      
      
      
      
    
  )
}

export default Dashboard