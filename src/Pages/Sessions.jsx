import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../Components/Sidebar'
import { collection, orderBy, query} from 'firebase/firestore';

import './Page.css';
import {Button, Card, Row, Col} from 'react-bootstrap';
import { db } from '../firebaseConfig';
import {Speedometer,CardText,BarChart } from 'react-bootstrap-icons'
import { usePagination } from 'use-pagination-firestore';
import Cookies from 'universal-cookie';

function Sessions() {
 


  const cookie = new Cookies()
  const user=cookie.get('useraidt')

  
  const subRef=collection(db, 'Users',user,'Sessions');
  let nav = useNavigate();

    const{
        items,
        isStart,
        isEnd,
        getPrev,
        getNext,
               }=usePagination(
      query(subRef,orderBy('time','desc')),{
        limit: 5
      }
    );


  return (
    

    <div className='Page'>
      <Sidebar
       L1={<Button variant='dark' onClick={()=>nav(`/Dashboard/${user}`)}><Speedometer/></Button>}
       L2={<Button variant='dark' onClick={()=>nav(`/Sessions/${user}`)}><CardText/></Button>}
       L3={<Button variant='dark' onClick={()=>nav(`/Trends/${user}`)}><BarChart/></Button>}/>



        <div className="bod1">
        <Card style={{
            width:'93vw',
             margin:'20px',
             height:'250px',
             backgroundImage:'linear-gradient(-45deg ,rgb(109, 106, 247) ,rgb(73, 44, 191), rgb(63, 209, 87))',
             backgroundSize:'400% 400%',
             textAlign:'center',
             alignItems:'center',
             color:'white',
             padding:' 10px',
             animation:'gradient 15s ease infinite'
              }}>
            <Card.Title ><h1 style={{FontWeight:'bold', FontSize:'40px'}}>Sessions</h1></Card.Title>
            
         
          
          </Card>

          <div className="Recent">
          <h1>Your Sessions:</h1>
         
          {items.map((rec)=>{
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
          <div style={{marginLeft:'50%'}}>
          <Button  variant='dark'  onClick={getPrev} disabled={isStart} style={{margin:'10px'}} >Previous </Button>
          <Button variant='dark' onClick={getNext} disabled={isEnd}  style={{margin:'10px'}}>Next</Button>
          </div>
        </div>
    </div>
  )
}

export default Sessions