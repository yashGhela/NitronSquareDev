import React, { useState, useEffect} from 'react';

import {auth, db, provider} from '../firebaseConfig';
import {browserLocalPersistence, setPersistence, signInWithPopup} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, doc, getDoc, setDoc} from 'firebase/firestore';
import { Alert, Button, Card, CardGroup, Col, Container, Form, Modal, Row, ListGroup, Badge } from 'react-bootstrap';
import {Google} from 'react-bootstrap-icons';

import Cookies from 'universal-cookie';



function SignUp() {

 
  const [modalShow, setModalShow]= useState(false);
  const [payShow, setPayShow]=useState(false);
  const [firstSub, setFirstSub] = useState('');
  const [type, setType]= useState('');
  const [firstSubErr, setFirstSubErr]=useState(null);
  const [disabled, setDisabled]=useState(true);
  const [errShow, setErrShow]= useState(false);
  const [userData, setUserData]= useState([])
  const [subId, setSubId]= useState('')

  const cookie= new Cookies();

  let nav= useNavigate();

  
 
 

  const nextYear = new Date();

  nextYear.setFullYear(nextYear.getFullYear() + 1);



  const createSes=async()=>{

     const docref = doc(db, 'Users',userData.uid)
        
   
     
        await setDoc(docref, {username: userData.displayName, subscription: 'active',type: type, email: userData.email}).then(async ()=>{
          const ref= collection(db,'Users',userData.uid,'Sessions');
          const subref= collection(db, 'Users',userData.uid,'Subjects');
          
          
           // Adds a doc to the collection of Sessions and names it subjects with the description subjects
          await setDoc(doc(subref,'SubjectsList'),{subjects:[firstSub]});
          await addDoc(ref,{plec:'placeholder'})
          
          cookie.set('useraidt',userData.uid, {expires:  nextYear, path:'/'});
          localStorage.setItem('isAuth', true)
          console.log('added!')
         
          nav(`/Dashboard/`)

        });
       
     
    
  }

  const signUp=async ()=>{  //to put it simpy once a user signs up they'll be added to the database and then sent to add more subjects to sessions
    setPersistence(auth, browserLocalPersistence).then(()=>{
      return signInWithPopup(auth, provider).then(async(result)=>{
        
        
        setUserData(result.user)
        
        
        const setDoc = doc(db, 'Users',result.user.uid)
        
        await getDoc(setDoc).then((snapshot)=>{
          if(snapshot.exists()){
            setErrShow(true);
          }else{
            setModalShow(true)
          }
        })
        
      })
    })
  }

  useEffect(()=>{
   
    setDisabled(formValidation());
   
 },[])

  const formValidation = () =>{  //checks for errors
    if (firstSub ===''){
      setFirstSubErr(true);
      return true

    }else{
      setFirstSubErr(false);
      return false
    }}

    
  return (
    <div style={{display:'grid', placeItems:'center', background:'#17181a', padding:'0%', margin:'0%', height:'100vh'}} >
      <Card   style={{height:'250px', width:'300px', padding:'10px', margin:'20px', justifyContent:'center', alignItems:'center', backgroundColor:'rgb(192,192,192)'}}>
      <Card.Title>Sign Up</Card.Title>
      <Card.Body>
      <Button  variant='dark' onClick={()=>{ setType('free');signUp()}} >Sign Up with Google <Google/></Button>
      {errShow&&<Alert style={{marginTop:'5px'}} variant='danger'>This Account already exists</Alert>}
      </Card.Body>

      <Modal
       show={modalShow}
       onHide={()=>{setModalShow(false)}}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      className="special_modal"
      
      centered>
      <Modal.Header closeButton closeVariant='white'>
        <Modal.Title  id="contained-modal-title-vcenter">
          Welcome to Improvr! Let's add your first subject!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label>Subject Name:</Form.Label>
          <Form.Control placeholder='Algebra' onChange={(e)=>{setFirstSub(e.target.value);if(e.target.value===''){setDisabled(true); setFirstSubErr(true)} else{setDisabled(false); setFirstSubErr(false)}}} style={{marginBottom:'20px'}}/>
          <Button onClick={()=>{createSes()}} disabled={disabled} style={{marginBottom:'20px'}}>Let's Go!</Button>
        {firstSubErr&&<Alert variant='danger'>Please input a subject name</Alert>}
        </Form>
      </Modal.Body>
      <Modal.Footer>
       <p>Don't worry, you can add more subjects later 🙂</p>
      </Modal.Footer>
    </Modal>

   
    </Card>
    </div>
  )
}

export default SignUp