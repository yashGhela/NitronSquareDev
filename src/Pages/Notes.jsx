import React from 'react'
import Sidebar from '../Components/Sidebar'
import { Button } from 'react-bootstrap'
import {    useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { db } from '../firebaseConfig';
import {Speedometer,CardText,BarChart, Hr, Journals, Bullseye, Check, Journal, Archive } from 'react-bootstrap-icons'

function Notes() {
    const cookie = new Cookies()
  const user=cookie.get('useraidt')
  
  let nav = useNavigate();
  
  return (
    <div className='Page'>

<div className="navB">
        <Sidebar
        L1={<Button variant='light-outline' onClick={()=>nav(`/Dashboard/`)}><Speedometer style={{color:'white'}}/></Button>}
        L2={<Button variant='light-outline' onClick={()=>nav(`/Sessions/`)}><Archive style={{color:'white'}}/></Button>}
        L3={<Button variant='light-outline' onClick={()=>nav(`/Trends/`)}><BarChart style={{color:'white'}}/></Button>}
        L4={<Button variant='light-outline' onClick={()=>nav(`/Scopes/`)}><Bullseye style={{color:'white'}}/></Button>}
        L5={<Button variant='light-outline' onClick={()=>{nav('/Notes')}}><Journal style={{color:'white'}}/></Button>}/>
        </div>
       
    </div>
  )
}

export default Notes