import React from 'react';
import './Page.css';

import {  useNavigate } from 'react-router-dom';

import Sidebar from '../Components/Sidebar'

import {Speedometer,CardText,BarChart,Hr, Journals, Bullseye, Journal, Archive, Wallet2, Check2Square } from 'react-bootstrap-icons'


import {
  Chart as ChartJS,
  Tooltip,
  LinearScale,
} from 'chart.js';
import {Button, Card, Container,Row,Col, ButtonGroup} from 'react-bootstrap';
import Cookies from 'universal-cookie';
import { collection, getDocs,doc, getDoc, query, where, limit, getCountFromServer ,orderBy} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto'
import { useState } from 'react';
import { async } from '@firebase/util';




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
  const [avgWt,setavgWt]=useState(0);
  const [avgBT,setAvgBT]=useState(0);


 
  const col = collection(db,'Users',user,'Sessions');




 
  var datesArray=[];
  var WTArray=[];
  var BTArray=[];
  var objectsArray=[];
  var obsort=[]

  const getData=async({sub})=>{
    const q = query(col,where('subject','==',sub));
    await getDocs(q).then((snapshot)=>{
      snapshot.docs.forEach(doc=>{
        var dc=doc.data();
       objectsArray.push({
        date: dc.time,
        WT: dc.WorkTime,
        BT: dc.BreakTime
       })
       
    
      })

      obsort=objectsArray.sort((a, b) => (a.date > b.date) ? 1 : -1)
      
      obsort.forEach((doc)=>{
        var dc= doc;
        var date = dc.date;
        var WT = dc.WT;
        var BT = dc.BT;

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

  const docCount=async({sub})=>{
    const q = query(col,where('subject','==',sub));
     await getCountFromServer(q).then(
      (snapshot)=>{
        setSesDone(snapshot.data().count)
      }
      
    )
    
  }

  var WTA=0;
  var WTC=0;
  

  const GetAvgWt= async({sub})=>{
    const q = query(col,where('subject','==',sub));
    await getDocs(q).then((snapshot)=>{
      snapshot.docs.forEach(doc=>{
        WTA+=doc.data().WorkTime;
        WTC+=1

      })
      setavgWt(Math.floor(WTA/WTC));
    })
  }

  var BTA=0;
  var BTC=0;

  const GetAvgBt= async({sub})=>{
    const q = query(col,where('subject','==',sub));
    await getDocs(q).then((snapshot)=>{
      snapshot.docs.forEach(doc=>{
        BTA+=doc.data().BreakTime;
        BTC+=1

      })
      setAvgBT(Math.floor(BTA/BTC));
    })
  }


  

  




let subref=  doc(db,'Users',user,'Subjects','SubjectsList')
  
 
const docSnap = async()=>

await getDoc(subref).then(docSnap=>{
  let subData=[];
  if(docSnap.exists()){
    
    subData= docSnap.data().subjects 
    
    
  }else{
   return null;
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

    
    <div className='Page' >

      <div className="navB">
      <Sidebar
        L1={<Button variant='light-outline' onClick={()=>nav(`/Dashboard/`)}><Speedometer style={{color:'white'}}/></Button>}
        L2={<Button variant='light-outline' onClick={()=>nav(`/Sessions/`)}><Archive style={{color:'white'}}/></Button>}
        L3={<Button variant='light-outline' onClick={()=>nav(`/Trends/`)}><BarChart style={{color:'white'}}/></Button>}
        L4={<Button variant='light-outline' onClick={()=>nav(`/Scopes/`)}><Bullseye style={{color:'white'}}/></Button>}
        L5={<Button variant='light-outine' onClick={()=>nav('/Todos')}><Check2Square style={{color:'white'}}/></Button>}
   
      />
        </div>

        <div className="bod">
        <Card style={{
            
             margin:'20px',
             height:'150px',
             backgroundColor:'#17181a',
             border: '3px solid rgb(209, 194, 63)',
             backgroundSize:'400% 400%',
             textAlign:'center',
             alignItems:'center',
             color:'white',
             padding:' 10px',
             animation:'gradient 15s ease infinite'
              }}>
            <Card.Title ><h1 style={{FontWeight:'bold', FontSize:'40px'}}>Trends</h1></Card.Title>
            
         
          
          </Card>

          
          <ButtonGroup>
         <div style={{display: 'flex', margin:'20px',color:'lightgray', overflow:'auto'}}>
          {subjectList.map((sub)=>{

              return(

                <Button 
                type="checkbox"
                 value={sub} 
                 variant="outline-light"
                 onClick={()=>{getData({sub:sub}); docCount({sub:sub}); setSub(sub); GetAvgWt({sub:sub}); GetAvgBt({sub:sub})}}
                 style={{marginRight:'10px'}}
                 >
                  {sub}
                </Button>

              )



            })}


          </div>
         </ButtonGroup>
         
          <p style={{marginLeft:'20px', color:'lightgray', fontSize:'25px'}}>Trends for {sub}</p>

        

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


       <Container fluid={true} style={{marginLeft:'8px', overflow:'auto'}}>
        <Row>
          <Col Col style={{width:'450px', marginBottom:'10px'}}xs='2' >
          <Card style={{width:'100%', background:'#282b2e', color:'lightgray' ,  height:'100%', marginTop:'10px', padding:'20px', border:' 2px solid #393d40'}} >
            <Card.Text style={{fontSize:'25px'}}>Sessions Done:</Card.Text>
            <h1>{sesDone}</h1>
           </Card>

          </Col>
          <Col Col style={{width:'450px', marginBottom:'10px'}}xs='2' >
          <Card style={{width:'100%', background:'#282b2e', color:'lightgray' ,  height:'100%', marginTop:'10px', padding:'20px', border:' 2px solid #393d40'}} >
            <Card.Text style={{fontSize:'25px'}}>Average Work Time:</Card.Text>
            <h1>{avgWt} minutes</h1>
           </Card>

          </Col>
          <Col Col style={{width:'450px', marginBottom:'10px'}}xs='2' >
          <Card style={{width:'100%', background:'#282b2e', color:'lightgray' ,  height:'100%', marginTop:'10px', padding:'20px', border:' 2px solid #393d40'}} >
            <Card.Text style={{fontSize:'25px'}}>Average Break Time:</Card.Text>
            <h1>{avgBT} minutes</h1>
           </Card>

          </Col>
        </Row>
       </Container>


          
           
       
         
      
        </div>
      
        
    </div>
  )
}

export default Trends