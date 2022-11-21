import { collection, orderBy, query, limit, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link, Router, useLocation, useNavigate } from 'react-router-dom';

import Sidebar from '../Components/Sidebar'
import './Dashboard.css';
import { db } from '../firebaseConfig';

function Dashboard() {
  let location = useLocation();
  const user = location.state.user
  const subRef=collection(db, 'Users',user,'Sessions');
  const [recsesList, setRecsesList]=useState([]); //Recent Sessions 

 const q = query(subRef,orderBy('time', 'desc'),limit(5));


 useEffect(() => {  //loads all the tenants
    
  onSnapshot(q, (snapshot) => {
   setRecsesList(
      snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
    
    
  });
}, []);
 

  let nav = useNavigate();
  const toSet=()=>{
   
    nav('/SesSettings', {state: {user: user}});
  }
  return (
    <div className='Dashboard'>
      
       
        <div className="navB">
        <Sidebar
        L1={<Link to='/Dashboard' state={{user:user}}>Dashboard</Link>}
        L2={<Link to='/Sessions' state={{user:user}}>Sessions</Link>}/>
        </div>
       
        
     
       
        <div className="bod">
        <div className="startCard">
          <h1>Start a Study Session</h1>
          <button className='Gobtn' onClick={toSet}>Let's Go!</button>
        </div>
        <div className="Recent">
          <h1>Recent Sessions:</h1>
          <div className="recSes">
            {recsesList.map((rec)=>{
              return(
                <div className="rowCard">
                  <div className="rowCardTitle">
                   <h3> Subject: {rec.subject}</h3>

                  </div>
                  <div className="WTime">
                    <h3>Work Minutes: {rec.WorkTime}</h3>
                  </div>
                  <div className="BTime">
                   <h3> Break Minutes: {rec.BreakTime}</h3>
                  </div>
                  <div className="Atime">
                    <h3>Date: {rec.time}</h3>
                  </div>
                  
                </div>
              )
            })}
          </div>
        </div>
        </div>
      
      
      
      
    </div>
  )
}

export default Dashboard