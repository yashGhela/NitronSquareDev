import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap';


function NotFound() {
    const nav=useNavigate();

    
    

  
  return (
    <div style={{height:'100vh', width:'100vw', backgroundColor:'rgb(41, 44, 51)', color:'white', textAlign:'center', }}>
        <h1>Page not Found</h1>
        <h5>Click the button to go to home or try reloading the page</h5>
       
        <Button onClick={()=>nav('/')} variant='secondary'>Go Home</Button>
    </div>
  )
}

export default NotFound