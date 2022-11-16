import React, { useState } from 'react';
import './FirstTimeSrt.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function FirstTimeSrt() {
    let location = useLocation();
    const user= location.state.user;//loads user
    let nav=useNavigate();
    
    

    const [newSubject, setNewSubject] = useState();//new subject
    const [sent, setSent]= useState(false);
    const[subjectError, setSubjectError] = useState(null);

    const addSubject=async()=>{
      await addDoc(collection(db, 'Users', user, 'Sessions', 'Subjects', newSubject),{place:'first doc'});//Adds a collection to the subjects document and makes it a new subject
      setSent(true);
      alert('Subject Added!');
    }

    const toDash=()=>{
      nav('/Dashboard', {state:{user:user}})
    }
  return (
    <div className='Cont'>
        <h1>Lets Add Some Subjects!</h1>
        <input type="text" placeholder='Accounting'  onChange={(e)=>{setNewSubject(e.target.value)}}/>
        <button className='Gobtn1' onClick={addSubject}>Add!</button>
        <button className='Gobtn1' onClick={toDash}>Done!</button>
       
        
    </div>
  )
}

export default FirstTimeSrt