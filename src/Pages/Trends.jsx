import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../Components/Sidebar'



function Trends() {
    let location = useLocation();
  const user = location.state.user

  
  return (

    
    <div>

      <div className="navB">
        <Sidebar
        L1={<Link to='/Dashboard' state={{user:user}}>Dashboard</Link>}
        L2={<Link to='/Sessions' state={{user:user}}>Sessions</Link>}
        L3={<Link to='/Trends' state={{user:user}}>Trends</Link>}/>
        </div>

        <div className="bod">
            <h1>Trends</h1>
            
        </div>
        
    </div>
  )
}

export default Trends