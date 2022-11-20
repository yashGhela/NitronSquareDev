import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import Sidebar from '../Components/Sidebar'
import { collection, orderBy, query, limit, onSnapshot,getDocs, startAfter, DocumentSnapshot } from 'firebase/firestore';
import './Sessions.css'
import './Dashboard.css';

import { db } from '../firebaseConfig';

function Sessions() {
  const location= useLocation();

  const user= location.state.user;

  const subRef=collection(db, 'Users',user,'Sessions');

  const first = query(subRef,orderBy('time', 'desc'),limit(20));
  const documentSnapshots =  getDocs(first);

  const last = documentSnapshots.docs[documentSnapshots.docs.length-1];

  const next = query(subRef, orderBy('time', 'desc'), startAfter(last), limit(25));

  const [sesList, setSesList] = useState();


  useEffect(() => {  //loads all the tenants
    
    onSnapshot(next, (snapshot) => {
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

          <div className="Ses">
          {sesList.map((ses)=>{
              return(
                <div className="rowCard">
                  <div className="rowCardTitle">
                   <h3> Subject: {ses.subject}</h3>

                  </div>
                  <div className="WTime">
                    <h3>Work Minutes: {ses.WorkTime}</h3>
                  </div>
                  <div className="BTime">
                   <h3> Break Minutes: {ses.BreakTime}</h3>
                  </div>
                  <div className="Atime">
                    <h3>Date: {ses.time}</h3>
                  </div>
                  
                </div>
              )
            })}
          </div>
        </div>
    </div>
  )
}

export default Sessions