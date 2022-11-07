import React from 'react'
import { useNavigate } from 'react-router-dom';

import Sidebar from '../Components/Sidebar'
import './Dashboard.css';

function Dashboard() {

  let nav = useNavigate();
  const toSet=()=>{
    nav('/SesSettings');
  }
  return (
    <div className='Dashboard'>
      <nav>
      <Sidebar/>
      </nav>
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