import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import Sidebar from '../Components/Sidebar'
import { collection, orderBy, query, limit, onSnapshot,getDocs, startAfter, DocumentSnapshot, endBefore, limitToLast } from 'firebase/firestore';
import './Sessions.css'
import './Dashboard.css';

import { db } from '../firebaseConfig';

function Sessions() {
  const location= useLocation();

  const user= location.state.user;

  const [sesList, setSesList] = useState([]);
  const subRef=collection(db, 'Users',user,'Sessions');

  const first = query(subRef,orderBy('time', 'desc'),limit(5));
  

  const next=(last)=>{
    return query(subRef,orderBy('time','desc'), startAfter(last['time','desc']), limit(5))
  }

  const prev=(first)=>{
    return query(subRef, orderBy('time','desc'), endBefore(first['time','desc']), limitToLast(5))
  }
  

  


  


  useEffect(() => {  //loads all the tenants
    
    onSnapshot(first, (snapshot) => {
     setSesList(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      
      
    });
  }, []);
  return (
    

    <div className='Sessions'>
      <Sidebar className='nav'
        L1={<Link to='/Dashboard' state={{user:user}}>Dashboard</Link>}
        L2={<Link to='/Sessions' state={{user:user}}>Sessions</Link>}/>

        <div className="bod">
          <div className="startCard1">
            <h1>Sessions</h1>

          </div>

          <div className="Recent">
          <h1>Your Sessions:</h1>
          <div className="recSes">
          {sesList.map((REC)=>{
              return(
                <div className="rowCard">
                  <div className="rowCardTitle">
                   <h3> Subject: {REC.subject}</h3>

                  </div>
                  <div className="WTime">
                    <h3>Work Minutes: {REC.WorkTime}</h3>
                  </div>
                  <div className="BTime">
                   <h3> Break Minutes: {REC.BreakTime}</h3>
                  </div>
                  <div className="Atime">
                    <h3>Date: {REC.time}</h3>
                  </div>
                  
                </div>
              )
            })}
          </div>
          </div>
          <div className="buttoninlin">
          <button onClick={prev} className='Gobtn1'>Previous </button>
          <button onClick={next} className='Gobtn1'>Next</button>
          </div>
        </div>
    </div>
  )
}

export default Sessions