import React from 'react';
import './Page.css';

import {  useNavigate } from 'react-router-dom';

import Sidebar from '../Components/Sidebar'

import {Speedometer,CardText,BarChart,Hr, Journals, Bullseye } from 'react-bootstrap-icons'


import {
  Chart as ChartJS,
} from 'chart.js';
import {Button, Card} from 'react-bootstrap';
import Cookies from 'universal-cookie';
import { collection, getDocs,doc, getDoc, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useEffect } from 'react';
import { Bar, Chart, Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto'
import { useState } from 'react';



window.Chart = ChartJS


function Trends() {
  const cookie = new Cookies()
  const user=cookie.get('useraidt')
  const [subjectList, setSubjectList] =useState([]);


 
  const col = collection(db,'Users',user,'Sessions');

  


 
  var datesArray=[];
  var WTArray=[];
  var BTArray=[];

  const getData=async({sub})=>{
    const q = query(col,where('subject','==',sub));
    await getDocs(q).then((snapshot)=>{
      snapshot.docs.forEach(doc=>{
        var dc= doc.data();
        var date = dc.time;
        var WT = dc.WorkTime;
        var BT = dc.BreakTime;

        datesArray.push(date);
        WTArray.push(WT);
        BTArray.push(BT);
      })

    });setChartData({
      labels: datesArray,
      datasets:
      [
        {
        label:'WorkTime',
        data: WTArray
      },
      {
        label:'BreakTime',
        data: BTArray
      }
    ]
      
    })
    

  }




let subref=  doc(db,'Users',user,'Subjects','SubjectsList')
  
 
const docSnap = async()=>

await getDoc(subref).then(docSnap=>{
  let subData=[];
  if(docSnap.exists()){
    
    subData= docSnap.data().subjects 
    
    
  }else{
    console.log('null');
  }
  setSubjectList(subData)
 
  
})



   

  let nav = useNavigate();

  useEffect(()=>{
    docSnap()
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
        L2={<Button variant='light-outline' onClick={()=>nav(`/Sessions/`)}><Journals style={{color:'white'}}/></Button>}
        L3={<Button variant='light-outline' onClick={()=>nav(`/Trends/`)}><BarChart style={{color:'white'}}/></Button>}
        L4={<Button variant='light-outline' onClick={()=>nav(`/Scopes/`)}><Bullseye style={{color:'white'}}/></Button>}/>
        </div>

        <div className="bod">
        <Card style={{
            width:'93vw',
             margin:'20px',
             height:'150px',
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

          <div style={{display: 'inline', margin:'20px'}}>
          {subjectList.map((sub)=>{
              
              return(
                <Button 
                
                 value={sub} 
                 variant="secondary"
                 onClick={()=>{getData({sub:sub})}}
                 style={{marginRight:'5px', marginBottom:'5px', width:'100px'}}>
                  {sub}
                </Button>
                
              )

              
            
            })}


          </div>

        

          <div style={{width:700, margin: '20px', display: 'flex'}}>
           <Line data={userData} />
           <Bar data={userData}/><br/>
       
           
           </div>



          
           
       
         
      
        </div>
      
        
    </div>
  )
}

export default Trends