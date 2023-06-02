import React, { useEffect, useState, useRef} from 'react'
import ReactSlider from 'react-slider';
import { Button, Container, Modal } from 'react-bootstrap';
import { Pause, Play } from 'react-bootstrap-icons';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function TimerComp({location, setModalShow, newWorkMinutes, setFinWorkTime, newBreakMinutes, setFinBreakTime, subject, alarm, setNewWorkMinutes, setNewBreakMinutes, timerShow, setTimerShow, maxTime }) {

    let nav= useNavigate()
    const purple= 'rgb(97, 149, 232)';
    const green = '#70FFB2';
    const settingsInfo = location.state ;
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

   
   const WT=location.state.WT ;
   const BT=location.state.BT ;

   
  

   let OWTSum= location.state.OWTsum;
   let OBTsum=location.state.OBTsum;

   let Wtsum=0;
   let Btsum=0;

   let NWtsum=0;
   let NBtsum=0;

   const [FWT,setFWT]=useState(Wtsum)
   const [FBT,setFBT]=useState(Btsum)

   
   const NT= location.state.NT



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
    initTimer()
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
      return ()=>clearInterval(interval); 

   },[settingsInfo]);

   const percentage = Math.round(secondsLeft/totalSeconds *100); //rounds the number 
   const minutes = Math.floor(secondsLeft/60); 
   let seconds = secondsLeft%60;
   if (seconds<10) seconds='0'+seconds;
  

  return (
    <div>
     
           <div className='Timer' style={{minWidth:'200px',maxWidth:'500px', marginLeft:'50%',alignItems:'center', marginTop:'10%', placeItems: 'center', marginRight:'10px'}}>
        
       <Container style={{borderRadius:'10px', boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.4 )',backdropFilter: 'blur( 2px )', background:'rgba( 255, 255, 255, 0.25 )', marginTop:'6%', border:'4px solid ', padding:'20px', borderColor:(mode==='work'?purple:green), }}>
        <center>
        <p style={{textAlign:'center', fontSize:'20px', color:'white', marginTop:'0',}}>Studying {subject}</p>
        <h1 style={{fontSize:'68px', color:'white', paddingLeft:'0px'}}>{minutes}:{seconds}</h1>
        {isPaused? <Button  onClick={() => { setIsPaused(false); isPausedRef.current = false; alarm.pause() }}disabled={disabled} style={{margin:'10px'}} variant='outline-light'><Play style={{height:'25px', width:'25px'}}/></Button>:
    <Button  onClick={() => { setIsPaused(true); isPausedRef.current = true;alarm.pause()}} disabled={disabled} style={{margin:'10px'}} variant='outline-light'> <Pause style={{height:'25px', width:'25px'}}/></Button>}
   
    <Button  onClick={()=>{setModalShow(true)}} style={{margin:'10px'}} variant='outline-light'> Done!</Button>
        </center>
       </Container>
    
    
  </div>

  <Modal className='timer-modal'
     show={timerShow}
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
    
  )
}

export default TimerComp

