import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import Sidebar from '../Components/Sidebar'
import './Dashboard.css';

function Sessions() {
  const location= useLocation();
  const user= location.state.user;
  return (
    

    <div>
      <Sidebar className='nav'
        L1={<Link to='/Dashboard' state={{user:user}}>Dashboard</Link>}
        L2={<Link to='/Sessions' state={{user:user}}>Sessions</Link>}/>

        <div className="bod">
          <h1>Sessions</h1>
        </div>
    </div>
  )
}

export default Sessions