import React, { useState} from 'react'
import { useLocation, Link } from 'react-router-dom'
import Sidebar from '../Components/Sidebar'
import { collection, orderBy, query} from 'firebase/firestore';
import './Sessions.css'
import './Dashboard.css';

import { db } from '../firebaseConfig';
import { usePagination } from 'use-pagination-firestore';

function Sessions() {
  const location= useLocation();

  const user= location.state.user;

  
  const subRef=collection(db, 'Users',user,'Sessions');

  
 

    const{
        items,
       
        isStart,
        isEnd,
        getPrev,
        getNext,
}=usePagination(
      query(subRef,orderBy('time','desc')),{
        limit: 5
      }
    );
  

  

  
  



  return (
    

    <div className='Sessions'>
      <Sidebar className='nav'
        L1={<Link to='/Dashboard' state={{user:user}}>Dashboard</Link>}
        L2={<Link to='/Sessions' state={{user:user}}>Sessions</Link>}
        L3={<Link to='/Trends' state={{user:user}}>Trends</Link>}/>

        <div className="bod">
          <div className="startCard1">
            <h1>Sessions</h1>

          </div>

          <div className="Recent">
          <h1>Your Sessions:</h1>
          <div className="recSes">
          {items.map((REC)=>{
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
          <button  className='Gobtn1' onClick={getPrev} disabled={isStart} >Previous </button>
          <button className='Gobtn1' onClick={getNext} disabled={isEnd}>Next</button>
          </div>
        </div>
    </div>
  )
}

export default Sessions