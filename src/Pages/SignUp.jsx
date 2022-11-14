import React from 'react';
import './Login.css';
import {auth, db, provider} from '../firebaseConfig';
import {signInWithPopup} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {doc, getDoc, setDoc} from 'firebase/firestore';

function SignUp() {

  let nav= useNavigate();

  const signUp=()=>{
    signInWithPopup(auth, provider).then(async(result)=>{
      const ref = doc(db, 'Users', result.user.uid)
      const docRef = setDoc(ref, {username: result.user.displayName,tier: 'free'});
      nav('/FirstTimeSrt', {state: {user: result.user.uid}});
      localStorage.setItem('isAuth', true);
      
      
    })
  }
  return (
    <div className="logBox">
      <div className='LoginCont'>
      <h1>Sign Up:</h1>
      <button className='GoogleButton' onClick={signUp} >Sign Up with Google</button>
      
    </div>
    </div>
  )
}

export default SignUp