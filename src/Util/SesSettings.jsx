import React, { useState } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';
import ReactSlider from 'react-slider';
import './SesSettings.css'






function SesSettings() {

  const [workMinutes, setWorkMinutes] = useState(45);//sets work minutes
  const [breakMinutes, setBreakMinutes] = useState(15);//sets break minutes
  const [subject, setSubject] = useState(''); //sets the subject for the user
  let location = useLocation();
  const user= location.state.user

  let nav = useNavigate();

  const GoCont =()=>{
    nav('/Timer', {state:{workMinutes: workMinutes, breakMinutes: breakMinutes, user:user, subject: subject}})//passes workminutes,breakminutes and user and subject thru to next page
  }
  const goHom=()=>{
    nav('/Dashboard', {state:{user:user}});
  }
  
  return (
    <div className='SesSettings'>
      <h1>Pick a Time:</h1>
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

      <div className="SubjectChoices">
        <h1>Pick A Subject:</h1>
        <input type='checkbox'  value={'Math'} onClick={(e)=>{setSubject(e.target.value)}}/>
        <label for='math' >Math</label><br/>
        <input type='checkbox' value={'English'} onClick={(e)=>{setSubject(e.target.value)}}/>
        <label >English</label><br/>
        <input type='checkbox' value={'Second Language'} onClick={(e)=>{setSubject(e.target.value)}}/>
        <label >Second Language</label><br/>
        <input type='checkbox' value={'Third Language'} onClick={(e)=>{setSubject(e.target.value)}}/>
        <label >Third Language</label><br/>
        <input type='checkbox' value={'Accounting'} onClick={(e)=>{setSubject(e.target.value)}}/>
        <label >Accounting</label><br/>
        <input type='checkbox'value={'Physics'} onClick={(e)=>{setSubject(e.target.value)}} />
        <label >Physics</label><br/>
        <input type='checkbox'value={'Business'} onClick={(e)=>{setSubject(e.target.value)}} />
        <label >Business</label><br/>
        <input type='checkbox'value={'Economics'} onClick={(e)=>{setSubject(e.target.value)}} />
        <label >Economics</label><br/>
        <input type='checkbox' value={'Coding'} onClick={(e)=>{setSubject(e.target.value)}}/>
        <label >Coding</label><br/>
        <input type='checkbox' value={'Computers'} onClick={(e)=>{setSubject(e.target.value)}}/>
        <label >Computers</label><br/>
        <input type='checkbox' value={'Biology'} onClick={(e)=>{setSubject(e.target.value)}}/>
        <label >Biology</label><br/>
        <input type='checkbox' value={'History'} onClick={(e)=>{setSubject(e.target.value)}}/>
        <label >History</label><br/>
        <input type='checkbox' value={'EGD'} onClick={(e)=>{setSubject(e.target.value)}}/>
        <label >EGD</label><br/>
        <input type='checkbox' value={'Geography'} onClick={(e)=>{setSubject(e.target.value)}}/>
        <label >Geography</label><br/>
        
      </div>
  

      <button className='Gobtn1' onClick={GoCont}> Start Your Session!</button>
      <button className='Gobtn1' onClick={goHom}> Back</button>
    </div>
  )
}

export default SesSettings