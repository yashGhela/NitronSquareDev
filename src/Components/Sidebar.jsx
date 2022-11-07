import React from 'react'
import './Sidebar.css';
import {Link} from 'react-router-dom'


function Sidebar() {
  return (
 <div className='Sidebar'>
    <div className="SidebarTop">
    <h1>Nitron Square</h1>
    <h3>by Nitron Digital</h3>

    <div className="SidebarList">
        <h2>{<Link to='/'>Dashboard</Link>}</h2>
        <h2>{<Link to='/Sessions'>Sessions</Link>}</h2>
        

    </div>
    </div>
 </div>

  )
}

export default Sidebar