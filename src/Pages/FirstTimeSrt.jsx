import React, { useState } from 'react';
import './FirstTimeSrt.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function FirstTimeSrt() {
    let location = useLocation();
    const user= location.state.user;//loads user
    let nav=useNavigate();
    
    

   

    const toDash=()=>{
      nav('/Dashboard', {state:{user:user}})
    }
  return (
    <div className='Cont'>
        <h1>Welcome to Nitron Square!</h1>
        
      
        <button className='Gobtn1' onClick={toDash}>Done!</button>
       
        
    </div>
  )
}

export default FirstTimeSrt