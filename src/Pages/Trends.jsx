import React, { useState } from 'react';
import './Page.css';

import {  useNavigate } from 'react-router-dom';

import Sidebar from '../Components/Sidebar'
import BarChartT from '../Components/BarChart';
import {Speedometer,CardText,BarChart,Hr } from 'react-bootstrap-icons'
import Chart from 'chart.js/auto';
import LineChart from '../Components/LineChart';
import PieChart from '../Components/PieChart';
import {Button, Card} from 'react-bootstrap';
import Cookies from 'universal-cookie';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';


window.Chart = Chart


function Trends() {
  const cookie = new Cookies()
  const user=cookie.get('useraidt')
 

 
  const col = collection(db,'Users',user,'Sessions');


  var labelsArray=[];
  var dataArray=[];
 
     getDocs(col).then((snapshot)=>{
      snapshot.docs.forEach(doc=>{
        var sub = doc.data();

        var subject = sub.subject;
        labelsArray.push(subject);

       

        var count= sub.WorkTime;
        dataArray.push(count);
      })
    })

  


  const [userData, setUserData] =useState({
    labels: labelsArray ,
    datasets:[{
      label: 'WorkTime',
      data: dataArray,
    }]
  })
   

  let nav = useNavigate();

  
  return (

    
    <div className='Page'>

      <div className="navB">
      <Sidebar
        L1={<Button variant='dark' onClick={()=>nav(`/Dashboard/${user}`)}><Speedometer/></Button>}
        L2={<Button variant='dark' onClick={()=>nav(`/Sessions/${user}`)}><CardText/></Button>}
        L3={<Button variant='dark' onClick={()=>nav(`/Trends/${user}`)}><BarChart/></Button>}
        L4={<Button variant='dark' onClick={()=>nav(`/Scopes/${user}`)}><Hr/></Button>}/>
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
           <BarChartT chartData={userData}/><br/>
           <LineChart chartData={userData}/>
           
           </div>
         
      
        </div>
      
        
    </div>
  )
}

export default Trends