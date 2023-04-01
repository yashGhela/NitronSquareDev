import React from 'react'
import Sidebar from '../Components/Sidebar'
import { Button } from 'react-bootstrap'
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
    </div>
  )
}

export default Todos