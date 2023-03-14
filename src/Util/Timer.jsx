import { addDoc, collection,doc,getDoc, getDocs, query, limit, where, onSnapshot,updateDoc,arrayUnion, arrayRemove, orderBy} from 'firebase/firestore';
import React, { useEffect, useState , useRef} from 'react'
import { CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {  useNavigate , useLocation} from 'react-router-dom';
import { db, storage } from '../firebaseConfig';
import { Accordion, Button, Card, Col, Form, Modal, Row ,Container, FormControl, Image, FormCheck, CloseButton} from 'react-bootstrap';

import ReactSlider from 'react-slider';
import Cookies from 'universal-cookie';
import Quickbar from '../Components/Quickbar';
import { BarChart, BoxArrowLeft, Bullseye, CameraVideoFill, Check, CloudDrizzle, Fire, ImageAlt, ListTask, Moon, MusicNoteBeamed, Pause, Play, StopFill, Stopwatch, Tree, Water, Wind, Youtube } from 'react-bootstrap-icons';
import treeS from '../Assets/Nitron Music/Forrest Sounds.mp3'
import seaS from '../Assets/Nitron Music/Ocean Sounds.mp3'
import RainS from '../Assets/Nitron Music/Rain Sounds.mp3'
import NightS from '../Assets/Nitron Music/Night Sounds.mp3'
import WindS from '../Assets/Nitron Music/Wind Sounds.mp3'
import FireS from '../Assets/Nitron Music/Campfire Sounds.mp3'
import AlarmS from '../Assets/Alarm.mp3'
import { format } from 'date-fns';


import {
  Chart as ChartJS,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { getDownloadURL, listAll, ref } from 'firebase/storage';
import ReactPlayer from 'react-player';
import Draggable from 'react-draggable';



window.Chart = ChartJS


function Timer() {
  

  //basic use 
   const location = useLocation();

    const purple= 'rgb(97, 149, 232)';
    const green = '#70FFB2';

    let worldsort=['Ghibli', 'Mountains','Ocean', 'Forest', 'Lofi','Cafe','Video Games', 'Commute', 'Rain']

    //bgs
    
    const ghibli1='https://firebasestorage.googleapis.com/v0/b/nstudy-dev.appspot.com/o/Backgrounds%2Fghibli%201.png?alt=media&token=bb4277fc-884a-44e2-bd43-432baec817d3'
    

    const imageListRef= ref(storage,'Backgrounds/')


    const nav=useNavigate();
    
    const cookie = new Cookies()
    const user=cookie.get('useraidt')
    let subject= location.state.subject;
    let OWT=location.state.Wtsum;
    let OBT=location.state.Btsum;

    const [modalShow, setModalShow]= useState(false);
    const [rating, setRating]=useState(0)
    const [description, setDescription]=useState('');



    const [imageList,setImageList]=useState([]);
    const [imageUrl,setImageUrl]=useState(ghibli1);

    const [toDo, setToDo]=useState('');
    
    const [ToDoList, setToDoList]= useState([]);
    const todoRef=collection(db,'Users',user,'ToDos');
    const todoQuery= query(todoRef, where('state', '==', 'incomplete'))

    const [url,setUrl]=useState('');
    const [urlShow,setURlShow]=useState(false);
    

    

    

    const AddToDo=async()=>{
      await addDoc(todoRef,{
        name: toDo,
        state: 'incomplete'
      })
     
    }

    const CompleteToDo=async({id})=>{
      await updateDoc(doc(todoRef,id),{
        state:'complete'
      })
      
    }
    
    
 
    //This code is for location and navigation, no timer logic


    //Quickbar code
    const [mediaShow, setMediaShow]= useState(false);
    const [trendShow, setTrendShow] = useState(false);
    const [scopeShow, setScopeShow] = useState(false);
    const [timerShow, setTimerShow] = useState(false);
    const [newtimershow,setNewTimerShow]=useState(false);
    const [imageShow, setImageShow]=useState(false);
    const [todoShow, setToDoShow]=useState(false);
  
    
    const [tree,setTree]= useState(new Audio(treeS));
    const [ocean,setOcean]= useState(new Audio(seaS))
    const [rain,setRain]= useState(new Audio(RainS))
    const [night,setNight]= useState(new Audio(NightS));
    const [wind,setWind]= useState(new Audio(WindS));
    const [fire,setFire]=useState(new Audio(FireS));
    const [alarm,setAlarm]=useState(new Audio(AlarmS))

    const treeSound=()=>{
    
      tree.play()
      tree.loop=true;
    }

    const OceanSound=()=>{
    
      ocean.play();
      ocean.loop=true;
    }
    
    const RainSound=()=>{
     
      rain.play();
      rain.loop=true;
    }
    
    const NightSound=()=>{
      
      night.play();
      night.loop=true
    }
    
    const WindSound=()=>{
      
      wind.play();
      wind.loop=true
    }
    
    const FireSound=()=>{
      
      fire.play();
      fire.loop=true
      
    }

  

    //New Times Modal 

    const [newWorkMinutes, setNewWorkMinutes]= useState(45);
    const [newBreakMinutes,setNewBreakMinutes]=useState(15);
   

    
    

    const WT=location.state.WT;
    const BT=location.state.BT;

    
   

    let OWTSum= location.state.OWTsum;
    let OBTsum=location.state.OBTsum;

    let Wtsum=0;
    let Btsum=0;

    let NWtsum=0;
    let NBtsum=0;

    const [FWT,setFWT]=useState(Wtsum)
    const [FBT,setFBT]=useState(Btsum)

    
    const NT= location.state.NT
  

   


    const [finWorkTime, setFinWorkTime]= useState(location.state.workMinutes);
    const [finBreakTime,setFinBreakTime]=useState(location.state.breakMinutes);



    const [subjectList, setSubjectList] =useState([]);

  

 
 
 
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


  //Quick Trends Stuff 

  const sesRef = collection(db,'Users',user,'Sessions');

  var datesArray=[];
  var WTArray=[];
  var BTArray=[];

  const getData=async({sub})=>{
    const q = query(sesRef, where('subject','==',sub), limit(5));
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

  const [userData,setChartData] = useState(
    {
      labels: ['Loading'],
      datasets:[{
        label: 'Loading',
        data: null
      }]
      
    }
  )


  //Quick scopes section

  const scoperef= collection(db,'Users',user,'Scopes');
  const [scopeList, setScopeList]=useState([]);
  const [newTask, setNewTask]=useState('')

  const movetask=async({id, task})=>{
    const ref = doc(db,'Users',user,'Scopes',id)
    await updateDoc(ref,{
      incomplete: arrayRemove(task),
      complete: arrayUnion(task)


    });
   
    
    
   }

   const movetaskBack=async({id,task})=>{
    const ref = doc(db,'Users',user,'Scopes',id)
    await updateDoc(ref,{
      incomplete: arrayUnion(task),
      complete: arrayRemove(task)
    })
   }

   

  const newTassk=async({id})=>{
    const newRef=doc(db,'Users', user, 'Scopes', id)
    await updateDoc(newRef,{
      incomplete: arrayUnion(newTask)
    })
    
  }



 



   
   

   //Timer code
   
   const settingsInfo = location.state;
   let workSeconds = settingsInfo.workMinutes*60;
   let breakSeconds= settingsInfo.breakMinutes*60;

   const [isPaused, setIsPaused]= useState(false); //checks if paused or not
   const [mode, setMode] = useState('work')//work,break, pause
   const [secondsLeft, setSecondsLeft] = useState(0);//decides the seconds left
   
   const [disabled, setDisabled]=useState(false);

   const secondsLeftRef = useRef(secondsLeft);//references the main objects in order to keep things consistent
   const isPausedRef = useRef(isPaused);
   const modeRef = useRef(mode);
   
   const totalSeconds = mode==='work'? //total seconds is = to which ever mode chosen
   workSeconds//multiplies the workminutes by 60 to become actual minutes
   : breakSeconds //multiplies the breakminutes by 60 to become actual minutes

   



   function initTimer(){ //initializes the timer
    secondsLeftRef.current= workSeconds; //current seconds left is = to work minutes
    setSecondsLeft(secondsLeftRef.current); //sets the seconds left to the the current ref
    

   }

   function switchMode(){

    const nextMode = modeRef.current === 'work' ? 'break' : 'work';
    const nextSeconds = (nextMode === 'work' ? settingsInfo.workMinutes : settingsInfo.breakMinutes) * 60;

    setMode(nextMode);
    modeRef.current = nextMode;

    setSecondsLeft(nextSeconds);
    secondsLeftRef.current = nextSeconds;
      

    
//sets mode to the next mode 
    
   
    
   }

   function tick(){ 
   
      secondsLeftRef.current--;//minuses by 1 each time
      setSecondsLeft(secondsLeftRef.current);
      
   }
  

   useEffect(()=>{
    docSnap()
    console.log(OBTsum)
    console.log(OWTSum)
   
  
   
    initTimer();
    listAll(imageListRef).then((result)=>{
      result.items.forEach((item)=>{
        getDownloadURL(item).then((url)=>{
         if(imageList.includes(url)){
          return null
         }else{
          setImageList((prev)=>[...prev,url])
         }
        })
      })
    })
    onSnapshot(scoperef, (snapshot) => {
      setScopeList(
         snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
       );

       onSnapshot(todoQuery,(snap)=>{
        setToDoList(
          snap.docs.map((doc)=> ({ ...doc.data(), id: doc.id }))
        )
       } )
       
       
       
     });
  
    
    const interval =setInterval(()=>{
      if (isPausedRef.current){  //if paused nothing happens
        return;
      }if(secondsLeftRef.current===0){ //if its at 0 switch the mode
        switchMode();
        alarm.play()
        if (modeRef.current==='break'){
          if(NT===true){
            NWtsum+=newWorkMinutes
            console.log(OWTSum+NWtsum);
  
            setFinWorkTime(OWTSum+NWtsum)
  
           }else if (NT===false){
            Wtsum+=WT
            console.log(Wtsum)
            setFinWorkTime(Wtsum)
            setFWT(Wtsum)
           }
        }
        
        if(modeRef.current==='work'){         
           
         
          if(NT===true){
            NBtsum+=newBreakMinutes
            console.log(OBTsum+NBtsum);
            setFinBreakTime(NBtsum+OBTsum)

          }else if (NT===false){
            Btsum+=BT
          console.log(Btsum)
          setFinBreakTime(Btsum) ;
          setFBT(Btsum)
          }
        }
    

        
      
        
      }
      tick(); //ticks
    }, 10);
    //timeout is 1000 go, activates how much should be minused by
    return ()=>clearInterval(interval); //clears the interval
   },  [settingsInfo]);


   const percentage = Math.round(secondsLeft/totalSeconds *100); //rounds the number 
   const minutes = Math.floor(secondsLeft/60); 
   let seconds = secondsLeft%60;
   if (seconds<10) seconds='0'+seconds;
   
  
 
     
  

 
   

 //AddDoc function

 const doneHand=async()=>{
  await addDoc(collection(db, 'Users',user,'Sessions'),{
    WorkTime: finWorkTime,
    BreakTime: finBreakTime,
    subject: subject,
    description: description,
    rating: rating,
    time: format(new Date(), 'yyyy/MM/dd')


  })
  tree.pause();
  ocean.pause();
  wind.pause();
  night.pause();
  fire.pause();
  rain.pause();
  alarm.pause()
  
}

  return (
   
    <div style={{background:`url(${imageUrl}) no-repeat`,minWidth:'100vw', minHeight:'100vh', display:'flex', paddingTop:'20px', paddingBottom:'10px',maxHeight:'100%', maxWidth:'100%'}}>
      <div className="quickBar">
    <Quickbar
      L1={<Button  variant='light-outline' onClick={()=>{setMediaShow(true)}}><MusicNoteBeamed style={{color:'white', }}/></Button>}
      L2={<Button  variant='light-outline'  onClick={()=>{setTimerShow(true)}}><Stopwatch style={{color:'white', }}/></Button>}
      L3={<Button  variant='light-outline'   onClick={()=>{setTrendShow(true);getData({sub:subject})}}><BarChart style={{color:'white', }}/></Button>}
      L4={<Button  variant='light-outline'  onClick={()=>{setScopeShow(true)}}><Bullseye style={{color:'white', }}/></Button>}
      L5={<Button  variant='light-outline' onClick={()=>{setImageShow(true)}}><ImageAlt style={{color:'white', }}/></Button>}
      L6={<Button  variant='light-outline' onClick={()=>{setToDoShow(true)}}><ListTask style={{color:'white', }}/></Button>}
      L8={<Button  variant='light-outline' onClick={()=>{setURlShow(true)}}><Youtube style={{color:'white', }}/></Button>}
      L7={<Button  variant='light-outline' onClick={()=>{nav('/Dashboard')}}><BoxArrowLeft style={{color:'white', }}/></Button>}
      
    />
  </div>
      
      <div style={{placeItems:'center', width:'80vw'}}>
      <div className='Timer' style={{minWidth:'200px',maxWidth:'500px', marginLeft:'50%',alignItems:'center', marginTop:'10%', placeItems: 'center', marginRight:'10px'}}>
        <p style={{textAlign:'center', fontSize:'20px', color:'lightgray'}}>Studying {subject}</p>
    <CircularProgressbar value={percentage} text={minutes+':'+seconds} styles={buildStyles({rotation:0,strokeLinecap:0,
    textColor: '#fff',
    pathColor:mode === 'work' ? purple : green,
    
    
    })}
    />
    
    <div style={{paddingLeft:'32%', paddingTop:'30px'}}>
    {isPaused? <Button  onClick={() => { setIsPaused(false); isPausedRef.current = false; alarm.pause() }}disabled={disabled} style={{margin:'10px'}} variant='outline-light'><Play style={{height:'25px', width:'25px'}}/></Button>:
    <Button  onClick={() => { setIsPaused(true); isPausedRef.current = true;alarm.pause()}} disabled={disabled} style={{margin:'10px'}} variant='outline-light'> <Pause style={{height:'25px', width:'25px'}}/></Button>}
    
    <Button  onClick={()=>{setModalShow(true)}} style={{margin:'10px'}} variant='outline-light'> Done!</Button>
    </div>
  
    
    <Modal
       show={modalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      onHide={()=>setModalShow(false)}
      className='thin_modal'
     
      centered>
      <Modal.Header closeButton closeVariant='white' >
        <Modal.Title  id="contained-modal-title-vcenter">
         Time to Add Your Session!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <h3  style={{fontSize:'20px', fontWeight:'400'}}>Add a rating to your session:</h3>
        <h4 style={{fontSize:'16px', fontWeight:'400', marginTop:'15px'}}>Rating⭐: {rating}</h4>
        <div style={{marginBottom:'20%',color:'lightgray'}}>
        <ReactSlider
        className='slider purple'
        thumbClassName='thumb'
        trackClassName='track'
        value={rating}
        
        onChange={newValue => setRating(newValue)}
        min={0}
        max={5}
        
        />
        </div>
       <Form style={{marginTop:'40px'}}>
        <Form.Group>
          
          <Form.Control className='special_modal' as='textarea' rows={3} placeholder='Enter a description' style={{resize:'none'}} onChange={(e)=>{setDescription(e.target.value)}}/>
        </Form.Group>
       </Form>
      </Modal.Body>
      <Modal.Footer>
 
       <Button onClick={()=>{doneHand();nav(`/Dashboard/`)}} >Done</Button>
      </Modal.Footer>
    </Modal>

   
  </div>
      </div>

  <div className="QuickBarModals" style={{float:'left'}}>
  
   <div className="media">
   
   <Modal className='timer-modal'
     show={mediaShow}
     onHide={()=>{setMediaShow(false)}}
    
     style={{background:'none'}}
     >
      <Modal.Header closeButton closeVariant='white' className='handle'>
        Sounds
      </Modal.Header>
      <Modal.Body style={{display:'flex', flexDirection:'column'}}>
       
         <Card variant='outline-light' style={{background:'#282b2e' , display:'flex', marginBottom:'20px', fontWeight:'lighter', padding:'15px', cursor:'pointer',color:'lightgray'}}  >
                      <Row>
                      <Col xs={4} > <Tree style={{height:'30px', width:'50px'}}/></Col>
                      <Col>< FormCheck style={{marginLeft:'70%', marginTop:'3%'}} type='switch' onChange={(e)=>{if(e.target.checked){treeSound()}else{tree.pause()}}}/></Col>
                      </Row></Card>
        <Card variant='outline-light' style={{background:'#282b2e' , display:'flex', marginBottom:'20px', fontWeight:'lighter', padding:'15px', cursor:'pointer',color:'lightgray'}}  >
                      <Row>
                      <Col xs={4} > <Water style={{height:'30px', width:'50px'}}/></Col>
                      <Col>< FormCheck style={{marginLeft:'70%', marginTop:'3%'}}  type='switch' onChange={(e)=>{if(e.target.checked){OceanSound()}else{ocean.pause()}}}/></Col>
                      </Row></Card>
        <Card variant='outline-light' style={{background:'#282b2e' , display:'flex', marginBottom:'20px', fontWeight:'lighter', padding:'15px', cursor:'pointer',color:'lightgray'}}  >
                      <Row>
                      <Col xs={4} > <CloudDrizzle style={{height:'30px', width:'50px'}}/></Col>
                      <Col>< FormCheck style={{marginLeft:'70%', marginTop:'3%'}} type='switch' onChange={(e)=>{if(e.target.checked){RainSound()}else{rain.pause()}}}/></Col>
                      </Row></Card>
        <Card variant='outline-light' style={{background:'#282b2e' , display:'flex', marginBottom:'20px', fontWeight:'lighter', padding:'15px', cursor:'pointer',color:'lightgray'}}  >
                      <Row>
                      <Col xs={4} > <Moon style={{height:'30px', width:'50px'}}/></Col>
                      <Col>< FormCheck style={{marginLeft:'70%', marginTop:'3%'}} type='switch' onChange={(e)=>{if(e.target.checked){NightSound()}else{night.pause()}}}/></Col>
                      </Row></Card>
       
        <Card variant='outline-light' style={{background:'#282b2e' , display:'flex', marginBottom:'20px', fontWeight:'lighter', padding:'15px', cursor:'pointer',color:'lightgray'}}  >
                      <Row>
                      <Col xs={4} > <Wind style={{height:'30px', width:'50px'}}/></Col>
                      <Col>< FormCheck style={{marginLeft:'70%', marginTop:'3%'}} type='switch' onChange={(e)=>{if(e.target.checked){WindSound()}else{wind.pause()}}}/></Col>
                      </Row></Card>
        <Card variant='outline-light' style={{background:'#282b2e' , display:'flex', marginBottom:'20px', fontWeight:'lighter', padding:'15px', cursor:'pointer',color:'lightgray'}}  >
                      <Row>
                      <Col xs={4} > <Fire style={{height:'30px', width:'50px'}}/></Col>
                      <Col>< FormCheck style={{marginLeft:'70%', marginTop:'3%'}} type='switch' onChange={(e)=>{if(e.target.checked){FireSound()}else{fire.pause()}}}/></Col>
                      </Row></Card>
      
       <div style={{placeItems:'center'}}>
      
       </div>

      </Modal.Body>

    </Modal>
   
   </div>
  
   <div className="time">
   <Modal className='timer-modal'
     show={timerShow}
     onHide={()=>{setTimerShow(false)}}
     
     style={{background:'none'}}
     >
      <Modal.Header closeButton closeVariant='white'>
        Timer
      </Modal.Header>
      <Modal.Body>
      <div className="times" style={{backgroundColor:'rgb(12,12,12)', display:'flex', flexDirection:'column', placeItems:'center', margin:'10px', borderRadius:'20px', padding:'20px',color:'lightgray'}}>
                <p style={{fontSize:'25px'}} >Select Your Times:</p>
              <label style={{marginLeft:'20px', marginTop:'10px'}}>Work Minutes: {newWorkMinutes}:00</label>
              <ReactSlider 
              className='slider'
              thumbClassName='thumb'
              trackClassName='track'
              value={newWorkMinutes}
              onChange={newValue => setNewWorkMinutes(newValue)}
              min={1}
              max={120}
              
              
              />
            

            <label style={{marginLeft:'20px'}}>Break Minutes: {newBreakMinutes}:00</label>
              
              <ReactSlider 
              className='slider green'
              thumbClassName='thumb'
              trackClassName='track'
              value={newBreakMinutes}
              onChange={newValue => setNewBreakMinutes(newValue)}
              min={1}
              
              max={120}
              
              
              />
           
              </div>

               

      </Modal.Body>
      <Modal.Footer>
        <Button variant='dark' onClick={()=>{nav(`/Timer/`, {state:{
                  workMinutes: newWorkMinutes, 
                  breakMinutes: newBreakMinutes,
                  subject: subject, 
                  WT: newWorkMinutes, 
                  BT: newBreakMinutes, 
                  OWTsum:FWT,
                  OBTsum:FBT,
                  NT:true
                 }}); 
                 setTimerShow(false)}} >Apply Changes</Button>
      </Modal.Footer>

    </Modal>
   </div>
   <div className="chart">
   <Modal className='timer-modal'
     show={trendShow}
     onHide={()=>{setTrendShow(false)}}
     
     style={{background:'none'}}
     >
      <Modal.Header closeButton closeVariant='white'>
        Quick Trends
      </Modal.Header>
      <Modal.Body>
        <h4>Trends for {subject}</h4>
        <div style={{width:400, margin: '20px', display: 'flex'}}> 
        <Line data={userData} />

        </div>

      </Modal.Body>

    </Modal>
   </div>
   <div className="scopes">
   <Modal className='timer-modal'
     show={scopeShow}
     onHide={()=>{setScopeShow(false)}}
     
     style={{background:'none'}}
     >
      <Modal.Header closeButton closeVariant='white'>
        Quick Scopes
      </Modal.Header>
      <Modal.Body>
        {scopeList.map((scop)=>{
          return(
            <Accordion  style={{background:'rgb(12,12,12)', borderRadius:'10px', marginBottom:'10px' }} >
              <Accordion.Header >
                {scop.title}
              </Accordion.Header>
              <Accordion.Body>
              <h1  style={{fontWeight:'bold', backgroundColor:'RGB(12,12,12)', padding:'10px', margin:'10px', borderRadius:'10px' ,color:'lightgray'}}>{scop.title}</h1>
                     
                     <p style={{fontWeight:'400', backgroundColor:'RGB(12,12,12)', padding:'10px', margin:'10px', borderRadius:'10px' ,fontWeight:'lighter', fontSize:'20px',color:'lightgray'}}>Description:<br/>{scop.description} minutes</p>
                     
                     <div className="mbod">
                      

                       <div className="Incomplete" style={{backgroundColor:'RGB(12,12,12)', padding:'10px', margin:'10px', borderRadius:'10px' ,color:'lightgray'}}>
                       <h3>Incomplete:</h3>
                       <div style={{display:'inline'}}>
                          <Form style={{display:'flex', marginBottom:'10px'}}>
                             <Form.Control className='special_modal' placeholder='Add a Task' style={{width:'80%'}} onChange={(e)=>{setNewTask(e.target.value)}}/>
                             <Button style={{marginLeft:'10px'}} onClick={()=>{newTassk({id:scop.id});scop.incomplete.push(newTask)}}>Add</Button>
                           </Form>
                          </div>

                             {scop.incomplete?.map((inc)=>{
                       return(
                         <div className="list">

                           <Button  variant="secondary"  value={inc}  style={{marginRight:'5px', marginBottom:'5px'}} onClick={()=>{
                           movetask({id:scop.id, task:inc}); 
                           var del= scop.incomplete.indexOf(inc); 
                           console.log(del);
                           scop.incomplete.splice(del,1);
                            scop.complete.push(inc)}}><Check/></Button>
                           <label style={{marginBottom: '5px'}}>{inc}</label><br/>

                         </div >
                       )
                     })}
                       </div>

                       <div className="Complete"  style={{backgroundColor:'RGB(12,12,12)', padding:'10px', margin:'10px', borderRadius:'10px' ,color:'lightgray'}}>
                       <h3>Complete:</h3>
                       {scop.complete?.map((comp)=>{
                       return(
                         <div className="list">

                         
                           <Button  variant="secondary" value={comp}  style={{marginRight:'5px', marginBottom:'5px'}} onClick={()=>{
                            movetaskBack({id:scop.id, task:comp}); 
                              var del = scop.complete.indexOf(comp);
                              scop.complete.splice(del,1)
                               scop.incomplete.push(comp)}}><Check/></Button>
                           <label style={{marginBottom: '5px'}}>{comp}</label><br/>
                         
                           

                         </div >
                       )
                     })}
                       </div>
                 
                    

                   
                        


                            
                       
                     </div>
              </Accordion.Body>

            </Accordion>
          )
        })}

      </Modal.Body>

    </Modal>
    
    
    <Modal
    className='timer-modal'
    show={imageShow}
    onHide={()=>{setImageShow(false)}}
    
    style={{background:'none'}}
    >
    
   
    <Modal.Header closeButton closeVariant='white'>
       Worlds
     </Modal.Header>

     <Modal.Body style={{display:'flex'}}>
     
     
       <Container>
        <Row>
          <Col>
          {imageList.map((url)=>{
        return(
    
          
          <Image style={{margin:'0', cursor:'pointer', padding:'5px', width:'50%'}} src={url} onClick={()=>{setImageUrl(url)}} fluid/>
         
       
       
        )
       
      })}
          
          </Col>
        </Row>
       </Container>
       
       
        

     </Modal.Body>

    </Modal>

    <Modal
    className='timer-modal '
    show={todoShow}
    onHide={()=>{setToDoShow(false)}}
    
    
    >
      <Modal.Header closeButton closeVariant='white'>
        To Dos
      </Modal.Header>
      <Modal.Body>
      <Form style={{display:'flex', padding:'20px'}}>
        <FormControl style={{width:'80%', marginRight:'15px'}} onChange={(e)=>{setToDo(e.target.value)}}/>
        <Button onClick={()=>{AddToDo()}} variant='outline-light'>Add! </Button>
      </Form>
      <hr style={{ color:'lightgray',backgroundColor:'lightgray' ,width:'100%',}}/>
      

      {ToDoList.map((todos)=>{
        return(
          <Card 
          style={{background:'#282b2e' , display:'flex', marginBottom:'20px', fontWeight:'lighter', padding:'15px', cursor:'pointer',color:'lightgray'}} 
          
          breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
          minBreakpoint="xxs">
           <Row>
            <Col>
            <h3 style={{fontWeight:'400', fontSize:'20px'}}>{todos.name}</h3></Col>
            <Col><Button  variant="secondary"  onClick={()=>{
              CompleteToDo({id: todos.id})}} style={{float:'right'}} ><Check/></Button></Col>
           </Row>
        
            </Card>
         
          
        )
      })}

      </Modal.Body>



    </Modal>

   
    <Draggable>
    <Card
    className='timer-modal'
    show={urlShow}
    onHide={()=>{setURlShow(false)}}
  
   
   style={{boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',backdropFilter: 'blur( 50px )', background:'rgba( 255, 255, 255, 0.25 )',}}>
    
      <Card.Header  closeButton closeVariant='white' >
        Media
       
      </Card.Header>
      <Card.Body>
      <Form style={{display:'flex', padding:'20px', flexDirection:'column'}}>
        <p>Enter URL</p>
        <FormControl style={{width:'80%', marginRight:'15px'}} onChange={(e)=>{setUrl(e.target.value)}} />
       
      </Form>
      <hr style={{ color:'lightgray',backgroundColor:'lightgray' ,width:'100%',}}/>
     <div style={{height:'350px'}}>
     <ReactPlayer url={url} width='100%' height='100%' stopOnUnmount={false} pip={true} controls={true} playing={()=>{if(urlShow==='true'||urlShow==='false'){return true}}}/>
     </div>

      

      </Card.Body>



    </Card>

    </Draggable>
   </div>
  </div>
  
  </div>
  )
}

export default Timer