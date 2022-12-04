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
import {Button, Card} from 'react-bootstrap';
import Cookies from 'universal-cookie';

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
   
  const cookie = new Cookies()
  const user=cookie.get('useraidt')
  let nav = useNavigate();

  
  return (

    
    <div className='Page'>

      <div className="navB">
      <Sidebar
        L1={<Button variant='dark' onClick={()=>nav(`/Dashboard/${user}`)}><Speedometer/></Button>}
        L2={<Button variant='dark' onClick={()=>nav(`/Sessions/${user}`)}><CardText/></Button>}
        L3={<Button variant='dark' onClick={()=>nav(`/Trends/${user}`)}><BarChart/></Button>}/>
        </div>

        <div className="bod">
        <Card style={{
            width:'93vw',
             margin:'20px',
             height:'250px',
             backgroundImage:'linear-gradient(-45deg ,rgb(78, 193, 199) ,rgb(209, 194, 63), rgb(199, 78, 120))',
             backgroundSize:'400% 400%',
             textAlign:'center',
             alignItems:'center',
             color:'white',
             padding:' 10px',
             animation:'gradient 15s ease infinite'
              }}>
            <Card.Title ><h1 style={{FontWeight:'bold', FontSize:'40px'}}>Trends</h1></Card.Title>
            
         
          
          </Card>
           <div style={{width:700, margin: '20px', display: 'flex'}}>
           <BarChartT chartData={userData}/>
           <LineChart chartData={userData}/>
           
           </div>
         
      
        </div>
      
        
    </div>
  )
}

export default Trends