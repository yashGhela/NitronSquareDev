import React, { useState } from 'react'
import { Bar, Line } from 'react-chartjs-2';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserData } from '../Util/Data';
import Sidebar from '../Components/Sidebar'
import BarChart from '../Components/BarChart';

import Chart from 'chart.js/auto';
window.Chart = Chart


function Trends() {
  const [userData, setUserData] =useState({
    labels: UserData.map((data)=> data.year) ,
    datasets:[{
      label: 'Users Gained',
      data: UserData.map((data)=> data.userGain),

    }]
  })
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
           <div className="startCard">
            <h1>Trends</h1>
           </div>
           <BarChart chartData={userData}/>
      
        </div>
      
        
    </div>
  )
}

export default Trends