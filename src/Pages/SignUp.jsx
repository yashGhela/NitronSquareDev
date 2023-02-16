import React, { useState, useEffect} from 'react';

import {auth, db, provider} from '../firebaseConfig';
import {browserLocalPersistence, setPersistence, signInWithPopup, createUserWithEmailAndPassword} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, doc, getDoc, setDoc} from 'firebase/firestore';
import { Alert, Button, Card, CardGroup, Col, Container, Form, Modal, Row, ListGroup, Badge } from 'react-bootstrap';
import {Google} from 'react-bootstrap-icons';
import improvr from '../Assets/improrvr dark.png'
import TsCs from '../Components/TsCs';
import PP from '../Components/PP';
import Cookies from 'universal-cookie';



function SignUp() {

 
  const [modalShow, setModalShow]= useState(false);
  const [payShow, setPayShow]=useState(false);
  const [firstSub, setFirstSub] = useState('');
  const [type, setType]= useState('');
  const [firstSubErr, setFirstSubErr]=useState(null);
  const [disabled, setDisabled]=useState(true);
  const [errShow, setErrShow]= useState(false);
  const [userData, setUserData]= useState([])
  const [subId, setSubId]= useState('')
  const [signDis, setSignDis]= useState(true);
  const [email, setEmail]= useState('');
  const [password, setPassword]=useState('');
  const [errMessage, setErrMessage]= useState('');
  const [username,setUsername]= useState('')
  const [TCshow, setTCshow]=useState(false)
  const [PPshow, setPPshow]= useState(false);
  const [checked, setChecked] = useState(false);

  const cookie= new Cookies();

  let nav= useNavigate();

  
 
 

  const nextYear = new Date();

  nextYear.setFullYear(nextYear.getFullYear() + 1);



  const createSes=async()=>{

     const docref = doc(db, 'Users',userData.uid)
        
   
     
        await setDoc(docref, {username: username, subscription: 'active',type: type, email: userData.email}).then(async ()=>{
          const ref= collection(db,'Users',userData.uid,'Sessions');
          const subref= collection(db, 'Users',userData.uid,'Subjects');
          
          
           // Adds a doc to the collection of Sessions and names it subjects with the description subjects
          await setDoc(doc(subref,'SubjectsList'),{subjects:[firstSub]});
          await addDoc(ref,{plec:'placeholder'})
          
          cookie.set('useraidt',userData.uid, {expires:  nextYear, path:'/'});
          localStorage.setItem('isAuth', true)
          console.log('added!')
         
          nav(`/Dashboard/`)

        });
       
     
    
  }

  const signUpEP=async()=>{
    setPersistence(auth, browserLocalPersistence).then(()=>{
      return createUserWithEmailAndPassword(auth, email, password).then(async(result)=>{
      
        setUserData(result.user)
        

        const setDoc = doc(db, 'Users',result.user.uid)
        
        await getDoc(setDoc).then((snapshot)=>{
          if(snapshot.exists()){
            setErrShow(true);
            setErrMessage('This Account already exists')
          }else{
            setModalShow(true)
          }
        })

        

      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrShow(true)
        setErrMessage('This Email is already in use or is not entered correctly')
      }
        )
    })

  }

  const signUpG=async ()=>{  //to put it simpy once a user signs up they'll be added to the database and then sent to add more subjects to sessions
    setPersistence(auth, browserLocalPersistence).then(()=>{
      return signInWithPopup(auth, provider).then(async(result)=>{
        
        
        setUserData(result.user)
        setUsername(result.user.displayName)
        
        
        
        const setDoc = doc(db, 'Users',result.user.uid)
        
        await getDoc(setDoc).then((snapshot)=>{
          if(snapshot.exists()){
            setErrShow(true);
            setErrMessage('This Account already exists')
          }else{
            setModalShow(true)
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
    <Container style={{display:'grid', placeItems:'center', backgroundImage:'radial-gradient(circle, rgba(205,224,255,1) 0%, rgba(173,188,235,1) 48%, rgba(91,118,215,1) 100%)', padding:'0%', margin:'0%', height:'100vh', width:'100vw'}} fluid={true} >
      <Card   style={{paddingTop:'50px',height:'460px', width:'360px', padding:'10px', margin:'20px', justifyContent:'center', alignItems:'center',textAlign:'center',boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',backdropFilter: 'blur( 50px )', background:'rgba( 255, 255, 255, 0.25 )', borderRadius:'20px'}}>
      <Card.Title>Sign Up </Card.Title>
      <Card.Body>
      <Button style={{marginTop:'5px', width:'300px'}} variant='primary' onClick={()=>{ setType('free');signUpG()}} >Sign Up with Google <Google/></Button>
      <p style={{marginTop:'5px'}}>OR</p>
      <Form>
        <Form.Control type='email' placeholder='Email' onChange={(e)=>{setEmail(e.target.value); if(email==='' || password===''|| username==='' || checked==='false'){setSignDis(true)}else{setSignDis(false)}}}/>
        <Form.Control type='password' placeholder='Password' style={{marginTop:'5px'}} onChange={(e)=>{setPassword(e.target.value);if(email==='' || password===''|| username==='' || checked==='false'){setSignDis(true)}else{setSignDis(false)} }}/>
        <Form.Control placeholder='Username' style={{marginTop:'5px', width:'100%'}} onChange={(e)=>{setUsername(e.target.value);if(email==='' || password==='' || username==='' || checked==='false' ){setSignDis(true)}else{setSignDis(false)} }}/>
       
        <input type='checkbox' id='check' name='check' onClick={(e)=>{if(e.target.checked){setChecked(true)}else{setChecked(false)}}} />
        <label for='check' >I here by accept the Terms and Conditions and Privacy Policy of Nitron Digital Improvr</label>
        
        <Button variant='dark' disabled={signDis} style={{marginTop:'5px', width:'100%'}} onClick={()=>{setType('free'); signUpEP()}}>Sign Up</Button>
        
      </Form>
     
      {errShow&&<Alert style={{marginTop:'5px'}} variant='danger'>{errMessage}</Alert>}
      </Card.Body>
      <p style={{textDecoration:'underline', color:'grey', cursor:'pointer' }} onClick={()=>{nav('/')}}>or go to Log In</p>

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

   
    </Card>
    <div style={{display:'flex', flexDirection:'column', placeItems:'center', margin:'0', bottom:'0', position:'absolute'}}>
       <img src={improvr}
      height='30px'
      width={'120px'}
      style={{
        marginBottom:'15px'
      }}
      
      className='d-inline-block align-top'
       />
       <div style={{display:'flex', marginTop:'10px'}}>
        <p style={{marginRight:'20px', textDecoration:'underline', color:'gray', cursor:'pointer'}} onClick={()=>{setTCshow(true)}}>Terms & Conditions</p>
        <p style={{marginRight:'20px', textDecoration:'underline', color:'gray', cursor:'pointer'}} onClick={()=>{setPPshow(true)}}>Privacy Policy</p>
        
       </div>
       <p style={{marginRight:'20px',  color:'gray'}}>All Rights belong to Nitron Digital</p>
       </div>
       <Modal
       className="special_modal"
       breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
       minBreakpoint="xxs"
         show={TCshow}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          onHide={()=>{setTCshow(false)}}
          style={{color:'lightgray'}}
          centered>
             <Modal.Header closeButton closeVariant='white'>Terms and Conditions</Modal.Header>
             <Modal.Body>
              <TsCs/>
             </Modal.Body>

       </Modal>
       <Modal
       className="special_modal"
       breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
       minBreakpoint="xxs"
         show={PPshow}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          onHide={()=>{setPPshow(false)}}
          style={{color:'lightgray'}}
          centered>
             <Modal.Header closeButton closeVariant='white'>Privacy Policy</Modal.Header>
             <Modal.Body>
              <PP/>
             </Modal.Body>

       </Modal>
      
    </Container>
  )
}

export default SignUp