import React, { useState, useEffect} from 'react'
import {Speedometer,CardText,BarChart, Hr, Journals, Bullseye, Check, Journal, Archive, Wallet2,Gear, Check2Square } from 'react-bootstrap-icons'
import Sidebar from '../Components/Sidebar'
import { Button, Card, FormControl,Form, Modal, Row,Col, Container, Accordion } from 'react-bootstrap'
import {  useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie';
import { addDoc, collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebaseConfig'

function Cards() {
    let nav= useNavigate()
    const cookie = new Cookies()
    const paidt= cookie.get('PAIDT')

    const user=cookie.get('useraidt');
    var objectsArray=[];



    const [AddCardModal, setAddCardModal]= useState(false);
    const [cardDetailsM, setCardDetailsM]=useState(false)
    const [cardActionM,setCardActionM]=useState(false);
    const [CardData, setCardData]=useState([])
    const [CardList,setCardList]=useState([]);
    const [Title,SetTitle]=useState('');
    const [Description,setDescription]=useState('');
    const [Question, setQuestion]= useState('');
    const [Answer, setAnswer]=useState('');
    const [arrQna, setArrQna]=useState([]);
    const [cardQA,setCardQA]=useState('')
    
    const [arr,setArr]=useState([])
  
  
   const [counter, setCounter]=useState(0)
   

   
    
 

    const addCard=({q,a})=>{
      setArr((prev)=>[...prev,{Q:q, A:a}]);
     
      setQuestion('');
      setAnswer('');
      
      

    }
    const ref=collection(db,'Users', user, 'Cards');

    useEffect(() => {  
    
 
    
 
     
      onSnapshot(ref, (snapshot) => {
      
        
          setCardList(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
          
            
        
        
      });
    }, []);

    const AddSet=async({q,a})=>{
      setArr((prev)=>[...prev,{Q:q, A:a}]);
      await addDoc(ref, {
        Title:Title,
        Description: Description,
        QnA: arr
      })
      console.log(arr)
      setAddCardModal(false)
    }

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

          <div  style={{display:'flex', marginLeft:'7px',overflow:'auto'}}>
           <Container fluid>
            <Row>
            {CardList.map((set)=>{
               return(
                <Col style={{width:'450px'}}  xs='2' >
                <Card style={{width:'100%', background:'#282b2e',color:'lightgray',  cursor:'pointer', height:'100%', marginTop:'10px'}}  
                onClick={()=>{setCardDetailsM(true); setCardData(set);setArrQna(CardData.QnA);console.log(CardData.QnA) }}>
               <Card.Body>
                <Card.Title>{set.Title}</Card.Title>
                 <Card.Text>
                  {set.Description}
                  </Card.Text>
                </Card.Body>

               </Card>
               </Col>
               )
            })}
            </Row>
           </Container>
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
              <Form.Control value={Question} placeholder='Question' style={{width:'50%', marginRight:'10px'}} onChange={(e)=>{setQuestion(e.target.value)}}/>
              <Form.Control value={Answer} placeholder='Answer' style={{width:'50%'}} onChange={(e)=>{setAnswer(e.target.value)}}/>
              </div>
              <Button variant='outline-light' style={{width:'100%', marginTop:'10px'}} onClick={()=>{addCard({q:Question, a:Answer})}} >Add Card</Button>
              
            </Form>
            <hr/>
           <div>
           {objectsArray.map((card)=>{
             return(
              <ul>
              <li>{card.Question}</li>
            </ul>
          
             )
            })}
           </div>
           </Modal.Body>
           <Modal.Footer>
            <Button onClick={()=>{AddSet({q:Question, a:Answer})}} >Add</Button>
           </Modal.Footer>

          </Modal>

         <div>
         <Modal
           className="special_modal"
           
           show={cardDetailsM}
           
            aria-labelledby="contained-modal-title-vcenter"
            onHide={()=>{setCardDetailsM(false)}}
            style={{color:'lightgray'}}
            centered>
              <Modal.Header closeButton closeVariant='white'>
              <Modal.Title>Your Card</Modal.Title>
              </Modal.Header>

              <Modal.Body>
              <div className="subject" style={{backgroundColor:'rgb(12,12,12)',padding:'10px', borderRadius:'10px', margin:'10px'}}>
                      <h4 style={{fontWeight:'bold', fontSize:'20px',color:'lightgray'}}>Name: </h4>
                       <h4  style={{fontWeight:'400', fontSize:'20px',color:'lightgray'}}>{CardData.Title}</h4>
               </div>

              <div className="desc" style={{backgroundColor:'rgb(12,12,12)',padding:'10px', borderRadius:'10px', margin:'10px'}}>
                <h5 style={{fontWeight:'bold', fontSize:'20px',color:'lightgray'}}>Description:</h5>
                <p style={{fontWeight:'400', fontSize:'15x', padding:'10px', backgroundColor:'light-gray'}}>{CardData.Description}</p>
              </div>

              <div>
                {CardData.QnA?.map((i)=>{
                  return(
                    <Accordion style={{background:'rgb(12,12,12)', borderRadius:'10px', marginBottom:'10px' }}  className='special_modal'>
                       <Accordion.Header >
                        {i.Q}
                      </Accordion.Header>
                      <Accordion.Body>
                        {i.A}
                      </Accordion.Body>

                    </Accordion>
                  )
                })}
             
              </div>
              </Modal.Body>

              <Modal.Footer>
                <Button onClick={()=>{setCardDetailsM(false); setCardActionM(true); }}>Start Now!</Button>
              </Modal.Footer>


            </Modal>
         </div>
            <div>
            <Modal
           className="special_modal"
           
           show={cardActionM}
           
            aria-labelledby="contained-modal-title-vcenter"
            onHide={()=>{setCardActionM(false)}}
            style={{color:'lightgray'}}
            centered>
              <Modal.Header closeButton closeVariant='white'>
              <Modal.Title>Card Session</Modal.Title>
              </Modal.Header>

              <Modal.Body>
              <div className="subject" 
              style={{backgroundColor:'rgb(12,12,12)',padding:'10px', borderRadius:'10px', margin:'10px', cursor:'pointer'}}
              
              
              >
                      
                       <h4  style={{fontWeight:'400', fontSize:'20px',color:'lightgray'}}>{arrQna[counter].Q}</h4>
               </div>

              </Modal.Body>



            </Modal>
            </div>
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