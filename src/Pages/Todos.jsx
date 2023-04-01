import React from 'react'
import Sidebar from '../Components/Sidebar'
import { Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Check2Square, Speedometer,CardText,BarChart, Hr, Journals, Bullseye, Check, Journal, Archive, Wallet2,Gear  } from 'react-bootstrap-icons'

function Todos() {
    let nav=useNavigate()
  return (
    <div className='Page'>
        
        <div className="navB">
        <Sidebar
        L1={<Button variant='light-outline' onClick={()=>nav(`/Dashboard/`)}><Speedometer style={{color:'white'}}/></Button>}
        L2={<Button variant='light-outline' onClick={()=>nav(`/Sessions/`)}><Archive style={{color:'white'}}/></Button>}
        L3={<Button variant='light-outline' onClick={()=>nav(`/Trends/`)}><BarChart style={{color:'white'}}/></Button>}
        L4={<Button variant='light-outline' onClick={()=>nav(`/Scopes/`)}><Bullseye style={{color:'white'}}/></Button>}
        L5={<Button variant='light-outine'><Check2Square style={{color:'white'}}/></Button>}
     />
        </div>

        <div className='bod'>
        <Card style={{
            
            margin:'20px',
            height:'150px',
            border: '3px solid  rgb(199, 78, 120)',
            backgroundColor:'#17181a',
            backgroundSize:'400% 400%',
            textAlign:'center',
            alignItems:'center',
            color:'white',
            padding:' 10px',
            animation:'gradient 15s ease infinite'
             }}>
           <Card.Title ><h1 style={{FontWeight:'400', FontSize:'40px'}}>Todos</h1></Card.Title>
           
        
         
         </Card>
        </div>
    </div>
  )
}

export default Todos