import React from 'react'
import { Button } from 'react-bootstrap';
import { Pause, Play } from 'react-bootstrap-icons';
import { useTimer } from 'react-timer-hook';

function Timercomponent({expiryTimestamp, func, isPausedRef, setIsPaused, isPaused, disabled}) {
    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        pause,
        start
        
      } = useTimer({ expiryTimestamp, onExpire: () => func() });
    
    
  return (
    <div>
       <span>{minutes}</span>:<span>{seconds}</span>
      
     
      {isPaused? <Button  onClick={() => { setIsPaused(false); isPausedRef.current = false;  }}disabled={disabled} style={{margin:'10px'}} variant='outline-light'><Play style={{height:'25px', width:'25px'}}/></Button>:
    <Button  onClick={() => { setIsPaused(true); isPausedRef.current = true;}} disabled={disabled} style={{margin:'10px'}} variant='outline-light'> <Pause style={{height:'25px', width:'25px'}}/></Button>}
    </div>
  )
}

export default Timercomponent