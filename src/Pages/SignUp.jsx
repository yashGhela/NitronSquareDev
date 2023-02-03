import React, { useState, useEffect} from 'react';

import {auth, db, provider} from '../firebaseConfig';
import {browserLocalPersistence, setPersistence, signInWithPopup} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, doc, getDoc, setDoc} from 'firebase/firestore';
import { Alert, Button, Card, CardGroup, Col, Container, Form, Modal, Row, ListGroup, Badge } from 'react-bootstrap';
import {Google} from 'react-bootstrap-icons';

import Cookies from 'universal-cookie';



function SignUp() {

 
  const [modalShow, setModalShow]= useState(false);
  const [payShow, setPayShow]=useState(false);
  const [firstSub, setFirstSub] = useState('');
  const [firstSubErr, setFirstSubErr]=useState(null);
  const [disabled, setDisabled]=useState(true);
  const [errShow, setErrShow]= useState(false);
  const [userData, setUserData]= useState([])
  const [subId, setSubId]= useState('')

  const cookie= new Cookies();

  let nav= useNavigate();

  
  const Paddle = window.Paddle;
  const openCheckout  = () => { 
      Paddle.Checkout.open({
         product: 43741 ,
         successCallback:(data,err)=>{
          console.log(data);
          setPayShow(false)
         setModalShow(true)
       

        
         }
         
        });
  }

  const openCheckoutAnn  = () => { 
    Paddle.Checkout.open({
       product: 	44012 ,
       successCallback:(data,err)=>{
        console.log(data);
        setPayShow(false)
        setModalShow(true)
        
       }
      });
}
 

  const nextYear = new Date();

  nextYear.setFullYear(nextYear.getFullYear() + 1);



  const createSes=async()=>{

     const docref = doc(db, 'Users',userData.uid)
        
   
     
        await setDoc(docref, {username: userData.displayName, tier: 'Pro', email: userData.email}).then(async ()=>{
          const ref= collection(db,'Users',userData.uid,'Sessions');
          const subref= collection(db, 'Users',userData.uid,'Subjects');
          const Scoperef= collection(db,'Users',userData.uid,'Scopes')
          
           // Adds a doc to the collection of Sessions and names it subjects with the description subjects
          await setDoc(doc(subref,'SubjectsList'),{subjects:[firstSub]});
          await addDoc(ref,{subject: 'example', WorkTime: 45, BreakTime: 15, description:'this is an example session', rating:4, time:'example date'})
          await addDoc(Scoperef,{title:'example document', description:'This is an example document of the scopes functions'})
          cookie.set('useraidt',userData.uid, {expires:  nextYear, path:'/'});
          localStorage.setItem('isAuth', true)
          console.log('added!')
         
          nav(`/Dashboard/`)

        });
       
     
    
  }

  const signUp=async ()=>{  //to put it simpy once a user signs up they'll be added to the database and then sent to add more subjects to sessions
    setPersistence(auth, browserLocalPersistence).then(()=>{
      return signInWithPopup(auth, provider).then(async(result)=>{
        
        
        setUserData(result.user)
        
        
        const setDoc = doc(db, 'Users',result.user.uid)
        
        await getDoc(setDoc).then((snapshot)=>{
          if(snapshot.exists()){
            setErrShow(true);
          }else{
            setPayShow(true)
          }
        })
        
      })
    })
  }

  useEffect(()=>{
   
    setDisabled(formValidation());
   
 },[])

  const formValidation = () =>{  //checks for errors
    if (firstSub ===''){
      setFirstSubErr(true);
      return true

    }else{
      setFirstSubErr(false);
      return false
    }}

    
  return (
    <div style={{display:'grid', placeItems:'center', background:'#17181a', padding:'0%', margin:'0%', height:'100vh'}} >
      <Card   style={{height:'250px', width:'300px', padding:'10px', margin:'20px', justifyContent:'center', alignItems:'center', backgroundColor:'rgb(192,192,192)'}}>
      <Card.Title>Sign Up</Card.Title>
      <Card.Body>
      <Button  variant='dark' onClick={signUp} >Sign Up with Google <Google/></Button>
      {errShow&&<Alert style={{marginTop:'5px'}} variant='danger'>This Account already exists</Alert>}
      </Card.Body>

      <Modal
       show={modalShow}
       onHide={()=>{setModalShow(false)}}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      className="special_modal"
      
      centered>
      <Modal.Header closeButton closeVariant='white'>
        <Modal.Title  id="contained-modal-title-vcenter">
          Welcome to Improvr! Let's add your first subject!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label>Subject Name:</Form.Label>
          <Form.Control placeholder='Algebra' onChange={(e)=>{setFirstSub(e.target.value);if(e.target.value===''){setDisabled(true); setFirstSubErr(true)} else{setDisabled(false); setFirstSubErr(false)}}} style={{marginBottom:'20px'}}/>
          <Button onClick={()=>{createSes()}} disabled={disabled} style={{marginBottom:'20px'}}>Let's Go!</Button>
        {firstSubErr&&<Alert variant='danger'>Please input a subject name</Alert>}
        </Form>
      </Modal.Body>
      <Modal.Footer>
       <p>Don't worry, you can add more subjects later 🙂</p>
      </Modal.Footer>
    </Modal>

    <Modal
       show={payShow}
       onHide={()=>{setPayShow(false)}}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      className="special_modal"
      
      centered>
      <Modal.Header closeButton closeVariant='white'>
        <Modal.Title  id="contained-modal-title-vcenter">
          Welcome to Improvr! Subscribe to get Started!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          <Row>
              
              <Col>
              
              <Card style={{ width:'100%', marginTop:'20px', background:'rgb(97, 149, 232)', color:'white', paddingBottom:'10px',padding:'10px', textAlign:'center', borderRadius:'25px'}}>
                <Card.Title>Monthly</Card.Title>
                <Card.Body>
                  <h1 style={{fontSize:'80px'}}>$5</h1>
                  <p style={{textAlign:'left'}}>Get access to all of 
                  Improvr's features, payed on a
                  monthly basis.</p>

                  <ListGroup as="ol" style={{textAlign:'left'}} >
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                      style={{background:'none', color:'white', borderColor:'white' }}
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">Timer </div>
                        Access to our powerful timer tool, with focus sounds and quick tools.
                      </div>
                     
                    </ListGroup.Item>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                      style={{background:'none', color:'white',  borderColor:'white'}}
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">Trends</div>
                        Access to our powerful statistics tools which give users a better understanding of their work.
                      </div>
                    
                    </ListGroup.Item>
                    <ListGroup.Item
                     style={{background:'none', color:'white', borderColor:'white'}}
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">Scopes</div>
                        Access to our goal setting tools, reach for the stars!
                      </div>
                     
                    </ListGroup.Item>
                  </ListGroup>



                </Card.Body>
                <Card.Footer>
                  <Button style={{width:'100%'}} variant='light' onClick={openCheckout}>Get Started for Free</Button>
                </Card.Footer>
              </Card>
              </Col>
              <Col>
              <Card style={{ width:'100%', marginTop:'20px', background:'#282b2e', color:'white', paddingBottom:'10px',padding:'10px', textAlign:'center', borderRadius:'25px'}}>
                <Card.Title>Annual</Card.Title>
                <Card.Body>
                  <h1 style={{fontSize:'80px'}}>$50</h1>
                  <p style={{textAlign:'left'}}>Get access to all of 
                  Improvr's features, payed on 
                  an annual basis.</p>

                  <ListGroup as="ol" style={{textAlign:'left'}} >
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                      style={{background:'none', color:'white', borderColor:'white' }}
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">Power </div>
                        Access to all of our tools listed in the monthly plan. For serious users dedicated to their work.
                      </div>
                     
                    </ListGroup.Item>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                      style={{background:'none', color:'white',  borderColor:'white'}}
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">2 months off </div>
                        With our annual plan get 2 months for free.
                      </div>
                    
                    </ListGroup.Item>
                   
                  </ListGroup>



                </Card.Body>
                <Card.Footer>
                  <Button style={{width:'100%'}} variant='light' onClick={openCheckoutAnn}>Pay</Button>
                </Card.Footer>
              </Card>
             
              </Col>

           
          </Row>
        </Container>
        
      </Modal.Body>
      <Modal.Footer>
       
      </Modal.Footer>
    </Modal>
    </Card>
    </div>
  )
}

export default SignUp