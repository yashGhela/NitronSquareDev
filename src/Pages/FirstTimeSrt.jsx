import React, { useState } from 'react';
import './FirstTimeSrt.css';
import { useLocation } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function FirstTimeSrt() {
    let location = useLocation();
    const user= location.state.user;//loads user
    
    

    const [newSubject, setNewSubject] = useState();//new subject
    const [sent, setSent]= useState(false);
    const[subjectError, setSubjectError] = useState(null);

    const addSubject=async()=>{
      await addDoc(collection(db, 'Users', user, 'Sessions', 'Subjects', newSubject),{place:'first doc'});//Adds a collection to the subjects document and makes it a new subject
      setSent(true);
    }
  return (
    <div className='Cont'>
        <h1>Lets Add Some Subjects!</h1>
        <input type="text" placeholder='Accounting'  onChange={(e)=>{setNewSubject(e.target.value)}}/>
        <button className='Gobtn1' onClick={addSubject}>Add!</button>
       {sent&&(<h2>{newSubject} added!</h2>)}
        
    </div>
  )
}

export default FirstTimeSrt