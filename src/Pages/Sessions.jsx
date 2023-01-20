import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../Components/Sidebar'
import { collection, orderBy, query, doc, deleteDoc} from 'firebase/firestore';

import './Page.css';
import {Button, Card, Row, Col, Modal} from 'react-bootstrap';
import { db } from '../firebaseConfig';
import {Speedometer,CardText,BarChart, Hr, Journals, Bullseye } from 'react-bootstrap-icons'
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
        limit: 9
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
        L1={<Button variant='light-outline' onClick={()=>nav(`/Dashboard/`)}><Speedometer style={{color:'white'}}/></Button>}
        L2={<Button variant='light-outline' onClick={()=>nav(`/Sessions/`)}><Journals style={{color:'white'}}/></Button>}
        L3={<Button variant='light-outline' onClick={()=>nav(`/Trends/`)}><BarChart style={{color:'white'}}/></Button>}
        L4={<Button variant='light-outline' onClick={()=>nav(`/Scopes/`)}><Bullseye style={{color:'white'}}/></Button>}/>

   


        <div className="bod1">
       

          <div className="Recent" >
          <h1 style={{marginBottom:'10px', fontSize:'23px', marginLeft:'20px', color:'lightgray'}}>Your Sessions:</h1>
         
          {items.map((rec)=>{
              return(
                <div>
                  <Card style={{background:'RGB(12,12,12)' , display:'flex', width:'100%', marginBottom:'20px', fontWeight:'lighter', padding:'15px', cursor:'pointer',color:'lightgray'}} onClick={()=>{setModalShow(true); setModalData(rec) }}>
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
                    <Modal.Header closeButton closeVariant='white'>
                    <Modal.Title  id="contained-modal-title-vcenter" style={{marginRight:'70%'}}>
                     Session
                    </Modal.Title>
                    <Button variant='danger' onClick={()=>{DeleteSes({id: modalData.id})}}>Delete</Button>
                    </Modal.Header>
                     <Modal.Body>
                     <div className="subject" style={{backgroundColor:'rgb(12,12,12)',padding:'10px', borderRadius:'10px', margin:'10px'}}>
                      <h4 style={{fontWeight:'bold', fontSize:'20px',color:'lightgray'}}>Subject: </h4>
                       <h4  style={{fontWeight:'400', fontSize:'20px',color:'lightgray'}}>{modalData.subject}</h4>
                      </div>
                       <div className="times"  style={{backgroundColor:'rgb(12,12,12)',padding:'10px', borderRadius:'10px', margin:'10px'}}>
                       <h4 style={{fontWeight:'bold', fontSize:'20px',color:'lightgray'}}>Work Time: </h4>
                       <h4 style={{fontWeight:'400', fontSize:'20px',color:'lightgray'}}>{modalData.WorkTime} minutes</h4>
                       <h4 style={{fontWeight:'bold', fontSize:'20px',color:'lightgray'}}> Break Time: </h4>
                       <h4 style={{fontWeight:'400', fontSize:'20px',color:'lightgray'}}>{modalData.BreakTime} minutes</h4>
                       </div>
                       <div className="date"  style={{backgroundColor:'rgb(12,12,12)',padding:'10px', borderRadius:'10px', margin:'10px'}}>
                       <h4 style={{fontWeight:'bold', fontSize:'20px',color:'lightgray'}}>Date: </h4>
                        <h4 style={{fontWeight:'400', fontSize:'20px',color:'lightgray'}}>{modalData.time}</h4>
                       </div>
                      <div className="rating"  style={{backgroundColor:'rgb(12,12,12)',padding:'10px', borderRadius:'10px', margin:'10px'}}>
                      <h4 style={{fontWeight:'bold', fontSize:'20px',color:'lightgray'}}>Rating: </h4>
                        <h4 style={{fontWeight:'400', fontSize:'20px',color:'lightgray'}}>{modalData.rating}⭐</h4>
                      </div>
                       <div className="desc" style={{backgroundColor:'rgb(12,12,12)',padding:'10px', borderRadius:'10px', margin:'10px'}}>
                       <h5 style={{fontWeight:'bold', fontSize:'20px',color:'lightgray'}}>Description:</h5>
                       <p style={{fontWeight:'400', fontSize:'15x', padding:'10px', backgroundColor:'light-gray'}}>{modalData.description}</p>
                       </div>
                     </Modal.Body>
                     </Modal>

              
                </div>
              )
            })}
         
          </div>
          <div style={{marginLeft:'50%'}}>
          <Button  variant='dark'  onClick={getPrev} disabled={isStart} style={{margin:'10px',color:'lightgray'}} >Previous </Button>
          <Button variant='dark' onClick={getNext} disabled={isEnd}  style={{margin:'10px',color:'lightgray'}}>Next</Button>
          </div>
        </div>
    </div>
  )
}

export default Sessions