import React, { useState } from 'react'
import {Speedometer,CardText,BarChart, Hr, Journals, Bullseye, Check, Journal, Archive, Wallet2,Gear, Check2Square } from 'react-bootstrap-icons'
import Sidebar from '../Components/Sidebar'
import { Button, Card, FormControl,Form, Modal } from 'react-bootstrap'
import {  useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie';

function Cards() {
    let nav= useNavigate()
    const cookie = new Cookies()
    const paidt= cookie.get('PAIDT')

    const user=cookie.get('useraidt')


    const [AddCardModal, setAddCardModal]= useState(false);
    const [Title,SetTitle]=useState('');
    const [Description,setDescription]=useState('');
    const [Question, setQuestion]= useState('');
    const [Answer, setAnswer]=useState('');
    let CardsQA=[]

  return (
    <div className='Page'>
        <div className="navB">
        <Sidebar
        L1={<Button variant='light-outline' onClick={()=>nav(`/Dashboard/`)}><Speedometer style={{color:'white'}}/></Button>}
        L2={<Button variant='light-outline' onClick={()=>nav(`/Sessions/`)}><Archive style={{color:'white'}}/></Button>}
        L3={<Button variant='light-outline' onClick={()=>nav(`/Trends/`)}><BarChart style={{color:'white'}}/></Button>}
        L4={<Button variant='light-outline' onClick={()=>nav(`/Scopes/`)}><Bullseye style={{color:'white'}}/></Button>}
        L5={<Button variant='light-outine' onClick={()=>nav('/Todos')}><Check2Square style={{color:'white'}}/></Button>}
        L6={<Button variant='light-outine' onClick={()=>nav('/Cards')}><Wallet2 style={{color:'white'}}/></Button>}
     />
        </div>

        {paidt==='Tnf'?
        <div className="bod">
            <div className="top">
         <Card style={{
            
             margin:'20px',
             height:'150px',
             backgroundColor:'#17181a',
             border: '3px solid #be7acc',
             backgroundSize:'400% 400%',
             textAlign:'center',
             alignItems:'center',
             color:'white',
             padding:' 10px',
             animation:'gradient 15s ease infinite'
              }}>
            <Card.Title style={{  marginBottom:'30px'}}><h1 style={{FontWeight:'bold', FontSize:'40px'}}>Cards</h1></Card.Title>
            <Button  variant='outline-light' onClick={()=>{setAddCardModal(true)}}  >Add a new Card Set</Button>
         
          
          </Card>
          </div>

          <Modal
           className="special_modal"
           
           show={AddCardModal}
           
            aria-labelledby="contained-modal-title-vcenter"
            onHide={()=>{setAddCardModal(false)}}
            style={{color:'lightgray'}}
            centered>
               <Modal.Header closeButton closeVariant='white'>
           <Modal.Title style={{color:'lightgray'}}>
            Add your Card set
           </Modal.Title>
           </Modal.Header>
           <Modal.Body>
            <Form>
              <Form.Control  placeholder='Title' style={{marginBottom:'10px'}} onChange={(e)=>{SetTitle(e.target.value)}}/>
              <Form.Control  as='textarea' rows={3} style={{resize:'none',marginBottom:'10px'}} placeholder='Description' onChange={(e)=>{setDescription(e.target.value)}}/>
              <div style={{display:'flex'}}>
              <Form.Control placeholder='Question' style={{width:'50%', marginRight:'10px'}} onChange={(e)=>{setQuestion(e.target.value)}}/>
              <Form.Control placeholder='Answer' style={{width:'50%'}} onChange={(e)=>{setAnswer(e.target.value)}}/>
              </div>
              <Button variant='outline-light' style={{width:'100%', marginTop:'10px'}} >Add Card</Button>
            </Form>
           </Modal.Body>
           <Modal.Footer>
            <Button >Add</Button>
           </Modal.Footer>

          </Modal>
        </div>
        
        : 
        <div className='bod'>
           <Card style={{
            
            margin:'20px',
            height:'150px',
            border: '3px solid  #be7acc',
            backgroundColor:'#17181a',
            backgroundSize:'400% 400%',
            textAlign:'center',
            alignItems:'center',
            color:'white',
            padding:' 10px',
            animation:'gradient 15s ease infinite'
             }}>
           <Card.Title ><h1 style={{FontWeight:'400', FontSize:'40px'}}>Cards</h1></Card.Title>
         </Card>

         <div style={{textAlign:'center', color:'lightgray'}}>
          <p >Pro mode coming soon. <br/> Follow our instagram for more updates <br/> @nitrondigital</p>
         </div>

        </div>}
    </div>
  )
}

export default Cards