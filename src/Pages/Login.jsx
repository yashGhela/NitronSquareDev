import React, { useEffect, useState } from 'react'

import {auth, db, provider} from '../firebaseConfig';
import {browserLocalPersistence, setPersistence, signInWithPopup} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {doc, getDoc, updateDoc} from 'firebase/firestore';
import {Alert, Button, Card, Form, Modal, ListGroup, Col,Row, Container} from 'react-bootstrap'
import {Google} from 'react-bootstrap-icons';
import Cookies from 'universal-cookie';


function Login() {
  let nav= useNavigate();
  const [errShow, setErrShow ]=useState(false);
  const [payShow, setPayShow]=useState(false);
  const [type, setType]= useState('');
  const [userData, setUserData]= useState([])

  const nextYear = new Date();

  nextYear.setFullYear(nextYear.getFullYear() + 1);

  useEffect(()=>{
    const cookie= new Cookies()
    const user= cookie.get('useraidt')
    if(user){
      nav(`/Dashboard/`)
    }
  })

  const signIn=async()=>{
    setPersistence(auth,browserLocalPersistence).then(async ()=>{
      const result = await signInWithPopup(auth, provider)
      const ref = doc(db, 'Users', result.user.uid);
      
      await getDoc(ref).then((snapshot)=>{
        if(snapshot.exists() && snapshot.data().subscription==='active'){
          const cookie = new Cookies();
          cookie.set('useraidt', result.user.uid, {expires:  nextYear, path:'/'},);
          localStorage.setItem('isAuth', true)
          nav(`/Dashboard/`);
        }else if (!snapshot.exists()){
          setErrShow(true)
        }else if (snapshot.data().subscription==='inactive'){
          setUserData(result.user)
          setPayShow(true);

        }
      })

      
 
    
      
      })
      
      
    }

    const Paddle = window.Paddle;
  const openCheckout  = () => { 
      Paddle.Checkout.open({
         product: 43741 ,
         email: userData.email,
         successCallback:(data,err)=>{
         
          setType('monthly')
          updateUser()
         
       

        
         }
         
        });
  }

  const openCheckoutAnn  = () => { 
    Paddle.Checkout.open({
       product: 	44012 ,
       email: userData.email,
       successCallback:(data,err)=>{
       
        setType('Annual')
        updateUser()
        
        
       },
       closeCallback: (data)=>{
        alert('Failed to Checkout')
       }
      });
}

const updateUser=async()=>{
  await updateDoc(doc(db,'Users', userData.uid),{
    subscription:'active',
    type: type
  })
  const cookie = new Cookies();
          cookie.set('useraidt', userData.uid, {expires:  nextYear, path:'/'},);
          localStorage.setItem('isAuth', true)
          nav(`/Dashboard/`);
}
   
  
 
  return (
    <div style={{display:'grid', placeItems:'center', backgroundColor:'#17181a', padding:'0%', margin:'0%', height:'100vh'}}>
     
      <Card  style={{height:'250px', width:'300px', padding:'10px', margin:'20px', justifyContent:'center', alignItems:'center', backgroundColor:'rgb(192,192,192)'}}>
        <Card.Title>Welcome back! Please Log In</Card.Title>
      <Card.Body>
      <Form>
      <Form.Group>
        
       
        <Button variant='dark'  onClick={signIn}>Sign In with Google <Google/></Button>

        {errShow && <Alert style={{marginTop:'5px',}} variant='danger'>This Account does not exist.</Alert>}
     
        
      </Form.Group>
      </Form>
      </Card.Body>

      <Modal
       show={payShow}
       onHide={()=>{setPayShow(false)}}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      className="special_modal"
      
      centered>
      <Modal.Header closeButton closeVariant='white'>
        <Modal.Title  id="contained-modal-title-vcenter">
          Welcome Back to Improvr! Subscribe to Enter!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          <Row>
              
              <Col>
              
              <Card style={{ width:'100%', marginTop:'20px', background:'#282b2e', color:'white', paddingBottom:'10px',padding:'10px', textAlign:'center', borderRadius:'25px'}}>
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
              <Card style={{ width:'100%', marginTop:'20px', background:'rgb(97, 149, 232)', color:'white', paddingBottom:'10px',padding:'10px', textAlign:'center', borderRadius:'25px'}}>
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

export default Login