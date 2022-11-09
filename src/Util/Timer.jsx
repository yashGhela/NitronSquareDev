import React from 'react'
import { CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import './Timer.css';


function Timer() {
  
    const purple= '#8155BA';
    const green = '#70FFB2';
    const white ='#fff'


  return (
   
  <div className='Timer'>
    <CircularProgressbar value={90} text={'60%'} styles={buildStyles({rotation:0,strokeLinecap:0,
    textColor: '#fff',
    pathColor:purple
    })}/>
    <button className='actnBtn'>Play</button>
    <button className='actnBtn'> Pause</button>
    <button className='actnBtn'>Settings</button>
  </div>
  )
}

export default Timer