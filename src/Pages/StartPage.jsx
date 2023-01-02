import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import './Startpage.css';
import { useEffect } from 'react';
import {Button} from 'react-bootstrap'
import Cookies from 'universal-cookie';



function StartPage() {
    let nav = useNavigate();
    
  useEffect(()=>{
    const cookie= new Cookies()
    const user= cookie.get('useraidt')
    if(user){
      nav(`/Dashboard/`)
    }else{
      console.log('not logged in');
    }
  })

   

 

   
  return (
    <div className='StartPageCont '>
        <div className="startcont">
        <h1  style={{padding: '120px'}}>Welcome to Nitron Square Please Log In or Sign Up🆙</h1>
        
        <Button onClick={()=>{nav('/Login')}} variant='secondary' style={{margin:'20px'}}>Login</Button>
        <Button onClick={()=>{nav('/SignUp')}} variant='secondary'>Sign Up</Button>
        </div>
    </div>
  )
}

export default StartPage