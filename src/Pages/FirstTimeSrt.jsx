import React, { useState } from 'react';
import './FirstTimeSrt.css';
import { useLocation } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function FirstTimeSrt() {
    let location = useLocation();
    const user= location.state.user;
    
    

    const [newSubject, setNewSubject] = useState();
    const[subjectError, setSubjectError] = useState(null);

    const addSubject=async()=>{
      await addDoc(collection(db, 'Users', user, 'Sessions', newSubject),{place:'first doc'});
    }
  return (
    <div className='Cont'>
        <h1>Lets Add Some Subjects!</h1>
        <input type="text" placeholder='Accounting'  onChange={(e)=>{setNewSubject(e.target.value)}}/>
        <button className='Gobtn1' onClick={addSubject}>Add!</button>
    </div>
  )
}

export default FirstTimeSrt