import React from 'react'
import './Login.css';
import {auth, db, provider} from '../firebaseConfig';
import {signInWithPopup} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {doc} from 'firebase/firestore';

function Login() {
  let nav= useNavigate();

  const signIn=()=>{
    signInWithPopup(auth, provider).then(async(result)=>{
      const ref = doc(db, 'Users', result.user.uid) 
      
      nav('/Dashboard', {state: {user: result.user.uid}});
      sessionStorage.setItem('isAuth', true);//sets isAuth to true allowing access to protected routes
      
      
    })
  }
 
  return (
    <div className="logBox">
      <div className='LoginCont'>
      <h1>Login:</h1>
      <button className='GoogleButton' onClick={signIn}>Sign In with Google</button>
      
    </div>
    </div>
  )
}

export default Login