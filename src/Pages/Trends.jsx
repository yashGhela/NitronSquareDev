import React, { useState } from 'react'
import { Bar, Line } from 'react-chartjs-2';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserData } from '../Util/Data';
import Sidebar from '../Components/Sidebar'
import BarChartT from '../Components/BarChart';
import {Speedometer,CardText,BarChart } from 'react-bootstrap-icons'
import Chart from 'chart.js/auto';
import LineChart from '../Components/LineChart';
import PieChart from '../Components/PieChart';


window.Chart = Chart


function Trends() {
  const [userData, setUserData] =useState({
    labels: UserData.map((data)=> data.year) ,
    datasets:[{
      label: 'Users Gained',
      data: UserData.map((data)=> data.userGain),
      backgroundColor: [
        'red',
        'blue',
        'green',
        'yellow',
        'orange'
      ],
     
      

    }]
  })
    let location = useLocation();
  const user = location.state.user

  
  return (

    
    <div>

      <div className="navB">
        <Sidebar
          L1={<Link to='/Dashboard' state={{user:user}} style={{textDecoration:'none', color:'white'}}><Speedometer/></Link>}
          L2={<Link to='/Sessions' state={{user:user}} style={{textDecoration:'none', color:'white'}}><CardText/></Link>}
          L3={<Link to='/Trends' state={{user:user}} style={{textDecoration:'none', color:'white'}}><BarChart/></Link>}/>
        </div>

        <div className="bod">
           <div className="startCard">
            <h1>Trends</h1>
           </div>
           <div style={{width:700, margin: '20px', display: 'flex'}}>
           <BarChart chartData={userData}/>
           <LineChart chartData={userData}/>
           
           </div>
         
      
        </div>
      
        
    </div>
  )
}

export default Trends