import { collection, orderBy, query, limit, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import {   useNavigate } from 'react-router-dom';

import Sidebar from '../Components/Sidebar'
import './Page.css';
import { db } from '../firebaseConfig';
import {Speedometer,CardText,BarChart } from 'react-bootstrap-icons'
import {Button} from 'react-bootstrap';

function Dashboard() {
  
  const user = sessionStorage.getItem('useraidt');
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

  return (
    <div className='Page'>
      
       
        <div className="navB">
        <Sidebar
        L1={<Button variant='dark' onClick={()=>nav(`/Dashboard/${user}`, {state: {user: user}})}><Speedometer/></Button>}
        L2={<Button variant='dark' onClick={()=>nav(`/Sessions/${user}`, {state: {user: user}})}><CardText/></Button>}
        L3={<Button variant='dark' onClick={()=>nav(`/Trends/${user}`, {state: {user: user}})}><BarChart/></Button>}/>
        </div>
       
        
     
       
        <div className="bod">
        <div className="startCard">
          <h1>Start a Study Session ➡️</h1>
          <Button onClick={()=>{nav(`/SesSettings/${user}`)}} variant='dark' style={{height:'60px', width:'100px'}}>Lets Go!</Button>
         
        </div>
        <div className="Recent">
          <h1>Recent Sessions:</h1>
          <div className="recSes">
            {recsesList.map((rec)=>{
              return(
                <div className="rowCard">
                  <div className="rowCardTitle">
                   <h3>  {rec.subject}</h3>

                  </div>
                  <div className="WTime">
                    <h3> {rec.WorkTime} Minutes </h3>
                  </div>
                  <div className="BTime">
                   <h3>  {rec.BreakTime} Minutes</h3>
                  </div>
                  <div className="Atime">
                    <h3> {rec.time}</h3>
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