import React from 'react'
import './Login.css';
import {auth, db, provider} from '../firebaseConfig';
import {browserLocalPersistence, setPersistence, signInWithPopup} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {doc} from 'firebase/firestore';
import {Button, Form} from 'react-bootstrap'
import {Google} from 'react-bootstrap-icons';
import Cookies from 'universal-cookie';

function Login() {
  let nav= useNavigate();

  const signIn=()=>{
    setPersistence(auth,browserLocalPersistence).then(()=>{
      signInWithPopup(auth, provider).then(async(result)=>{
        const ref = doc(db, 'Users', result.user.uid) 
        
        const cookie= new Cookies();
        cookie.set('useraidt', result.user.uid);
        const user=cookie.get('useraidt')
        nav(`/Dashboard/${user}`)
        
        
      })})
    }
   
  
 
  return (
    <div className="logBox">
      <div className='LoginCont'>
      <Form>
      <Form.Group>
        <Form.Label style={{fontSize:'35px', fontWeight:'bold', marginBottom:'20px'}}>
          Log in
        </Form.Label><br/>
       
        <Button variant='dark'  onClick={signIn}>Sign In with Google <Google/></Button>
     
        
      </Form.Group>
      </Form>
  
     
      
    </div>
    </div>
  )
  }

export default Login