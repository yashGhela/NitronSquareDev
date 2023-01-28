import React, { useEffect, useState } from 'react'

import {auth, db, provider} from '../firebaseConfig';
import {browserLocalPersistence, setPersistence, signInWithPopup} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {doc, getDoc} from 'firebase/firestore';
import {Alert, Button, Card, Form} from 'react-bootstrap'
import {Google} from 'react-bootstrap-icons';
import Cookies from 'universal-cookie';


function Login() {
  let nav= useNavigate();
  const [errShow, setErrShow ]=useState(false);

  const nextYear = new Date();

  nextYear.setFullYear(nextYear.getFullYear() + 1);

  useEffect(()=>{
    const cookie= new Cookies()
    const user= cookie.get('useraidt')
    if(user){
      nav(`/Dashboard/`)
    }
  })

  const signIn=async()=>{
    setPersistence(auth,browserLocalPersistence).then(async ()=>{
      const result = await signInWithPopup(auth, provider)
      const ref = doc(db, 'Users', result.user.uid);
      await getDoc(ref).then((snapshot)=>{
        if(snapshot.exists()){
          const cookie = new Cookies();
          cookie.set('useraidt', result.user.uid, {expires:  nextYear, path:'/'},);
          localStorage.setItem('isAuth', true)
          nav(`/Dashboard/`);
        }else{
          setErrShow(true)
        }
      })

      
 
    
      
      })
      
      
    }
   
  
 
  return (
    <div style={{display:'flex', placeItems:'center', backgroundColor:'rgb(41,44,51)', padding:'0%', margin:'0%', height:'100vh'}}>
     
      <Card  style={{height:'250px', width:'300px', padding:'10px', margin:'20px', justifyContent:'center', alignItems:'center', backgroundColor:'rgb(192,192,192)'}}>
        <Card.Title>Welcome back! Please Log In</Card.Title>
      <Card.Body>
      <Form>
      <Form.Group>
        
       
        <Button variant='dark'  onClick={signIn}>Sign In with Google <Google/></Button>

        {errShow && <Alert style={{marginTop:'5px',}} variant='danger'>This Account does not exist</Alert>}
     
        
      </Form.Group>
      </Form>
      </Card.Body>
  
     
      
    </Card>
    </div>
  )
  }

export default Login