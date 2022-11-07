import React from 'react'
import './Login.css';
import {auth, db, provider} from '../firebaseConfig';
import {signInWithPopup} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {doc, addDoc, collection} from 'firebase/firestore';

function Login({setIsAuth}) {
  let nav= useNavigate();

  const signIn=()=>{
    signInWithPopup(auth, provider).then(async(result)=>{
      const ref = collection(db, 'Users')
      const docRef = addDoc(ref, {name: result.user.displayName});
      nav('/Dashboard');
      localStorage.setItem('isAuth', true);
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