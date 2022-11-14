import React from 'react'

import { useNavigate } from 'react-router-dom';
import './Startpage.css';
function StartPage() {
    let nav = useNavigate();
    
    
    const LoginNav = ()=>{
        nav('/Login');

    }

    const SignNav=()=>{
      nav('/SignUp')
    }

 

   
  return (
    <div className='StartPageCont '>
        <h1>Welcome to Nitron Square Please Log In or Sign Up</h1>
        <button onClick={LoginNav} className='Startbtn'>Login</button>
        <button onClick={SignNav} className='Startbtn'>Sign Up</button>
    </div>
  )
}

export default StartPage