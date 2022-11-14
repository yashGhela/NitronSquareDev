import React from 'react'
import './Sidebar.css';
import {Link, useNavigate} from 'react-router-dom'
import {signOut} from 'firebase/auth';
import {auth} from '../firebaseConfig';


function Sidebar() {

  let nav = useNavigate();

  const LogOut=()=>{
    signOut(auth).then(()=>{
      localStorage.clear();
      nav('/');
      
    })
    
  }
  return (
 <div className='Sidebar'>
    <div className="SidebarTop">
    <h1>Nitron Square</h1>
    <h3>by Nitron Digital</h3>

    <div className="SidebarList">
        <h2>{<Link to={'/Dashboard'}>Dashboard</Link>}</h2>
        <h2>{<Link to='/Sessions'>Sessions</Link>}</h2>
        <button className='LogOut' onClick={LogOut}>Log Out</button>
        

    </div>
    </div>
 </div>

  )
}

export default Sidebar