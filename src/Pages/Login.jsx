import React, { useEffect, useState } from 'react'

import {auth, db, provider} from '../firebaseConfig';
import {browserLocalPersistence, setPersistence, signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import {doc, getDoc, updateDoc} from 'firebase/firestore';
import {Alert, Button, Card, Form, Modal, ListGroup, Col,Row, Container, Navbar} from 'react-bootstrap'
import {Google, Textarea} from 'react-bootstrap-icons';
import Cookies from 'universal-cookie';
import improvr from '../Assets/improrvr dark.png'
import TsCs from '../Components/TsCs';
import PP from '../Components/PP';


function Login() {
  let nav= useNavigate();
  const goDash=()=>{
    nav('/Dashboard')
  }
  const [errShow, setErrShow ]=useState(false);
  
  const [type, setType]= useState('');
  const [userData, setUserData]= useState([])
  const [signDis, setSignDis]= useState(true);
  const [email, setEmail]= useState('');
  const [password, setPassword]=useState('');
  const [errMessage, setErrMessage]= useState('');
  const [TCshow, setTCshow]=useState(false)
  const [PPshow, setPPshow]= useState(false);

  const nextYear = new Date();

  nextYear.setFullYear(nextYear.getFullYear() + 1);

  useEffect(()=>{
    
    const cookie= new Cookies()
    const user= cookie.get('useraidt')
    if(user){
      nav(`/Dashboard/`)
    }
  })

  const signInG=async()=>{
    setPersistence(auth,browserLocalPersistence).then(async ()=>{
      const result = await signInWithPopup(auth, provider)
      const ref = doc(db, 'Users', result.user.uid);
      
      await getDoc(ref).then((snapshot)=>{
        if(snapshot.exists() && snapshot.data().subscription==='active'){
          const cookie = new Cookies();
          cookie.set('useraidt', result.user.uid, {expires:  nextYear, path:'improvr.nitrondigital.com'},);
          localStorage.setItem('isAuth', true)
          window.location.pathname='/Dashboard';
        }else if (!snapshot.exists()){
          setErrShow(true)
        }else if (snapshot.data().subscription==='inactive'){
          setErrShow(true)
         

        }
      })

      
 
    
      
      })
      
      
    }

    const signInEP=async()=>{
      setPersistence(auth,browserLocalPersistence).then(async()=>{
        signInWithEmailAndPassword(auth,email,password).then(async (result)=>{
          const ref = doc(db, 'Users', result.user.uid);
      
      await getDoc(ref).then((snapshot)=>{
        if(snapshot.exists() && snapshot.data().subscription==='active'){
          const cookie = new Cookies();
          cookie.set('useraidt', result.user.uid, {expires:  nextYear, path:'improvr.nitrondigital.com'},);
          localStorage.setItem('isAuth', true)
          nav(`/Dashboard/`);
        }else if (!snapshot.exists()){
          setErrShow(true)
          setErrMessage('This account does not exist')
        }else if (snapshot.data().subscription==='inactive'){
          setErrShow(true)
          setErrMessage('This account is no longer active')
         

        }
      })
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrShow(true)
          setErrMessage('This Email is already in use or is not entered correctly')
        }
          )
      })
    }



    


   
  
 
  return (
    
    <div>
      
      <Container style={{display:'grid', placeItems:'center', backgroundImage:'radial-gradient(circle, rgba(244,250,255,1) 0%, rgba(183,191,242,1) 50%, rgba(255,255,255,1) 100%)', padding:'0%', margin:'0%', height:'100vh'}} fluid={true}>
    
    <Card  style={{paddingTop:'40px',height:'400px', width:'360px', padding:'10px', margin:'20px', justifyContent:'center', alignItems:'center', boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',backdropFilter: 'blur( 50px )', background:'rgba( 255, 255, 255, 0.25 )', borderRadius:'20px', textAlign:'center'}}>
    
      <Card.Title style={{color:'#282b2e', marginTop:'10px'}}>Log In</Card.Title>
    <Card.Body>
    <Form>
    <Form.Group>
      
     
      <Button variant='primary' style={{marginTop:'5px', width:'300px'}} onClick={signInG}>Sign In with Google <Google/></Button>
      <p style={{marginTop:'10px'}}>OR</p>

      <Form>
      <Form.Control type='email' placeholder='Email' onChange={(e)=>{setEmail(e.target.value); if(email==='' || password===''){setSignDis(true)}else{setSignDis(false)}}}/>
      <Form.Control type='password' placeholder='Password' style={{marginTop:'5px'}} onChange={(e)=>{setPassword(e.target.value);if(email==='' || password===''){setSignDis(true)}else{setSignDis(false)} }}/>
      
      <Button variant='dark' disabled={signDis} style={{marginTop:'5px', width:'100%'}} onClick={()=>{ signInEP()}}>Sign In</Button>
     </Form>

      {errShow && <Alert style={{marginTop:'5px',}} variant='danger'>{errMessage}</Alert>}
   
      
    </Form.Group>
    </Form>
    </Card.Body>
   <p style={{textDecoration:'underline', color:'grey', cursor:'pointer' }} onClick={()=>{nav('/SignUp')}}>or go to Sign Up</p>

    

   
    
  </Card>
  

       <div style={{display:'flex', flexDirection:'column', placeItems:'center', margin:'0', bottom:'0', position:'absolute'}}>
       <img src={improvr}
      height='30px'
      width={'120px'}
      style={{
        marginBottom:'15px'
      }}
      
      className='d-inline-block align-top'
       />
       <div style={{display:'flex', marginTop:'10px'}}>
        <p style={{marginRight:'20px', textDecoration:'underline', color:'gray', cursor:'pointer'}} onClick={()=>{setTCshow(true)}}>Terms & Conditions</p>
        <p style={{marginRight:'20px', textDecoration:'underline', color:'gray', cursor:'pointer'}} onClick={()=>{setPPshow(true)}}>Privacy Policy</p>
        
       </div>
       <p style={{marginRight:'20px',  color:'gray'}}>All Rights belong to Nitron Digital</p>
       </div>

      
  
  </Container>
  <Modal
       className="special_modal"
       breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
       minBreakpoint="xxs"
         show={TCshow}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          onHide={()=>{setTCshow(false)}}
          style={{color:'lightgray'}}
          centered>
             <Modal.Header closeButton closeVariant='white'>Terms and Conditions</Modal.Header>
             <Modal.Body>
              <TsCs/>
             </Modal.Body>

       </Modal>
       <Modal
       className="special_modal"
       breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
       minBreakpoint="xxs"
         show={PPshow}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          onHide={()=>{setPPshow(false)}}
          style={{color:'lightgray'}}
          centered>
             <Modal.Header closeButton closeVariant='white'>Privacy Policy</Modal.Header>
             <Modal.Body>
              <PP/>
             </Modal.Body>

       </Modal>
      
    </div>
  )
  }

export default Login