import React from 'react';
import './Page.css';

import {  useNavigate } from 'react-router-dom';

import Sidebar from '../Components/Sidebar'

import {Speedometer,CardText,BarChart,Hr, Journals, Bullseye } from 'react-bootstrap-icons'


import {
  Chart as ChartJS,
  Tooltip,
  LinearScale,
} from 'chart.js';
import {Button, Card, Container,Row,Col} from 'react-bootstrap';
import Cookies from 'universal-cookie';
import { collection, getDocs,doc, getDoc, query, where, limit, getCountFromServer ,orderBy} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto'
import { useState } from 'react';




window.Chart = ChartJS
ChartJS.register(
  [Tooltip],
  LinearScale
)



function Trends() {
  const cookie = new Cookies()
  const user=cookie.get('useraidt')
  const [subjectList, setSubjectList] =useState([]);
  const [sesDone, setSesDone]=useState(0);
  const [sub,setSub]=useState('none chosen');


 
  const col = collection(db,'Users',user,'Sessions');

  




 
  var datesArray=[];
  var WTArray=[];
  var BTArray=[];

  const getData=async({sub})=>{
    const q = query(col,where('subject','==',sub), limit(30));
    await getDocs(q).then((snapshot)=>{
      snapshot.docs.forEach(doc=>{
        var dc= doc.data();
        var date = dc.time;
        var WT = dc.WorkTime;
        var BT = dc.BreakTime;

        datesArray.push(date);
        WTArray.push(WT);
        BTArray.push(BT);
        console.log(datesArray)
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

  const docCount=async({sub})=>{
    const q = query(col,where('subject','==',sub));
     await getCountFromServer(q).then(
      (snapshot)=>{
        setSesDone(snapshot.data().count)
      }
      
    )
    
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
      labels: ['Select an Option'],
      datasets:[{
        label: 'Select an Option',
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

         <Container fluid>
          <Row>
          <div style={{display: 'flex', margin:'20px',color:'lightgray'}}>
          {subjectList.map((sub)=>{
              
              return(
                <Col xs='1' style={{marginRight:'10px', marginLeft:'0'}}>
                <Card 
                type="checkbox"
                 value={sub} 
                 variant="secondary"
                 onClick={()=>{getData({sub:sub}); docCount({sub:sub}); setSub(sub)}}
                 style={{marginRight:'5px', marginBottom:'5px', width:'100px', height:'35px', cursor:'pointer', display:'flex',paddingBottom:'20px', paddingRight:'5px', paddingLeft:'5px', backgroundColor:'RGB(12,12,12)',color:'lightgray'}}>
                  {sub}
                </Card></Col>
                
              )

              
            
            })}


          </div>
          </Row>
         </Container>
          <h4 style={{marginLeft:'20px', color:'lightgray'}}>Trends for {sub}</h4>

        

          <div style={{margin: '20px', display: 'flex', width:'100%'}}>
           <Container fluid>
            <Row>
              <Col >
              <Line data={userData}   />
 
              </Col>
              <Col>
              <Bar data={userData}   /></Col>
            </Row>
           </Container>
           
           </div>


           <Card style={{marginLeft:'20px', height:'200px', width:'150px',padding:'20px', backgroundColor:'rgb(12,12,12)',color:'lightgray'}}>
            <Card.Text style={{fontSize:'25px'}}>Sessions Done:</Card.Text>
            <h1>{sesDone}</h1>
           </Card>



          
           
       
         
      
        </div>
      
        
    </div>
  )
}

export default Trends