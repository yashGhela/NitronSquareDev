import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useState , useRef} from 'react'
import { CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig';
import useSound from 'use-sound';
import alarm from '../Components/Alarm.mp3';
import './Timer.css';


function Timer() {
  
  
    const purple= '#8165BA';
    const green = '#70FFB2';
    const location = useLocation();
    const nav=useNavigate();
    const goSet=()=>{
      nav('/SesSettings', {state: {user:user}});
    }
    const user = location.state.user;
    const subject= location.state.subject;
    const [play]=useSound(
      alarm,
      {volume: 0.5}
    )

   
   //This code is for location and navigation, no timer logic

   //Timer code
   
   const settingsInfo = location.state;

   const [isPaused, setIsPaused]= useState(false); //checks if paused or not
   const [mode, setMode] = useState('work')//work,break, pause
   const [secondsLeft, setSecondsLeft] = useState(0);//decides the seconds left

   const secondsLeftRef = useRef(secondsLeft);//references the main objects in order to keep things consistent
   const isPausedRef = useRef(isPaused);
   const modeRef = useRef(mode);
   
   const totalSeconds = mode==='work'? //total seconds is = to which ever mode chosen
   settingsInfo.workMinutes*60 //multiplies the workminutes by 60 to become actual minutes
   : settingsInfo.breakMinutes*60 //multiplies the breakminutes by 60 to become actual minutes
   

   function initTimer(){ //initializes the timer
    secondsLeftRef.current= settingsInfo.workMinutes*60; //current seconds left is = to work minutes
    setSecondsLeft(secondsLeftRef.current); //sets the seconds left to the the current ref

   }

   function switchMode(){
    const nextMode = modeRef.current ==='work'?'break':'work'; //first mode is work then break then back to work
    const nextSeconds = (nextMode==='work'?  //decides how to determine multiplaction of mode minutes
    settingsInfo.workMinutes:
    settingsInfo.breakMinutes)*60
    setMode(nextMode);//sets mode to the next mode 
    modeRef.current= nextMode;
    setSecondsLeft(nextSeconds);//sets seconds to next seconds
    secondsLeftRef.current = nextSeconds;
    play();
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
      }if(secondsLeftRef.current===0){ //if its at 0 switch the mode
        switchMode();
        play();
        setIsPaused(true);
        isPausedRef.current=true
        
      }
      tick(); //ticks
    }, 1000);//timeout is 1000 go, activates how much should be minused by
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
    time: `${day}/${month}/${year}`

  });
  nav('/Dashboard', {state:{user:user}})
}

  return (
   
  <div className='Timer' style={{width:'800px', marginLeft:'550px',alignItems:'center'}}>
    <CircularProgressbar value={percentage} text={minutes+':'+seconds} styles={buildStyles({rotation:0,strokeLinecap:0,
    textColor: '#fff',
    pathColor:mode === 'work' ? purple : green,
    
    })}/>
    {isPaused? <button className='Gobtn1' onClick={() => { setIsPaused(false); isPausedRef.current = false; }}>Play</button>:
    <button className='Gobtn1'  onClick={() => { setIsPaused(true); isPausedRef.current = true;  }} > Pause</button>}
    <button className='Gobtn1' onClick={goSet}>Settings</button>
    <button className='Gobtn1' onClick={doneHand}>Done!</button>
    
   
  </div>
  )
}

export default Timer