import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react'
import { Container, Form, Navbar, Button } from 'react-bootstrap'
import {db} from '../firebaseConfig';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';


function CreateScope() {

  const cookie = new Cookies()
  const user=cookie.get('useraidt')
  const nav=useNavigate();
 

  const [title, setTitle]=useState();
  const [description, setDescritption]=useState('');
  
  const [disabled, setDisabled]=useState(true);
  const [task, setTask]=useState('');
  const [taskList, setTaskList]= useState([]);

  const addScope=async()=>{
    const subref= collection(db,'Users',user,'Scopes');
    await addDoc(subref, {
      title: title,
      description: description,
      tasks: [taskList]
    })
    nav(`/Dashboard/${user}`)
  }

  return (
    <div className='Page2'>
        <Navbar bg='dark' variant='dark'>
            <Container>
                <Navbar.Brand>
                    Create a Scope
                </Navbar.Brand>

            </Container>
        </Navbar>

       
          <div className="titleBar" style={{ color:'white', display:'grid', placeItems:'center', marginLeft:'20px', marginTop:'20px'}}>
          <Form style={{width:'500px'}}> 
            <Form.Group>
              <Form.Label >Title:</Form.Label>
              <Form.Control onChange={(e)=>{setTitle(e.target.value)}}/>
              <Form.Label>Description:</Form.Label>
              <Form.Control as='textarea' rows={3} style={{resize:'none'}} onChange={(e)=>{setDescritption(e.target.value)}} />
              <Form.Label>Add a Task</Form.Label>
              <Form.Control onChange={(e)=>{setTask(e.target.value)}} style={{marginTop:'5px'}} value={task}/>
              <Button onClick={()=>{setTaskList([...taskList,task]);console.log(taskList);setTask(''); <h2>Added!</h2>}} style={{marginTop:'10px'}} >Add</Button>
              
            </Form.Group>
          </Form>

          <Button onClick={()=>{setTaskList([...taskList,task]); addScope()}}>Finish</Button>
          </div>

        
        
    </div>
  )
}

export default CreateScope