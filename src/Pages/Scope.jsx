import React from 'react'
import { Button , Card} from 'react-bootstrap'
import {Speedometer,CardText,BarChart } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../Components/Sidebar'
import Cookies from 'universal-cookie'
import { Hr } from 'react-bootstrap-icons'
function Scope() {
    const nav=useNavigate();
    const cookie = new Cookies()
    const user=cookie.get('useraidt')

  return (
    <div className='Page'>

         <div className="navB">
        <Sidebar
        L1={<Button variant='dark' onClick={()=>nav(`/Dashboard/${user}`)}><Speedometer/></Button>}
        L2={<Button variant='dark' onClick={()=>nav(`/Sessions/${user}`)}><CardText/></Button>}
        L3={<Button variant='dark' onClick={()=>nav(`/Trends/${user}`)}><BarChart/></Button>}
        L4={<Button variant='dark' onClick={()=>nav(`/Scopes/${user}`)}><Hr/></Button>}/>
        
         </div>

         <div className="bod">
        
        <Card style={{
          width:'93vw',
           margin:'20px',
           height:'250px',
           backgroundImage:'linear-gradient(-45deg ,rgb(163, 207, 137) ,rgb(182, 95, 177), rgb(52, 110, 235))',
           backgroundSize:'400% 400%',
           textAlign:'center',
           alignItems:'center',
           color:'white',
           padding:' 10px',
           animation:'gradient 15s ease infinite'
            }}>
          <Card.Title ><h1 style={{FontWeight:'bold', FontSize:'40px'}}>Scopes</h1></Card.Title>
          <Button onClick={()=>{nav(`/CreateScope/${user}`)}} variant='dark'>Create a New Scope</Button>
          
        
        
        </Card>


        </div>
    </div>
  )
}

export default Scope