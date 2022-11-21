import React, { useEffect, useState } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';
import ReactSlider from 'react-slider';
import './SesSettings.css'






function SesSettings() {

  const [workMinutes, setWorkMinutes] = useState(45);//sets work minutes
  const [breakMinutes, setBreakMinutes] = useState(15);//sets break minutes
  const [subject, setSubject] = useState('');//sets the subject for the user
  const [isChecked, setIsChecked]=useState(false); 
  const [isCheckederr, setIsCheckederr]=useState('');
  const [disabled, setDisabled]=useState(true);
  const SubjectsList=['Algebra','Geometry','History','Physics','Chemistry','First Language', 'Second Language','Third Language', 'Economics', 'Coding','Computers','Biology','History','Business','EGD','Geography','Accounting']
  let location = useLocation();
  const user= location.state.user

  let nav = useNavigate();

  const GoCont =()=>{
    nav('/Timer', {state:{workMinutes: workMinutes, breakMinutes: breakMinutes, user:user, subject: subject}})//passes workminutes,breakminutes and user and subject thru to next page
  }
  const goHom=()=>{
    nav('/Dashboard', {state:{user:user}});
  }

  
  
  useEffect(()=>{
    
     setDisabled(formValidation());
    
  })

  const formValidation = () =>{  //checks for errors
    if (isChecked ===false){
      setIsCheckederr('Name cannot be blank');
      return true

    }else{
      setIsCheckederr(null);
      return false
    }}
  


 
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
        {SubjectsList.map((sub)=>{
          return(
            <div className="list">
             
            <input type="checkbox" value={sub} onClick={(e)=>{setSubject(e.target.value); if(e.target.checked){setIsChecked(true)} else{setIsChecked(false)}}} />
            <label>{sub}</label><br/>
          
            </div>
        )})}
      </div>

  

      <button className='Gobtn1' onClick={GoCont} disabled={disabled}> Start Your Session!</button>
      <button className='Gobtn1' onClick={goHom}> Back</button>
    </div>
  )
}

export default SesSettings