import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../Components/Sidebar'
import { collection, orderBy, query, doc, deleteDoc} from 'firebase/firestore';

import './Page.css';
import {Button, Card, Row, Col, Modal} from 'react-bootstrap';
import { db } from '../firebaseConfig';
import {Speedometer,CardText,BarChart, Hr } from 'react-bootstrap-icons'
import { usePagination } from 'use-pagination-firestore';
import Cookies from 'universal-cookie';

function Sessions() {
 


  const cookie = new Cookies()
  const user=cookie.get('useraidt')

  const [modalShow, setModalShow]=useState(false);
  const [modalData, setModalData]= useState([]);
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

    const DeleteSes=async({id})=>{
      const delref=doc(db, 'Users',user,'Sessions',id)
      await deleteDoc(delref)
      console.log('deleted');
      setModalShow(false)
    }


  return (
    

    <div className='Page'>
      <Sidebar
       L1={<Button variant='dark' onClick={()=>nav(`/Dashboard/${user}`)}><Speedometer/></Button>}
       L2={<Button variant='dark' onClick={()=>nav(`/Sessions/${user}`)}><CardText/></Button>}
       L3={<Button variant='dark' onClick={()=>nav(`/Trends/${user}`)}><BarChart/></Button>}
       L4={<Button variant='dark' onClick={()=>nav(`/Scopes/${user}`)}><Hr/></Button>}/>



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
                <div>
                  <Card style={{background:'black' , display:'flex', width:'100%', marginBottom:'20px', fontWeight:'lighter', padding:'15px', cursor:'pointer'}} onClick={()=>{setModalShow(true); setModalData(rec) }}>
                    <Row>
                      <Col xs={6}> <h3 style={{fontWeight:'400', fontSize:'20px'}}>{rec.subject}</h3></Col>
                      <Col > <h3 style={{fontWeight:'400', fontSize:'20px'}}>{rec.WorkTime} Minutes</h3></Col>
                      <Col > <h3 style={{fontWeight:'400', fontSize:'20px'}}>{rec.BreakTime} Minutes</h3></Col>
                      <Col > <h3 style={{fontWeight:'400', fontSize:'20px'}}>{rec.time}</h3></Col>

                  
                  

                    </Row>
         
                  </Card>

                  <Modal
                  className="special_modal"
                      
                      show={modalShow}
                       size="lg"
                       aria-labelledby="contained-modal-title-vcenter"
                       onHide={()=>{setModalShow(false)}}
                       centered>
                    <Modal.Header closeButton>
                    <Modal.Title  id="contained-modal-title-vcenter" style={{marginRight:'70%'}}>
                     Session
                    </Modal.Title>
                    <Button variant='danger' onClick={()=>{DeleteSes({id: modalData.id})}}>Delete</Button>
                    </Modal.Header>
                     <Modal.Body>
                       <h4 style={{fontWeight:'bold', fontSize:'20px'}}>Subject: </h4>
                       <h4  style={{fontWeight:'400', fontSize:'20px'}}>{modalData.subject}</h4>
                       <h4 style={{fontWeight:'bold', fontSize:'20px'}}>Work Time: </h4>
                       <h4 style={{fontWeight:'400', fontSize:'20px'}}>{modalData.WorkTime} minutes</h4>
                       <h4 style={{fontWeight:'bold', fontSize:'20px'}}> Break Time: </h4>
                       <h4 style={{fontWeight:'400', fontSize:'20px'}}>{modalData.BreakTime} minutes</h4>
                       <h4 style={{fontWeight:'bold', fontSize:'20px'}}>Date: </h4>
                        <h4 style={{fontWeight:'400', fontSize:'20px'}}>{modalData.time}</h4>
                       <h4 style={{fontWeight:'bold', fontSize:'20px'}}>Rating: </h4>
                        <h4 style={{fontWeight:'400', fontSize:'20px'}}>{modalData.rating}⭐</h4>
                       <h5 style={{fontWeight:'bold', fontSize:'20px'}}>Description:</h5>
                       <p style={{fontWeight:'400', fontSize:'15x', padding:'10px', backgroundColor:'light-gray'}}>{modalData.description}</p>
                     </Modal.Body>
                     </Modal>

              
                </div>
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