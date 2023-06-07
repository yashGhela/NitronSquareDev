import React, {useState, useEffect, useRef} from 'react'
import {Alert, Accordion, Button, Card, Col, Form, Modal, Row ,Container, FormControl, Image, FormCheck, CloseButton, ButtonGroup,Badge} from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { db, storage } from '../firebaseConfig';
import SpotifyPlayer from 'react-spotify-player';
import { BarChart, BoxArrowLeft, Bullseye, CameraVideoFill, Check, CloudDrizzle, Fire, ImageAlt, ListTask, Moon, MusicNoteBeamed, Pause, Play, Spotify, StopFill, Stopwatch, Tree, Water, Wind, Youtube } from 'react-bootstrap-icons';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import AlarmS from '../Assets/Alarm.mp3'
import Quickbar from '../Components/Quickbar';
import TimerComp from '../Components/TimerComp';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import Cookies from 'universal-cookie';
import { Helmet } from 'react-helmet';
import { SessionTasks } from '../Components/modals';
import ReactSlider from 'react-slider';


function FreeTimer() {
 
    let nav=useNavigate()
    let worldsort=['Ghibli', 'Mountains','Ocean', 'Forest', 'Rainy','City', 'Animal Crossing', 'Tears of The Kingdom', 'Stardew Valley']
    const ghibli1='https://firebasestorage.googleapis.com/v0/b/nstudy-dev.appspot.com/o/Backgrounds%2FGhibli%2Fghibli%201.png?alt=media&token=747bc1da-4d79-40f4-b793-d1edd3fdf75a'

    let location= useLocation();

    const purple= 'rgb(97, 149, 232)';
    const green = '#70FFB2';
  
   let workSeconds =   45*60;
   let breakSeconds=  15*60;

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
    const nextSeconds = (nextMode === 'work' ? workSeconds :breakSeconds) ;

    setMode(nextMode);
    modeRef.current = nextMode;

    setSecondsLeft(nextSeconds);
    secondsLeftRef.current = nextSeconds;
      

    
//sets mode to the next mode 
    
   
    
   }


    
    //bgs

    const [alarm,setAlarm]=useState(new Audio(AlarmS))
    const [imageShow, setImageShow]=useState(false);
    const [signUpShow, setSignUpShow]=useState(false);
    const [imageList,setImageList]=useState([]);
    const [imageUrl,setImageUrl]=useState(ghibli1);
    const [timershow, setTimerShow]=useState(false);

    const [url,setUrl]=useState('');
    const [urlShow,setURlShow]=useState(false);
    
    const [spotifyShow,setSpotifyShow]=useState(false);
    
    const [toDo, setToDo]=useState('');
    const [show,setShow]=useState(false);

    const [newWorkMinutes, setNewWorkMinutes]=useState(45);
    const [newBreakMinutes, setNewBreakMinutes]=useState(15);
    
    const [ToDoList,setToDoList]=useState( [])
    const [finlist,setFinList]=useState([])
    
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


    function tick(){ 
   
        secondsLeftRef.current--;//minuses by 1 each time
        setSecondsLeft(secondsLeftRef.current);
        
     }
  
     useEffect(()=>{

     const cookie= new Cookies()
    const user= cookie.get('useraidt')
    if(user){
      nav(`/Dashboard/`)
    }
      initTimer()
      const interval =setInterval(()=>{
          if (isPausedRef.current){  //if paused nothing happens
            return;
          }if(secondsLeftRef.current===0){ //if its at 0 switch the mode
            switchMode();
            alarm.play()
            
        
    
            
          
            
          }
          tick(); //ticks
        }, 1000);
        //timeout is 1000 go, activates how much should be minused by
        return ()=>clearInterval(interval); 
  
     },[]);



     const percentage = Math.round(secondsLeft/totalSeconds *100); //rounds the number 
     const minutes = Math.floor(secondsLeft/60); 
     let seconds = secondsLeft%60;
     if (seconds<10) seconds='0'+seconds;



  return (


    <div style={{background:`url(${imageUrl}) no-repeat`,minWidth:'100vw', minHeight:'100vh', display:'flex', paddingTop:'20px', paddingBottom:'10px',maxHeight:'100%', maxWidth:'100%', overflow:'auto'}}>
            
        <Helmet>
          <title>Pomodoro Timer | Improvr</title>
          <meta name='description' content='Pomodoro Timer by Nitron Digital. An effecient and simple Pomodoro app for focusing and studying'/>
      
      </Helmet>
      <div className="quickBar">
    <Quickbar
      L1={<Button  variant='light-outline' onClick={()=>{setSignUpShow(true)}}><MusicNoteBeamed style={{color:'white', }}/></Button>}
      L2={<Button  variant='light-outline' onClick={()=>{setTimerShow(true)}}><Stopwatch style={{color:'white', }}/></Button>}
      L3={<Button  variant='light-outline'  onClick={()=>{setSignUpShow(true)}}><BarChart style={{color:'white', }}/></Button>}
      L4={<Button  variant='light-outline' onClick={()=>{setSignUpShow(true)}}><Bullseye style={{color:'white', }}/></Button>}
      L5={<Button  variant='light-outline' onClick={()=>{setImageShow(true)}}><ImageAlt style={{color:'white', }}/></Button>}
      L6={<Button  variant='light-outline' onClick={()=>{setSignUpShow(true)}}><ListTask style={{color:'white', }}/></Button>}
      L8={<Button  variant='light-outline' onClick={()=>{setURlShow(true)}}><Youtube style={{color:'white', }}/></Button>}
      L9={<Button  variant='light-outline' onClick={()=>{setSpotifyShow(true)}}><Spotify style={{color:'white', }}/></Button>}
      L7={<Button  variant='light-outline' onClick={()=>{setSignUpShow(true)}}><BoxArrowLeft style={{color:'white', }}/></Button>}
      
    />
  </div>
     <div style={{placeItems:'center', width:'80vw'}}>          
     <div className='Timer' style={{minWidth:'200px',maxWidth:'500px', marginLeft:'46%',alignItems:'center', marginTop:'10%', placeItems: 'center', marginRight:'10px'}}>
        
        <Container style={{borderRadius:'10px', boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.4 )',backdropFilter: 'blur( 2px )', background:'rgba( 255, 255, 255, 0.25 )', marginTop:'6%', border:'4px solid ', padding:'20px', borderColor:(mode==='work'?purple:green), }}>
         <center>
         <p style={{textAlign:'center', fontSize:'20px', color:'white', marginTop:'0',}}>Sign up for Improvr</p>
         <h1 style={{fontSize:'68px', color:'white', paddingLeft:'0px'}}>{minutes}:{seconds}</h1>
         {isPaused? <Button  onClick={() => { setIsPaused(false); isPausedRef.current = false; alarm.pause() }}disabled={disabled} style={{margin:'10px'}} variant='outline-light'><Play style={{height:'25px', width:'25px'}}/></Button>:
     <Button  onClick={() => { setIsPaused(true); isPausedRef.current = true;alarm.pause()}} disabled={disabled} style={{margin:'10px'}} variant='outline-light'> <Pause style={{height:'25px', width:'25px'}}/></Button>}
     <Button  onClick={()=>{nav('/Login')}} style={{margin:'10px'}} variant='outline-light'> Login</Button>
     <Button  onClick={()=>{setSignUpShow(true)}} style={{margin:'10px'}} variant='outline-light'> Done!</Button>
     
         </center>
        </Container>
        <Button onClick={()=>{setShow(true)}} variant='light' style={{width:'100%', marginTop:'10px'}} size='lg'>Session Tasks</Button>
      
     
     
   </div>
  </div> 
  <SessionTasks 
   show={show} 
   setShow={setShow}  
   setToDo={setToDo} 
   toDo={toDo}
   ToDoList={ToDoList} 
   setToDoList={setToDoList}
   setFinlist={setFinList}
   finlist={finlist}
   
   
  
   />



    
                
            <div className="QuickBarModals" style={{float:'left'}}>

    <Modal className='timer-modal'
     show={timershow}
     onHide={()=>{setTimerShow(false)}}
     
     style={{background:'none'}}
     >
      <Modal.Header closeButton closeVariant='white'>
        Timer
      </Modal.Header>
      <Modal.Body>
      <div className="times" style={{backgroundColor:'rgb(12,12,12)', display:'flex', flexDirection:'column', placeItems:'center', margin:'10px', borderRadius:'20px', padding:'20px',color:'lightgray',}}>
                <p style={{fontSize:'25px'}} >Select Your Times:</p>
              <label style={{marginLeft:'20px', marginTop:'10px'}}>Work Minutes: {newWorkMinutes}:00</label>
              <ReactSlider 
              className='slider'
              thumbClassName='thumb'
              trackClassName='track'
              value={newWorkMinutes}
              onChange={newValue => setNewWorkMinutes(newValue)}
              min={1}
              max={60}
              
              
              />
            

            <label style={{marginLeft:'20px'}}>Break Minutes: {newBreakMinutes}:00</label>
              
              <ReactSlider 
              className='slider green'
              thumbClassName='thumb'
              trackClassName='track'
              value={newBreakMinutes}
              onChange={newValue => setNewBreakMinutes(newValue)}
              min={1}
              
              max={60}
              
              
              />
           
              </div>

               

      </Modal.Body>
      <Modal.Footer>
        <Button variant='dark' onClick={()=>{
                workSeconds=newWorkMinutes*60;
                breakSeconds=newBreakMinutes*60
                initTimer() 
               
                 setTimerShow(false)}} >Apply Changes</Button>
      </Modal.Footer>

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

   style={{boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',backdropFilter: 'blur( 50px )', background:'rgba( 255, 255, 255, 0.25 )',marginBottom:'10px', border:'2px solid #b1b4b5'}}>
   
     <Card.Header style={{display:'flex', borderBottom:'2px solid #b1b4b5'}}>
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
      
      style={{boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',backdropFilter: 'blur( 50px )', background:'rgba( 255, 255, 255, 0.25 )',marginBottom:'10px', border:'2px solid #b1b4b5'}}>
      
        <Card.Header style={{display:'flex', borderBottom:'2px solid #b1b4b5'}}>
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

      <Modal
      className='timer-modal'
      show={signUpShow}
      onHide={()=>{setSignUpShow(false)}}
      
      style={{background:'none'}}>
        <Modal.Header closeButton closeVariant=''>
            Sign up for full access
      </Modal.Header>
      <Modal.Body>
        To access these features you must sign up.
        Sign up below 
        <center>
        <Button onClick={()=>{nav('/SignUp')}}>Get me in</Button>
        </center>
      </Modal.Body>
      </Modal>
   </div>
  </div>

  )
}

export default FreeTimer