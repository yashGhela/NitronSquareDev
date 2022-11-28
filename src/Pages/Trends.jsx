import React, { useState } from 'react';
import './Page.css';

import {  useNavigate } from 'react-router-dom';
import { UserData } from '../Util/Data';
import Sidebar from '../Components/Sidebar'
import BarChartT from '../Components/BarChart';
import {Speedometer,CardText,BarChart } from 'react-bootstrap-icons'
import Chart from 'chart.js/auto';
import LineChart from '../Components/LineChart';
import PieChart from '../Components/PieChart';
import {Button} from 'react-bootstrap';


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
   
  const user = sessionStorage.getItem('useraidt');
  let nav = useNavigate();

  
  return (

    
    <div className='Page'>

      <div className="navB">
      <Sidebar
        L1={<Button variant='dark' onClick={()=>nav(`/Dashboard/${user}`, {state: {user: user}})}><Speedometer/></Button>}
        L2={<Button variant='dark' onClick={()=>nav(`/Sessions/${user}`, {state: {user: user}})}><CardText/></Button>}
        L3={<Button variant='dark' onClick={()=>nav(`/Trends/${user}`, {state: {user: user}})}><BarChart/></Button>}/>
        </div>

        <div className="bod">
           <div className="startCard">
            <h1>Trends</h1>
           </div>
           <div style={{width:700, margin: '20px', display: 'flex'}}>
           <BarChartT chartData={userData}/>
           <LineChart chartData={userData}/>
           
           </div>
         
      
        </div>
      
        
    </div>
  )
}

export default Trends