import { addDoc, collection,doc,getDoc, getDocs, query, limit, where, onSnapshot,updateDoc,arrayUnion, arrayRemove, orderBy, getCountFromServer} from 'firebase/firestore';
import React, { useEffect, useState , useRef} from 'react'
import { CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {  useNavigate , useLocation} from 'react-router-dom';
import { db, storage } from '../firebaseConfig';
import {Alert, Accordion, Button, Card, Col, Form, Modal, Row ,Container, FormControl, Image, FormCheck, CloseButton, ButtonGroup,Badge} from 'react-bootstrap';

import ReactSlider from 'react-slider';
import Cookies from 'universal-cookie';
import Quickbar from '../Components/Quickbar';
import ReactPlayer from 'react-player';
import { BarChart, BoxArrowLeft, Bullseye, CameraVideoFill, Check, CloudDrizzle, Fire, ImageAlt, ListTask, Moon, MusicNoteBeamed, Pause, Play, Spotify, StopFill, Stopwatch, Tree, Water, Wind, Youtube } from 'react-bootstrap-icons';

import { format } from 'date-fns';


import {
  Chart as ChartJS,
} from 'chart.js';


import { getDownloadURL, listAll, ref } from 'firebase/storage';

import SpotifyPlayer from 'react-spotify-player';
import { AddToDo, CompleteToDo, getData, movetask, movetaskBack, newTassk } from '../Util/functions';
import treeS from '../Assets/Nitron Music/Forrest Sounds.mp3'
import seaS from '../Assets/Nitron Music/Ocean Sounds.mp3'
import RainS from '../Assets/Nitron Music/Rain Sounds.mp3'
import NightS from '../Assets/Nitron Music/Night Sounds.mp3'
import WindS from '../Assets/Nitron Music/Wind Sounds.mp3'
import FireS from '../Assets/Nitron Music/Campfire Sounds.mp3'
import AlarmS from '../Assets/Alarm.mp3'
import  { SoundsModal, TrendsModal,ScopesModal, TodoModal,   } from '../Components/modals';





window.Chart = ChartJS


function Timer() {
  

  //basic use 
   const location = useLocation();

    const purple= 'rgb(97, 149, 232)';
    const green = '#70FFB2';

    let worldsort=['Ghibli', 'Mountains','Ocean', 'Forest', 'Video Games', 'Rainy','City']

    //bgs
    
    const ghibli1='https://firebasestorage.googleapis.com/v0/b/nstudy-dev.appspot.com/o/Backgrounds%2FGhibli%2Fghibli%201.png?alt=media&token=747bc1da-4d79-40f4-b793-d1edd3fdf75a'

    let [world,setWorld]=useState('')
    

    let imageListRef= ref(storage,`Backgrounds/${world}`)

    const getWorlds=({id})=>{
      setWorld(id);
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
    }


    const nav=useNavigate();
    
    
    const cookie = new Cookies()
    const user=cookie.get('useraidt');
    const paidt= cookie.get('PAIDT');
    const [stateUp,setStateUp]=useState('complete')

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

    const [url,setUrl]=useState('');
    const [urlShow,setURlShow]=useState(false);
    
    const [spotifyShow,setSpotifyShow]=useState(false);
    


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

    
    
 
    //This code is for location and navigation, no timer logic


    //Quickbar code
    const [mediaShow, setMediaShow]= useState(false);
    const [trendShow, setTrendShow] = useState(false);
    const [scopeShow, setScopeShow] = useState(false);
    const [alert,showAlert]=useState(false)
    const [timerShow, setTimerShow] = useState(false);

    const [imageShow, setImageShow]=useState(false);
    const [todoShow, setToDoShow]=useState(false);
  
    
    const [tree,setTree]= useState(new Audio(treeS));
    const [ocean,setOcean]= useState(new Audio(seaS))
    const [rain,setRain]= useState(new Audio(RainS))
    const [night,setNight]= useState(new Audio(NightS));
    const [wind,setWind]= useState(new Audio(WindS));
    const [fire,setFire]=useState(new Audio(FireS));
    const [alarm,setAlarm]=useState(new Audio(AlarmS))

   
      

   

  

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
      return null;
    }
    setSubjectList(subData)
   
    
  })


  //Quick Trends Stuff 

 
  





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

   const proTimeVal=()=>{
    if(paidt==='Tnf'){
      setMaxTime(210)
    }else {
      setMaxTime(90)
    }
   }
   const[maxTime,setMaxTime]=useState(0)
  

   useEffect(()=>{
    docSnap()
    proTimeVal()
    
   
   
  
   
    initTimer();
   
    onSnapshot(scoperef, (snapshot) => {
      setScopeList(
         snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
       );

       onSnapshot(todoRef,(snap)=>{
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
           
  
            setFinWorkTime(OWTSum+NWtsum)
  
           }else if (NT===false){
            Wtsum+=WT
            
            setFinWorkTime(Wtsum)
            setFWT(Wtsum)
           }
        }
        
        if(modeRef.current==='work'){         
           
         
          if(NT===true){
            NBtsum+=newBreakMinutes
            
            setFinBreakTime(NBtsum+OBTsum)

          }else if (NT===false){
            Btsum+=BT
          
          setFinBreakTime(Btsum) ;
          setFBT(Btsum)
          }
        }
    

        
      
        
      }
      tick(); //ticks
    }, 1000);
    //timeout is 1000 go, activates how much should be minused by
    return ()=>clearInterval(interval); //clears the interval
   },  [settingsInfo]);


   const percentage = Math.round(secondsLeft/totalSeconds *100); //rounds the number 
   const minutes = Math.floor(secondsLeft/60); 
   let seconds = secondsLeft%60;
   if (seconds<10) seconds='0'+seconds;
  


 


  
 
     
  

 
   

 //AddDoc function

 const doneHand=async()=>{
  await getDoc(doc(db,'Users',user)).then(async (snap)=>{
    if(snap.data().type==='free'){
      const colRef=collection(db,'Users',user,'Sessions');
      await getCountFromServer(colRef).then(async (snap)=>{
        if (snap.data().count<500){
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
          alarm.pause();
          nav(`/Dashboard/`)
        }else {
          showAlert(true)
        }

      })
    }else {
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
      alarm.pause();
      nav(`/Dashboard/`)
    }
  })

}

  return (
   
    <div style={{background:`url(${imageUrl}) no-repeat`,minWidth:'100vw', minHeight:'100vh', display:'flex', paddingTop:'20px', paddingBottom:'10px',maxHeight:'100%', maxWidth:'100%', overflow:'auto'}}>
      <div className="quickBar">
    <Quickbar
      L1={<Button  variant='light-outline' onClick={()=>{setMediaShow(true);}}><MusicNoteBeamed style={{color:'white', }}/></Button>}
      L2={<Button  variant='light-outline'  onClick={()=>{setTimerShow(true)}}><Stopwatch style={{color:'white', }}/></Button>}
      L3={<Button  variant='light-outline'   onClick={()=>{setTrendShow(true);getData({sub:subject, setChartData: setChartData});}}><BarChart style={{color:'white', }}/></Button>}
      L4={<Button  variant='light-outline'  onClick={()=>{setScopeShow(true)}}><Bullseye style={{color:'white', }}/></Button>}
      L5={<Button  variant='light-outline' onClick={()=>{setImageShow(true)}}><ImageAlt style={{color:'white', }}/></Button>}
      L6={<Button  variant='light-outline' onClick={()=>{setToDoShow(true)}}><ListTask style={{color:'white', }}/></Button>}
      L8={<Button  variant='light-outline' onClick={()=>{setURlShow(true)}}><Youtube style={{color:'white', }}/></Button>}
      L9={<Button  variant='light-outline' onClick={()=>{setSpotifyShow(true)}}><Spotify style={{color:'white', }}/></Button>}
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
        {alert&&<Alert variant='warning'>You have already created 500 sessions, click here to upgrade to pro for unlimited sessions. <span style={{textDecoration:'underline', cursor:'pointer'}} onClick={()=>{nav('/Settings')}}>Upgrade</span></Alert>}
 
       <Button onClick={()=>{doneHand();}} >Done</Button>
      </Modal.Footer>
    </Modal>

   
  </div>
      </div>

  <div className="QuickBarModals" style={{float:'left'}}>
  
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
              max={maxTime}
              
              
              />
            

            <label style={{marginLeft:'20px'}}>Break Minutes: {newBreakMinutes}:00</label>
              
              <ReactSlider 
              className='slider green'
              thumbClassName='thumb'
              trackClassName='track'
              value={newBreakMinutes}
              onChange={newValue => setNewBreakMinutes(newValue)}
              min={1}
              
              max={maxTime}
              
              
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
   <TrendsModal show={trendShow} setShow={setTrendShow} userData={userData} subject={subject}/>
   
   <div className="scopes">
   <ScopesModal show={scopeShow} setShow={setScopeShow} scopeList={scopeList} newTask={newTask} setNewTask={setNewTask}/>
    
    
    

    <TodoModal show={todoShow} setShow={setToDoShow} ToDoList={ToDoList} stateUp={stateUp} setStateUp={setStateUp} toDo={toDo} setToDo={setToDo}/>

  
    <Modal
    className='timer-modal'
    show={imageShow}
    onHide={()=>{setImageShow(false)}}
    
    style={{background:'none'}}
    >
    
   
    <Modal.Header closeButton closeVariant='white'>
       Worlds
     </Modal.Header>

     <Modal.Body style={{display:'flex', flexDirection:'column'}}>
     <p style={{textAlign:'center'}}>Double click to load</p>
     <ButtonGroup>
   
      <div style={{display: 'flex', margin:'10px',color:'lightgray', overflow:'auto'}}>
      {worldsort.map((i)=>{
         return(
          <Button 
         type="checkbox"
          value={i} 
          variant="outline-light"
          onClick={()=>{getWorlds({id:i})}}
        
          style={{marginRight:'10px'}}
          >
           {i}
         </Button>
         )
      })}
       </div>
      </ButtonGroup>
     
     
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

   
   {urlShow?
   
   <Card
   className='timer-modal'

   style={{boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',backdropFilter: 'blur( 50px )', background:'rgba( 255, 255, 255, 0.25 )',marginBottom:'10px'}}>
   
     <Card.Header style={{display:'flex'}}>
       Media
       <CloseButton style={{marginLeft:'70%'}} onClick={()=>setURlShow(false)}/>
      
     </Card.Header>
     <Card.Body>
     <Form style={{display:'flex', flexDirection:'column'}}>
       <p>Enter URL</p>
       <FormControl style={{width:'80%', marginRight:'15px'}} onChange={(e)=>{setUrl(e.target.value)}} />
      
     </Form>
     <hr style={{ color:'lightgray',backgroundColor:'lightgray' ,width:'100%',}}/>
    <div style={{height:'150px'}}>
    <ReactPlayer url={url} width='100%' height='100%' stopOnUnmount={false} pip={true} controls={true} playing={()=>{if(urlShow==='true'||urlShow==='false'){return true}}}/>
    </div>

     

     </Card.Body>



   </Card>

   :null}

      {spotifyShow? 
      <Card
      className='timer-modal'
      
      style={{boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',backdropFilter: 'blur( 50px )', background:'rgba( 255, 255, 255, 0.25 )',marginBottom:'10px'}}>
      
        <Card.Header style={{display:'flex'}}>
          Spotify
          <CloseButton style={{marginLeft:'70%'}} onClick={()=>setSpotifyShow(false)}/>
          
        </Card.Header>
        <Card.Body>
      
        <SpotifyPlayer

        uri="https://open.spotify.com/playlist/3WLDIcG4Cx2UOPy0rbFhQn?si=d5bed878c963410e"
        view='list'
        theme='black'
        size='large'/>


        

        </Card.Body>



      </Card>:null}
   </div>
  </div>
  
  </div>
  )
}

export default Timer