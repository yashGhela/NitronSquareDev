import React, { useEffect, useState } from 'react'

import {auth, db, provider} from '../firebaseConfig';
import {browserLocalPersistence, setPersistence, signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import {doc, getDoc, updateDoc} from 'firebase/firestore';
import {Alert, Button, Card, Form, Modal, ListGroup, Col,Row, Container, Navbar} from 'react-bootstrap'
import {Google, Textarea} from 'react-bootstrap-icons';
import Cookies from 'universal-cookie';
import improvr from '../Assets/improvr logo.png'
import TsCs from '../Components/TsCs';
import PP from '../Components/PP';
import { Helmet } from 'react-helmet';


function Login() {
  let nav= useNavigate();
 
  const bg='https://firebasestorage.googleapis.com/v0/b/nstudy-dev.appspot.com/o/Backgrounds%2FMountains%2Fkurt-cotoaga-cqbLg3lZEpk-unsplash.jpg?alt=media&token=f49d81dc-a14a-4f2e-8e63-ed07f1df4cd3'
 
 
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
          cookie.set('useraidt', result.user.uid, {expires:  nextYear, path:'/'},);
          if ( snapshot.data().type==='pro'){
            cookie.set('PAIDT', 'Tnf',{expires:  nextYear, path:'/'})
          }

          
      
          nav(`/Dashboard/`);
         
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
          cookie.set('useraidt', result.user.uid, {expires:  nextYear, path:'/'},);
          if (snapshot.data().type==='pro' || snapshot.data().tier==='pro'){
            cookie.set('PAIDT', 'Tnf',{expires:  nextYear, path:'/'})
          }
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
          setErrMessage('Password or Email is incorrect')
        }
          )
      })
    }



    


   
  
 
  return (
    
    <div>
       <Helmet>
          <title>Login | Improvr</title>
          <meta name='description' content='Pomodoro Timer by Nitron Digital. An effecient and simple Pomodoro app for focusing and studying'/>
      
      </Helmet>
      
      <Container style={{display:'grid', placeItems:'center', background: `url(${bg}) no-repeat`, padding:'0%', margin:'0%', height:'100vh'}} fluid={true}>
    
    <Card  style={{paddingTop:'40px',height:'400px', width:'360px', padding:'10px', margin:'20px', justifyContent:'center', alignItems:'center',  background:'#282b2e', borderRadius:'20px', textAlign:'center', border:'2px solid rgb(97, 149, 232)', color:'lightgray'}}>
    
      <Card.Title style={{color:'lightgray', marginTop:'10px'}}>Log In</Card.Title>
    <Card.Body>
    <Form>
    <Form.Group>
      
     
      <Button variant='primary' style={{marginTop:'5px', width:'300px'}} onClick={signInG}>Sign In with Google <Google/></Button>
      <p style={{marginTop:'10px'}}>OR</p>

      <Form>
      <Form.Control type='email' placeholder='Email' onChange={(e)=>{setEmail(e.target.value); if(email==='' || password===''){setSignDis(true)}else{setSignDis(false)}}}/>
      <Form.Control type='password' placeholder='Password' style={{marginTop:'5px'}} onChange={(e)=>{setPassword(e.target.value);if(email==='' || password===''){setSignDis(true)}else{setSignDis(false)} }}/>
      
      <Button variant='secondary' disabled={signDis} style={{marginTop:'5px', width:'100%'}} onClick={()=>{ signInEP()}}>Sign In</Button>
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
        <p style={{marginRight:'20px', textDecoration:'underline', color:'lightgray', cursor:'pointer'}} onClick={()=>{nav('/Ts&Cs')}}>Terms & Conditions</p>
        <p style={{marginRight:'20px', textDecoration:'underline', color:'lightgray', cursor:'pointer'}} onClick={()=>{nav('/PrivacyPolicy')}}>Privacy Policy</p>
        
       </div>
       <p style={{marginRight:'20px',  color:'lightgray'}}>All Rights belong to Nitron Digital</p>
       </div>

      
  
  </Container>

      
    </div>
  )
  }

export default Login