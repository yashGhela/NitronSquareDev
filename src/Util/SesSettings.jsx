
import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import ReactSlider from 'react-slider';
import './SesSettings.css';
import { Button } from 'react-bootstrap';
import {doc, getDoc, getDocs, onSnapshot} from 'firebase/firestore'
import {db} from '../firebaseConfig';




function SesSettings() {

  const [workMinutes, setWorkMinutes] = useState(45);//sets work minutes
  const [breakMinutes, setBreakMinutes] = useState(15);//sets break minutes
  const [subject, setSubject] = useState('');//sets the subject for the user
  const [isChecked, setIsChecked]=useState(false); 
  const [isCheckederr, setIsCheckederr]=useState('');
  const [disabled, setDisabled]=useState(true);
  const [subjectList, setSubjectList] =useState([]);
  const SubjectsList=['Algebra','Geometry','History','Physics','Chemistry','First Language', 'Second Language','Third Language', 'Economics', 'Coding','Computers','Biology','History','Business','EGD','Geography','Accounting']
  
  const user= sessionStorage.getItem('useraidt');
  const sublist=doc(db,'Users',user,'Sessions','SubjectsList')
  


  

  

  let nav = useNavigate();

 
 

  
  
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
    <div className='SesPage'>
      <div className="SeSSettings">
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
             
            <input type="checkbox" value={sub} onClick={(e)=>{setSubject(e.target.value); if(e.target.checked){setIsChecked(true)} else{setIsChecked(false)}}} style={{marginRight:'5px'}}/>
            <label>{sub}</label><br/>
          
            </div>
        )})}
        {isCheckederr&&<h3 style={{color:'red'}}>Please choose a subject</h3>}
      </div>

  

      </div>
      
      <Button variant='primary' style={{width:'100px', color:'white',marginLeft:'20px', marginBottom:'10px' }} onClick={()=>{nav(`/Timer/${user}`, {state:{workMinutes: workMinutes, breakMinutes: breakMinutes, subject: subject}})}} disabled={disabled}> Start Your Session!</Button>
      <Button variant='primary' style={{width:'100px', color:'white',marginLeft:'20px'}}  onClick={()=>{nav(`/Dashboard/${user}`)}}> Back</Button>
    </div>
  )
}

export default SesSettings