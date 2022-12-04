import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useState , useRef} from 'react'
import { CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {  useNavigate , useLocation} from 'react-router-dom';
import { db } from '../firebaseConfig';
import useSound from 'use-sound';
import { Button, Form, Modal } from 'react-bootstrap';
import ReactSlider from 'react-slider';
import Cookies from 'universal-cookie';


function Timer() {
  
   const location = useLocation();
    const purple= '#8165BA';
    const green = '#70FFB2';
    
    const nav=useNavigate();
    const goSet=()=>{
      nav(`/SesSettings/${user}`);
    }
    const cookie = new Cookies()
    const user=cookie.get('useraidt')
    const subject= location.state.subject;
    const [modalShow, setModalShow]= useState(false);
    const [rating, setRating]=useState(0)
    const [disabledM, setDisabledM]= useState(true);
    const [description, setDescription]=useState('');
    

   
   //This code is for location and navigation, no timer logic

   //Timer code
   
   const settingsInfo = location.state;
   const workSeconds = settingsInfo.workMinutes*60;
   const breakSeconds= settingsInfo.breakMinutes*60;

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

       setMode('break');
       modeRef.current='break';
      setSecondsLeft(breakSeconds);
      secondsLeftRef.current= breakSeconds;
      

    
//sets mode to the next mode 
    
   
    
   }

   function tick(){ 
   
      secondsLeftRef.current--;//minuses by 1 each time
      setSecondsLeft(secondsLeftRef.current);
      
   }
  

   useEffect(()=>{
    initTimer();
    
    const interval =setInterval(()=>{
      if (isPausedRef.current){  //if paused nothing happens
        return;
      }if(modeRef.current==='work' && secondsLeftRef.current===0){ //if its at 0 switch the mode
        switchMode();
       
        
      }if(modeRef.current==='break'&&secondsLeftRef.current===0){
        setIsPaused(true);
        
        isPausedRef.current= true;
        setDisabled(true);
        
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
  const current= new Date();
  const day = current.getDate();
  const month = current.getMonth()+1;
  const year=current.getFullYear();
  await addDoc(collection(db, 'Users',user,'Sessions'),{
    WorkTime: settingsInfo.workMinutes,
    BreakTime: settingsInfo.breakMinutes,
    subject: subject,
    description: description,
    rating: rating,
    time: `${year}/${month}/${day}`


  });
  nav(`/Dashboard/${user}`)
}

  return (
   
    <div style={{backgroundColor:'rgb(41, 44, 51)', width:'100%', height:'100vh'}}>
      <div className='Timer' style={{width:'800px', marginLeft:'550px',alignItems:'center'}}>
    <CircularProgressbar value={percentage} text={mode==='break'&&secondsLeftRef.current<=  0?'Done!':minutes+':'+seconds} styles={buildStyles({rotation:0,strokeLinecap:0,
    textColor: '#fff',
    pathColor:mode === 'work' ? purple : green,
    
    })}/>
    <div style={{display:'flex', alignItems:'center', margin:'10px'}}>
    {isPaused? <Button  onClick={() => { setIsPaused(false); isPausedRef.current = false;  }}disabled={disabled} style={{margin:'10px'}} variant='dark'>Play</Button>:
    <Button  onClick={() => { setIsPaused(true); isPausedRef.current = true;}} disabled={disabled} style={{margin:'10px'}} variant='dark'> Pause</Button>}
    <Button  onClick={goSet} style={{margin:'10px'}} variant='dark'>Settings</Button>
    <Button  onClick={()=>{setModalShow(true)}} style={{margin:'10px'}} variant='dark'> Done!</Button>
    </div>
    <Modal
       show={modalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      onHide={()=>setModalShow(false)}
      
      centered>
      <Modal.Header closeButton>
        <Modal.Title  id="contained-modal-title-vcenter">
         Time to Add Your Session!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3  style={{fontSize:'20px', fontWeight:'400'}}>Add a rating to your session:</h3>
        <h4 style={{fontSize:'16px', fontWeight:'400', marginTop:'15px'}}>rating⭐: {rating}</h4>
        <ReactSlider
        className='slider purple'
        thumbClassName='thumb'
        trackClassName='track'
        value={rating}
        onChange={newValue => setRating(newValue)}
        min={0}
        max={5}
        
        />
       <Form style={{marginTop:'20px'}}>
        <Form.Group>
          
          <Form.Control as='textarea' rows={3} placeholder='Enter a description' style={{resize:'none'}} onChange={(e)=>{setDescription(e.target.value)}}/>
        </Form.Group>
       </Form>
      </Modal.Body>
      <Modal.Footer>
       <Button onClick={doneHand} >Done</Button>
      </Modal.Footer>
    </Modal>

   
  </div>
    </div>
  )
}

export default Timer