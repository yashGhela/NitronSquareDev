import React from 'react';
import './Login.css';
import {auth, db, provider} from '../firebaseConfig';
import {signInWithPopup} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, doc, setDoc} from 'firebase/firestore';

function SignUp() {

  let nav= useNavigate();
  const createSes=async({user})=>{
    const ref= collection(db,'Users',user,'Sessions');
    
     await addDoc(ref, {desc: 'Subjects'}); // Adds a doc to the collection of Sessions and names it subjects with the description subjects
     
      
      
     
      
  }

  const signUp=()=>{  //to put it simpy once a user signs up they'll be added to the database and then sent to add more subjects to sessions
    signInWithPopup(auth, provider).then(async(result)=>{
      const ref = doc(db, 'Users', result.user.uid)
      const docRef = setDoc(ref, {username: result.user.displayName,tier: 'free'});
      const user= result.user.uid;
      const state= true;
      nav('/FirstTimeSrt', {state: {user: result.user.uid}});//Sends to first time setup with user passed thru
      const resp={user,state};
      localStorage.setItem('isAuth', resp);
      createSes({user: result.user.uid})
      
      
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