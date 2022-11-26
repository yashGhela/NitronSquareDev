import React from 'react'
import './Sidebar.css';
import {Link, useNavigate} from 'react-router-dom'
import {signOut} from 'firebase/auth';
import {auth} from '../firebaseConfig';


function Sidebar({L1,L2,L3}) {

  let nav = useNavigate();

  const LogOut=()=>{
    signOut(auth).then(()=>{
      sessionStorage.clear();
      nav('/');
      
    })
    
  }
  return (
 <div className='Sidebar'>
    <div className="SidebarTop">
    <h1>Nitron Square</h1>
    <h3>by Nitron Digital</h3>

    <div className="SidebarList">
        <h2>{L1}</h2>
        <h2>{L2}</h2>
        <h2>{L3}</h2>
        <button className='LogOut' onClick={LogOut}>Log Out</button>
        

    </div>
    </div>
 </div>

  )
}

export default Sidebar