import React, { useState, useEffect} from 'react';

import {auth, db, provider} from '../firebaseConfig';
import {browserLocalPersistence, setPersistence, signInWithPopup} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, doc, getDoc, setDoc} from 'firebase/firestore';
import { Alert, Button, Card, CardGroup, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import {Google} from 'react-bootstrap-icons';

import Cookies from 'universal-cookie';



function SignUp() {

 
  const [modalShow, setModalShow]= useState(false);
  const [payShow, setPayShow]=useState(false);
  const [firstSub, setFirstSub] = useState('');
  const [firstSubErr, setFirstSubErr]=useState(null);
  const [disabled, setDisabled]=useState(true);
  const [errShow, setErrShow]= useState(false);
  const [userData, setUserData]= useState([])

  const cookie= new Cookies();

  let nav= useNavigate();
 

  const nextYear = new Date();

  nextYear.setFullYear(nextYear.getFullYear() + 1);



  const createSes=async()=>{

     const docref = doc(db, 'Users',userData.uid)
        
   
     
        await setDoc(docref, {username: userData.displayName, tier: 'Pro', email: userData.email}).then(async ()=>{
          const ref= collection(db,'Users',userData.uid,'Sessions');
          const subref= collection(db, 'Users',userData.uid,'Subjects');
          const Scoperef= collection(db,'Users',userData.uid,'Scopes')
          
           // Adds a doc to the collection of Sessions and names it subjects with the description subjects
          await setDoc(doc(subref,'SubjectsList'),{subjects:[firstSub]});
          await addDoc(ref,{subject: 'example', WorkTime: 45, BreakTime: 15, description:'this is an example session', rating:4, time:'example date'})
          await addDoc(Scoperef,{title:'example document', description:'This is an example document of the scopes functions'})
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
            setPayShow(true)
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
    <div style={{display:'grid', placeItems:'center', background:'rgb(41,44,51)', padding:'0%', margin:'0%', height:'100vh'}} >
      <Card   style={{height:'250px', width:'300px', padding:'10px', margin:'20px', justifyContent:'center', alignItems:'center', backgroundColor:'rgb(192,192,192)'}}>
      <Card.Title>Sign Up</Card.Title>
      <Card.Body>
      <Button  variant='dark' onClick={signUp} >Sign Up with Google <Google/></Button>
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

    <Modal
       show={payShow}
       onHide={()=>{setPayShow(false)}}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      className="special_modal"
      
      centered>
      <Modal.Header closeButton closeVariant='white'>
        <Modal.Title  id="contained-modal-title-vcenter">
          Welcome to Improvr! Subscribe to get Started!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          <Row>
              
              <Col>
              
              <Card style={{height:'90%', width:'100%', marginTop:'20px', background:'linear-gradient(180deg, #3277a8,#2a5991)', color:'white', paddingBottom:'10px',padding:'10px', textAlign:'center'}}>
                <Card.Title>Monthly</Card.Title>
                <Card.Body>
                  <h1></h1>



                </Card.Body>
              </Card>
              </Col>
              <Col>
             
              </Col>

           
          </Row>
        </Container>
        
      </Modal.Body>
      <Modal.Footer>
       
      </Modal.Footer>
    </Modal>
    </Card>
    </div>
  )
}

export default SignUp