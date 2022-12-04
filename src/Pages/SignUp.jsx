import React, { useState, useEffect} from 'react';
import './Login.css';
import {auth, db, provider} from '../firebaseConfig';
import {browserLocalPersistence, setPersistence, signInWithPopup} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, doc, setDoc} from 'firebase/firestore';
import { Button, Form, Modal } from 'react-bootstrap';
import {Google} from 'react-bootstrap-icons';

import Cookies from 'universal-cookie';



function SignUp() {

 
  const [modalShow, setModalShow]= useState(false);
  const [firstSub, setFirstSub] = useState('');
  const [firstSubErr, setFirstSubErr]=useState(null);
  const [disabled, setDisabled]=useState(true);

  const cookie= new Cookies();

  let nav= useNavigate();


  const createSes=async({user})=>{
    const ref= collection(db,'Users',user,'Sessions');
    
     // Adds a doc to the collection of Sessions and names it subjects with the description subjects
    await setDoc(doc(ref,'SubjectsList'),{subjects:[firstSub]});
    const cuser=cookie.get('useraidt');
    nav(`/Dashboard/${cuser}`)
  }

  const signUp=async ()=>{  //to put it simpy once a user signs up they'll be added to the database and then sent to add more subjects to sessions
    setPersistence(auth, browserLocalPersistence).then(()=>{
      return signInWithPopup(auth, provider).then(async(result)=>{
        const ref = doc(db, 'Users', result.user.uid)
        const docRef = await setDoc(ref, {username: result.user.displayName,tier: 'free'});
       
        cookie.set('useraidt', result.user.uid);
        
        
        setModalShow(true);
      })
    })
  }

  useEffect(()=>{
   
    setDisabled(formValidation());
   
 },[])

  const formValidation = () =>{  //checks for errors
    if (firstSub ===''){
      setFirstSubErr('Subject cannot be blank');
      return true

    }else{
      setFirstSubErr(null);
      return false
    }}

    const user=cookie.get('useraidt')
  return (
    <div className="logBox">
      <div className='LoginCont'>
      <h1>Sign Up:</h1>
      <Button  variant='dark' onClick={signUp} >Sign Up with Google <Google/></Button>
      

      <Modal
       show={modalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      
      centered>
      <Modal.Header>
        <Modal.Title  id="contained-modal-title-vcenter">
          Please Add Your First Subject
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label>Subject Name:</Form.Label>
          <Form.Control placeholder='Algebra' onChange={(e)=>{setFirstSub(e.target.value);if(e.target.value===''){setDisabled(true)} else{setDisabled(false)}}} style={{marginBottom:'20px'}}/>
          <Button onClick={()=>{createSes({user:user})}} disabled={disabled} style={{marginBottom:'20px'}}>Let's Go!</Button>
        {firstSubErr&&<h3 style={{color:'red', fontSize:'14px'}}>Please input a subject name</h3>}
        </Form>
      </Modal.Body>
      <Modal.Footer>
       <h4>Don't worry, you can add more subjects later 🙂</h4>
      </Modal.Footer>
    </Modal>
    </div>
    </div>
  )
}

export default SignUp