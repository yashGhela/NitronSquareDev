
import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import ReactSlider from 'react-slider';
import './SesSettings.css';
import { Button, Form, Modal } from 'react-bootstrap';
import {arrayUnion, doc,  getDoc, updateDoc} from 'firebase/firestore'
import {db} from '../firebaseConfig';




function SesSettings() {

  const [workMinutes, setWorkMinutes] = useState(45);//sets work minutes
  const [breakMinutes, setBreakMinutes] = useState(15);//sets break minutes
  const [subject, setSubject] = useState('');//sets the subject for the user

  const [modalShow, setModalShow]= useState(false);
  const [isCheckederr, setIsCheckederr]=useState('');
  const [disabled, setDisabled]=useState(true);
  const [subjectList, setSubjectList] =useState([]);
  const [subj, setSub]=useState('');
  const [disabledM, setDisabledM]= useState(true)
  const [suberr, setSuberr]=useState(null);
  const user= sessionStorage.getItem('useraidt');
  const subref=doc(db,'Users',user,'Sessions','SubjectsList')
  
 
  const docSnap = async()=>
  
  await getDoc(subref).then(docSnap=>{
    let subData=[];
    if(docSnap.exists()){
      console.log(docSnap.data())
      subData= docSnap.data().subjects 
      console.log(subData);
      
    }else{
      console.log('null');
    }
    setSubjectList(subData)

    
  })

  const newSub=async()=>{
    await updateDoc(subref, {
      subjects: arrayUnion(subj)
    });
    setModalShow(false);
  }
 
  

  let nav = useNavigate();

  
  useEffect(()=>{
   
     
     docSnap();
    formValidation()
    
  },[])

  const formValidation = () =>{  //checks for errors
    if (subj===''){
      setSuberr('Subject cannot be blank');
      return true

    }else{
      setSuberr(null);
      return false
    }}
  


 
  return (
    <div className='SesPage'>
      <div className="SeSSettings">
      <h1>Pick a Time:</h1>
      <label>Work Minutes: {workMinutes}:00</label>
      <ReactSlider 
      className='slider'
      thumbClassName='thumb'
      trackClassName='track'
      value={workMinutes}
      onChange={newValue => setWorkMinutes(newValue)}
      min={1}
      max={120}
      
      
      />

      <label>Break Minutes: {breakMinutes}:00</label>
      <ReactSlider 
      className='slider green'
      thumbClassName='thumb'
      trackClassName='track'
      value={breakMinutes}
      onChange={newValue => setBreakMinutes(newValue)}
      min={1}
      max={120}
      
      
      />

      <div className="SubjectChoices">
        <h1>Pick A Subject:</h1>
        {subjectList.map((sub)=>{
          

            return(
              <div className="list">
               
              <input type="checkbox" value={sub} onClick={(e)=>{setSubject(e.target.value); if(e.target.checked){setDisabled(false)} else{setDisabled(true)}}} style={{marginRight:'5px', marginBottom:'5px'}}/>
              <label style={{marginBottom: '5px'}}>{sub}</label><br/>
            
              </div>
          )
          
          })}
        {isCheckederr&&<h3 style={{color:'red'}}>Please choose a subject</h3>}
        <Button onClick={()=>{setModalShow(true)}}>Add a Subject</Button>
      </div>

      <Modal
       show={modalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      onHide={()=>setModalShow(false)}
      centered>
      <Modal.Header closeButton>
        <Modal.Title  id="contained-modal-title-vcenter">
          Please Add Your First Subject
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label>Subject Name:</Form.Label>
          <Form.Control placeholder='Algebra' onChange={(e)=>{setSub(e.target.value);if(e.target.value===''){setDisabledM(true)} else{setDisabledM(false)}}} style={{marginBottom:'20px'}}/>
          <Button onClick={newSub} disabled={disabledM} style={{marginBottom:'20px'}}>Let's Go!</Button>
        {suberr&&<h3 style={{color:'red', fontSize:'14px'}}>Please input a subject name</h3>}
        </Form>
      </Modal.Body>
      <Modal.Footer>
       <h4 style={{fontSize:'15px', fontWeight:'400'}}>Don't worry, you can add more subjects later 🙂</h4>
      </Modal.Footer>
    </Modal>

  

      </div>
      
      <Button variant='primary' style={{width:'100px', color:'white',marginLeft:'20px', marginBottom:'10px' }} onClick={()=>{nav(`/Timer/${user}`, {state:{workMinutes: workMinutes, breakMinutes: breakMinutes, subject: subject}})}} disabled={disabled}> Start Your Session!</Button>
      <Button variant='primary' style={{width:'100px', color:'white',marginLeft:'20px'}}  onClick={()=>{nav(`/Dashboard/${user}`)}}> Back</Button>
    </div>
  )
}

export default SesSettings