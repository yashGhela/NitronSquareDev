import React from 'react';
import './Login.css';
import {auth, db, provider} from '../firebaseConfig';
import {signInWithPopup} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {addDoc, collection, doc, getDoc, setDoc} from 'firebase/firestore';

function SignUp() {

  let nav= useNavigate();
  const createSes=async({user})=>{
     await addDoc(collection(db,'Users',user,'Sessions'), {place: 'placeholder'}); /*this only worked once when i assigned a name to the document, so what i need to do is find a way to 
     get the id then pass it thru*/
     
      
  }

  const signUp=()=>{  //to put it simpy once a user signs up they'll be added to the database and then sent to add more subjects to sessions
    signInWithPopup(auth, provider).then(async(result)=>{
      const ref = doc(db, 'Users', result.user.uid)
      const docRef = setDoc(ref, {username: result.user.displayName,tier: 'free'});
      nav('/FirstTimeSrt', {state: {user: result.user.uid}});
      localStorage.setItem('isAuth', true);
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