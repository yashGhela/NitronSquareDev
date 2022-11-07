import React from 'react'
import { useEffect } from 'react';
import { useNavigate, redirect } from 'react-router-dom';
import './Startpage.css';
function StartPage() {
    let nav = useNavigate();
    
    
    const LoginNav = ()=>{
        nav('/Login');

    }

 

   
  return (
    <div className='StartPageCont '>
        <h1>Welcome to Nitron Square Please Log In or Sign Up</h1>
        <button onClick={LoginNav} className='Startbtn'>Login</button>
    </div>
  )
}

export default StartPage