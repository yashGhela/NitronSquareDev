import React from 'react'
import { useState } from 'react';
import {Alert, Accordion, Button, Card, Col, Form, Modal, Row ,Container, FormControl, Image, FormCheck, CloseButton, ButtonGroup,Badge} from 'react-bootstrap';
import { BarChart, BoxArrowLeft, Bullseye, CameraVideoFill, Check, CloudDrizzle, Fire, ImageAlt, ListTask, Moon, MusicNoteBeamed, Pause, Play, Spotify, StopFill, Stopwatch, Tree, Water, Wind, Youtube } from 'react-bootstrap-icons';
import treeS from '../Assets/Nitron Music/Forrest Sounds.mp3'
import { Line } from 'react-chartjs-2';
import seaS from '../Assets/Nitron Music/Ocean Sounds.mp3'
import RainS from '../Assets/Nitron Music/Rain Sounds.mp3'
import NightS from '../Assets/Nitron Music/Night Sounds.mp3'
import WindS from '../Assets/Nitron Music/Wind Sounds.mp3'
import FireS from '../Assets/Nitron Music/Campfire Sounds.mp3'
import AlarmS from '../Assets/Alarm.mp3'
import { AddToDo, CompleteToDo, movetask, movetaskBack, newTassk } from '../Util/functions';

import Cookies from 'universal-cookie';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const cookie = new Cookies()
const user=cookie.get('useraidt');
const paidt= cookie.get('PAIDT');





function TrendsModal({show, setShow, userData, subject}) {
  return (
    <div className="chart">
   <Modal className='timer-modal'
     show={show}
     onHide={()=>{setShow(false)}}
     
     style={{background:'none'}}
     >
      <Modal.Header closeButton closeVariant='white'>
        Quick Trends
      </Modal.Header>
      <Modal.Body>
        <h4>Trends for {subject}</h4>
        <div style={{width:400, margin: '20px', display: 'flex'}}> 
        <Line data={userData} />

        </div>

      </Modal.Body>

    </Modal>
   </div>
  )
}



function ScopesModal({scopeList, show, setShow, newTask, setNewTask}) {
  return (
    <div>
        <Modal className='timer-modal'
     show={show}
     onHide={()=>{setShow(false)}}
     
     style={{background:'none'}}
     >
      <Modal.Header closeButton closeVariant='white'>
        Quick Projects
      </Modal.Header>
      <Modal.Body>
        {scopeList.map((scop)=>{
          return(
            <Accordion  style={{background:'#17181a', borderRadius:'10px', marginBottom:'10px', border:'2px solid #393d40' }}  className='special_modal'>
              <Accordion.Header >
                {scop.title}
              </Accordion.Header>
              <Accordion.Body>
              <h1  style={{fontWeight:'bold', backgroundColor:'RGB(12,12,12)', padding:'10px', margin:'10px', borderRadius:'10px' ,color:'lightgray', border:'2px solid #393d40' }}>{scop.title}</h1>
                     
                     <p style={{fontWeight:'400', backgroundColor:'RGB(12,12,12)', padding:'10px', margin:'10px', borderRadius:'10px' ,fontWeight:'lighter', fontSize:'20px',color:'lightgray', border:'2px solid #393d40' }}>Description:<br/>{scop.description} minutes</p>
                     
                     <div className="mbod">
                      

                       <div className="Incomplete" style={{backgroundColor:'RGB(12,12,12)', padding:'10px', margin:'10px', borderRadius:'10px' ,color:'lightgray', border:'2px solid #393d40' }}>
                       <h3>Incomplete:</h3>
                       <div style={{display:'inline'}}>
                          <Form style={{display:'flex', marginBottom:'10px'}}>
                             <Form.Control className='special_modal' placeholder='Add a Task' style={{width:'80%'}} onChange={(e)=>{setNewTask(e.target.value)}}/>
                             <Button style={{marginLeft:'10px'}} onClick={()=>{newTassk({id:scop.id, newTask:newTask});scop.incomplete.push(newTask)}}>Add</Button>
                           </Form>
                          </div>

                             {scop.incomplete?.map((inc)=>{
                       return(
                         <div className="list">

                           <Button  variant="secondary"  value={inc}  style={{marginRight:'5px', marginBottom:'5px'}} onClick={()=>{
                           movetask({id:scop.id, task:inc}); 
                           var del= scop.incomplete.indexOf(inc); 
                       
                           scop.incomplete.splice(del,1);
                            scop.complete.push(inc)}}><Check/></Button>
                           <label style={{marginBottom: '5px'}}>{inc}</label><br/>

                         </div >
                       )
                     })}
                       </div>

                       <div className="Complete"  style={{backgroundColor:'RGB(12,12,12)', padding:'10px', margin:'10px', borderRadius:'10px' ,color:'lightgray', border:'2px solid #393d40' }}>
                       <h3>Complete:</h3>
                       {scop.complete?.map((comp)=>{
                       return(
                         <div className="list">

                         
                           <Button  variant="secondary" value={comp}  style={{marginRight:'5px', marginBottom:'5px'}} onClick={()=>{
                            movetaskBack({id:scop.id, task:comp}); 
                              var del = scop.complete.indexOf(comp);
                              scop.complete.splice(del,1)
                               scop.incomplete.push(comp)}}><Check/></Button>
                           <label style={{marginBottom: '5px'}}>{comp}</label><br/>
                         
                           

                         </div >
                       )
                     })}
                       </div>
                 
                    

                   
                        


                            
                       
                     </div>
              </Accordion.Body>

            </Accordion>
          )
        })}

      </Modal.Body>

    </Modal>
    </div>
  )
}





function SessionTasks({show,setShow,setToDo,toDo,ToDoList, finlist, setToDoList, setFinlist}){
  const addToDo=({i})=>{
    setToDoList(prev=>[...prev,i])
  }

  const CompleteToDo=({i})=>{
    setFinlist(prev=>[...prev,i])
    var del = ToDoList.indexOf(i)
    ToDoList.splice(del,1)
  }

  

  return(
    <Modal
    className='timer-modal '
    show={show}
    onHide={()=>{setShow(false)}}
    >
      <Modal.Header closeButton closeVariant='white'>Session Tasks:</Modal.Header>
      <Modal.Body>
      <Form style={{display:'flex', padding:'20px'}}>
       <FormControl value={toDo} style={{width:'80%', marginRight:'15px',backdropFilter: 'blur( 2px )', background:'rgba( 255, 255, 255, 0.25 )',}} onChange={(e)=>{setToDo(e.target.value)}}/>
       <Button onClick={()=>{addToDo({i:toDo});console.log(ToDoList); setToDo('')}} variant='outline-light'>Add! </Button>
     </Form>
     <hr/>
     {ToDoList.map((todo)=>{
       return(
         <Card 
         style={{backdropFilter: 'blur( 2px )', background:'rgba( 255, 255, 255, 0.25 )', display:'flex', marginBottom:'20px', fontWeight:'lighter', padding:'15px', cursor:'pointer',color:'#282b2e', border:'2px solid #b1b4b5' }} 
         
         breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
         minBreakpoint="xxs">
          <Row>
           <Col>
           <h3 style={{fontWeight:'400', fontSize:'20px'}}>{todo}</h3></Col>
           
           <Col><Button  variant="secondary"  onClick={()=>{
             CompleteToDo({i:todo});}} style={{float:'right'}} ><Check/></Button></Col>
          </Row>
       
           </Card>
        
         
       )
     })}
      </Modal.Body>
    </Modal>
  )
}



function Notice({show,setShow, update}){

  

  
 return(
  <Modal
  className='special_modal'
  centered
  show={show}
  onHide={()=>{setShow('false')}}
  >
    <Modal.Header>Thanks for supporting us!</Modal.Header>
    <Modal.Body>
      <h1>Hi there loyal user!</h1>
      <p>Thanks for supporting us in our early days! <br/> 
        Thanks to your support Improvr is officially out of beta!<br/>
        This means that Improvr will no longer have a free mode <br/>
        however, for supporting us we've given you Improvr for free, FOREVER!
        We look forward to hearing more from you!
      </p>
    </Modal.Body>
    <Modal.Footer>
      <Button style={{width:'100%'}} onClick={()=>{update()}}>Got it!</Button>
    </Modal.Footer>


  </Modal>
 )
}















export   {
    TrendsModal,
    Notice, 
    ScopesModal,
    
    SessionTasks
  
    
    
    
}