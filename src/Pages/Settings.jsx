import React from 'react'
import { Button, Card, Container } from 'react-bootstrap'
import Sidebar from '../Components/Sidebar'

import {Speedometer,CardText,BarChart, Hr, Journals, Bullseye, Instagram } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
function Settings() {
    let nav=useNavigate()
  return (
    <div className="Page">

       <div className="navB">
        <Sidebar
        L1={<Button variant='light-outline' onClick={()=>nav(`/Dashboard/`)}><Speedometer style={{color:'white'}}/></Button>}
        L2={<Button variant='light-outline' onClick={()=>nav(`/Sessions/`)}><Journals style={{color:'white'}}/></Button>}
        L3={<Button variant='light-outline' onClick={()=>nav(`/Trends/`)}><BarChart style={{color:'white'}}/></Button>}
        L4={<Button variant='light-outline' onClick={()=>nav(`/Scopes/`)}><Bullseye style={{color:'white'}}/></Button>}/>
        </div>

        <div className="bod">
          
          <h1 style={{color:'white',marginTop:'20px', marginLeft:'10vw'}}>Settings </h1>

          <Container style={{  padding:'20px',  marginLeft:'10vw', marginTop:'70px', width:'70vw', height:'70vh', borderRadius:'10px'}}>
            <h2 style={{color:'gray', fontSize:'22px'}}>Your Account</h2>
            <Card style={{height:'270px', width:'220px', marginTop:'20px', backgroundColor:'rgb(97, 149, 232)', color:'white'}}>
                <Card.Body>
                    <Card.Title>
                        Join Now
                    </Card.Title>
                    <h1 style={{textAlign:'center', fontSize:'60px', fontWeight:'bold'}}>$5/m</h1>
                    <Card.Text>
                        Join the Improvr family now and gain unlimited access to all features.
                    </Card.Text>
                    <Button style={{width:'100%'}} variant='light'>Pay</Button>
                </Card.Body>

            </Card>
            <h2 style={{color:'gray', fontSize:'22px', marginTop:'20px', marginBottom:'10px'}}>Help:</h2>
            <h3 style={{color:'gray', fontSize:'16px', marginTop:'20px', marginBottom:'10px'}}>E-mail: info@nitrondigital.com</h3>

           <Card  onClick={()=>{window.location.href="'https://www.instagram.com/nitrondigital/'"}} style={{backgroundColor:'rgb(41, 44, 51)',height:'50px', width:'50px', border:'none'}}>
           <Instagram style={{color:'gray', height:'50px', width:'50px',cursor:'pointer'}}/>
           </Card>



          </Container>


            

        </div>



    </div>
  )
}

export default Settings