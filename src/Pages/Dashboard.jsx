import React from 'react'
import { Router, useLocation, useNavigate } from 'react-router-dom';

import Sidebar from '../Components/Sidebar'
import './Dashboard.css';

function Dashboard() {
  let location = useLocation();
  const user = location.state.user
  console.log(user)


 

  let nav = useNavigate();
  const toSet=()=>{
   
    nav('/SesSettings', {state: {user: user}});
  }
  return (
    <div className='Dashboard'>
      
        <Sidebar/>
     
       <body>
        <div className="startCard">
          <h1>Start a Study Session</h1>
          <button className='Gobtn' onClick={toSet}>Let's Go!</button>
        </div>
       </body>
      
      
      
    </div>
  )
}

export default Dashboard