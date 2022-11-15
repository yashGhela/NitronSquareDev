import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ReactSlider from 'react-slider';
import './SesSettings.css'





function SesSettings() {

  const [workMinutes, setWorkMinutes] = useState(45);//sets work minutes
  const [breakMinutes, setBreakMinutes] = useState(15);//sets break minutes
  let location = useLocation();
  const user= location.state.user

  let nav = useNavigate();

  const GoCont =()=>{
    nav('/Timer', {state:{workMinutes: workMinutes, breakMinutes: breakMinutes, user:user}})//passes workminutes,breakminutes and user thru to next page
  }
  const goHom=()=>{
    nav('/Dashboard', {state:{user:user}});
  }
  
  return (
    <div className='SesSettings'>
      <label>Work Minutes: {workMinutes}:00</label>
      <ReactSlider 
      className='slider'
      thumbClassName='thumb'
      trackClassName='track'
      value={workMinutes}
      onChange={newValue => setWorkMinutes(newValue)}
      min={1}
      max={120}
      
      
      />

      <label>Break Minutes: {breakMinutes}:00</label>
      <ReactSlider 
      className='slider green'
      thumbClassName='thumb'
      trackClassName='track'
      value={breakMinutes}
      onChange={newValue => setBreakMinutes(newValue)}
      min={1}
      max={120}
      
      
      />

      <button className='Gobtn1' onClick={GoCont}> Start Your Session!</button>
      <button className='Gobtn1' onClick={goHom}> Back</button>
    </div>
  )
}

export default SesSettings