import React, { useState} from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import Sidebar from '../Components/Sidebar'
import { collection, orderBy, query} from 'firebase/firestore';

import './Dashboard.css';
import {Button} from 'react-bootstrap';
import { db } from '../firebaseConfig';
import {Speedometer,CardText,BarChart } from 'react-bootstrap-icons'
import { usePagination } from 'use-pagination-firestore';

function Sessions() {
  const location= useLocation();

  const user= location.state.user;

  
  const subRef=collection(db, 'Users',user,'Sessions');
  let nav = useNavigate();

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
    

    <div className='Page'>
      <Sidebar
        L1={<Button variant='dark' onClick={()=>nav('/Dashboard', {state: {user: user}})}><Speedometer/></Button>}
        L2={<Button variant='dark' onClick={()=>nav('/Sessions', {state: {user: user}})}><CardText/></Button>}
        L3={<Button variant='dark' onClick={()=>nav('/Trends', {state: {user: user}})}><BarChart/></Button>}/>


        
        <div className="bod">
          <div className="startCard1">
            <h1>Sessions</h1>

          </div>

          <div className="Recent">
          <h1>Your Sessions:</h1>
          <div className="recSes">
          {items.map((rec)=>{
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
          <div className="buttoninlin">
          <Button  variant='dark'  onClick={getPrev} disabled={isStart} >Previous </Button>
          <Button variant='dark' onClick={getNext} disabled={isEnd}>Next</Button>
          </div>
        </div>
    </div>
  )
}

export default Sessions