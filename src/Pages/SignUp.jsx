import React from 'react';
import './Login.css';
import {auth, db, provider} from '../firebaseConfig';
import {signInWithPopup} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, doc, setDoc} from 'firebase/firestore';
import { Button } from 'react-bootstrap';
import {Google} from 'react-bootstrap-icons';

function SignUp() {

  let nav= useNavigate();
  const createSes=async({user})=>{
    const ref= collection(db,'Users',user,'Sessions');
    
     // Adds a doc to the collection of Sessions and names it subjects with the description subjects
    await setDoc(doc(ref,'SubjectsList'),{subjects:['']})
  }

  const signUp=()=>{  //to put it simpy once a user signs up they'll be added to the database and then sent to add more subjects to sessions
    signInWithPopup(auth, provider).then(async(result)=>{
      const ref = doc(db, 'Users', result.user.uid)
      const docRef = setDoc(ref, {username: result.user.displayName,tier: 'free'});
      

      sessionStorage.setItem('useraidt', result.user.uid);
      const user= sessionStorage.getItem('useraidt')
      createSes({user: result.user.uid})
      nav(`/Dashboard/${user}`)
      
      
    })
  }
  return (
    <div className="logBox">
      <div className='LoginCont'>
      <h1>Sign Up:</h1>
      <Button  variant='dark' onClick={signUp} >Sign Up with Google <Google/></Button>
      
    </div>
    </div>
  )
}

export default SignUp