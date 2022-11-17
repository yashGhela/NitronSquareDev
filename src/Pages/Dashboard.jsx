import { collection, orderBy, query, limit } from 'firebase/firestore';
import React from 'react'
import { Router, useLocation, useNavigate } from 'react-router-dom';

import Sidebar from '../Components/Sidebar'
import './Dashboard.css';
import { db } from '../firebaseConfig';

function Dashboard() {
  let location = useLocation();
  const user = location.state.user
  const subRef=collection(db, 'Users',user,'Sessions','Subjects','SubjectList');

 const q = query(subRef,orderBy('time', 'desc'),limit(10));


 

  let nav = useNavigate();
  const toSet=()=>{
   
    nav('/SesSettings', {state: {user: user}});
  }
  return (
    <div className='Dashboard'>
      
        <Sidebar/>
     
       
        <div className="bod">
        <div className="startCard">
          <h1>Start a Study Session</h1>
          <button className='Gobtn' onClick={toSet}>Let's Go!</button>
        </div>
        <div className="Recent">
          <h1>Recent Sessions:</h1>
        </div>
        </div>
      
      
      
      
    </div>
  )
}

export default Dashboard