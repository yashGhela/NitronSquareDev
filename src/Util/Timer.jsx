import React, { useEffect, useState , useRef} from 'react'
import { CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useLocation, useNavigate } from 'react-router-dom';

import './Timer.css';


function Timer() {
  
    const purple= '#8155BA';
    const green = '#70FFB2';
    const location = useLocation();
    const nav=useNavigate();
    const goSet=()=>{
      nav('/SesSettings');
    }
   //This code is for location and navigation, no timer logic

   //Timer code
   
   const settingsInfo = location.state;

   const [isPaused, setIsPaused]= useState(false);
   const [mode, setMode] = useState('work')//work,break, pause
   const [secondsLeft, setSecondsLeft] = useState(0);

   const secondsLeftRef = useRef(secondsLeft);
   const isPausedRef = useRef(isPaused);
   const modeRef = useRef(mode);
   
   const totalSeconds = mode==='work'?
   settingsInfo.workMinutes*60
   : settingsInfo.breakMinutes*60
   

   function initTimer(){
    secondsLeftRef.current= settingsInfo.workMinutes*60;
    setSecondsLeft(secondsLeftRef.current);

   }

   function switchMode(){
    const nextMode = modeRef.current ==='work'?'break':'work';
    const nextSeconds = (nextMode==='work'? 
    settingsInfo.workMinutes:
    settingsInfo.breakMinutes)*60
    setMode(nextMode);
    modeRef.current= nextMode;
    setSecondsLeft(nextSeconds);
    secondsLeftRef.current = nextSeconds;
   }

   function tick(){
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
   }

   useEffect(()=>{
    initTimer();
    const interval =setInterval(()=>{
      if (isPausedRef.current){
        return;
      }if(secondsLeftRef.current===0){
        return switchMode();
      }
      tick();
    }, 1000);
    return ()=>clearInterval(interval);
   },  [settingsInfo]);

   const percentage = Math.round(secondsLeft/totalSeconds *100);
 const minutes = Math.floor(secondsLeft/60);
 let seconds = secondsLeft%60;

 if (seconds<10) seconds='0'+seconds
   

  return (
   
  <div className='Timer'>
    <CircularProgressbar value={percentage} text={minutes+':'+seconds} styles={buildStyles({rotation:0,strokeLinecap:0,
    textColor: '#fff',
    pathColor:mode === 'work' ? purple : green,
    })}/>
    <button className='actnBtn' onClick={() => { setIsPaused(false); isPausedRef.current = false; }}>Play</button>
    <button className='actnBtn'  onClick={() => { setIsPaused(true); isPausedRef.current = true; }} > Pause</button>
    <button className='actnBtn' onClick={goSet}>Settings</button>
  </div>
  )
}

export default Timer