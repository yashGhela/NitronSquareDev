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



window.Chart = ChartJS


function Trends() {
  const cookie = new Cookies()
  const user=cookie.get('useraidt')
 

 
  const col = collection(db,'Users',user,'Scopes');


  var labelsArray=[];
  var dataArray=[];
 
  const snap=async()=>{
    await    getDocs(col).then((snapshot)=>{
      snapshot.docs.forEach(doc=>{
        var sub = doc.data();

        var title = sub.title;
        labelsArray.push(title);
        console.log(labelsArray)
        

       

        var count= sub.incomplete;
        dataArray.push(count);
        console.log(dataArray)
    
      })
    })
  }

  


  const userData ={
    labels: labelsArray ,
    datasets:[{
      label: 'Incomplete',
      data: dataArray
    }]}


   

  let nav = useNavigate();

  useEffect(()=>{
    snap()
  },[])
  


  
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
           <Line data={userData}/>
           <Bar data={userData}/>
           
           </div>
         
      
        </div>
      
        
    </div>
  )
}

export default Trends