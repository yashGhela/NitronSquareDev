import React from 'react';
import './Page.css';

import {  useNavigate } from 'react-router-dom';

import Sidebar from '../Components/Sidebar'

import {Speedometer,CardText,BarChart,Hr } from 'react-bootstrap-icons'


import {
  Chart as ChartJS,
} from 'chart.js';
import {Button, Card} from 'react-bootstrap';
import Cookies from 'universal-cookie';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useEffect } from 'react';
import { Bar, Chart, Line } from 'react-chartjs-2';
import 'chart.js/auto'
import { useState } from 'react';



window.Chart = ChartJS


function Trends() {
  const cookie = new Cookies()
  const user=cookie.get('useraidt')


 
  const col = collection(db,'Users',user,'Sessions');


  var labelsArrayC1=[];
  var dataArrayC1=[];
 
  const loadDataChart1=async()=>{
    await getDocs(col).then((snapshot)=>{
      snapshot.docs.forEach(doc=>{
        var sub = doc.data();

        var title = sub.subject;
        
        if(labelsArrayC1.includes(title)){
          
          const point=labelsArrayC1.findIndex(element=>element=title)
      
          
          var wt=sub.WorkTime;
         
          dataArrayC1.push(wt)
        }else{
          labelsArrayC1.push(title);
          var count= sub.WorkTime;
          dataArrayC1.push(count);
          
        }
        
      
        

       

        
        
        
    
      })
    
    })
    setChartData({
      labels: labelsArrayC1,
      datasets:[{
        label: 'WorkTime',
        data: dataArrayC1
      }]
      
    })
    
  
  }

  




   

  let nav = useNavigate();

  useEffect(()=>{
    loadDataChart1()
  },[])
  
   
  const [userData,setChartData] = useState(
    {
      labels: ['loading'],
      datasets:[{
        label: 'loading',
        data: null
      }]
    }
  )


  
  return (

    
    <div className='Page'>

      <div className="navB">
      <Sidebar
        L1={<Button variant='light-outline' onClick={()=>nav(`/Dashboard/`)}><Speedometer style={{color:'white'}}/></Button>}
        L2={<Button variant='light-outline' onClick={()=>nav(`/Sessions/`)}><CardText style={{color:'white'}}/></Button>}
        L3={<Button variant='light-outline' onClick={()=>nav(`/Trends/`)}><BarChart style={{color:'white'}}/></Button>}
        L4={<Button variant='light-outline' onClick={()=>nav(`/Scopes/`)}><Hr style={{color:'white'}}/></Button>}/>
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
           <Line data={userData} />
           <Bar data={userData}/>
           
           </div>
         
      
        </div>
      
        
    </div>
  )
}

export default Trends