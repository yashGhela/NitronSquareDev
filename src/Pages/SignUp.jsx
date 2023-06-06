import React, { useState, useEffect} from 'react';

import {auth, db, provider} from '../firebaseConfig';
import {browserLocalPersistence, setPersistence, signInWithPopup, createUserWithEmailAndPassword} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, doc, getDoc, setDoc} from 'firebase/firestore';
import { Alert, Button, Card, CardGroup, Col, Container, Form, Modal, Row, ListGroup, Badge } from 'react-bootstrap';
import {Google} from 'react-bootstrap-icons';
import improvr from '../Assets/improvr logo.png'
import TsCs from '../Components/TsCs';
import PP from '../Components/PP';
import Cookies from 'universal-cookie';
import { async } from '@firebase/util';
import ConfettiExplosion from 'react-confetti-explosion';
import { PayPalButton } from 'react-paypal-button-v2';



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
  const [prompt1show,setPrompt1Show]=useState(false);
  const [prompt2show, setPrompt2Show]=useState(false);
  const [completePrompt,setCompShow]=useState(false)
  const [checked, setChecked] = useState(false);
  const [find, setFind]=useState('');
  const[purpose,setPurpose]=useState('');
  const [isExploding, setIsExploding]=useState('false')

  const cookie= new Cookies();

 
  let nav= useNavigate();

  const bg='https://firebasestorage.googleapis.com/v0/b/nstudy-dev.appspot.com/o/Backgrounds%2FMountains%2Fkurt-cotoaga-cqbLg3lZEpk-unsplash.jpg?alt=media&token=f49d81dc-a14a-4f2e-8e63-ed07f1df4cd3'
 
  let num=Math.floor(Math.random() * 30) + 2;
 

  const nextYear = new Date();

  nextYear.setFullYear(nextYear.getFullYear() + 1);

  const paypalOnError = (err) => {
    console.log("Error")
    }
  const paypalOnApprove = async (data, detail) => {
      
      step({data:data})
    
    };

    const step=async ({data})=>{
      await setDoc(doc(db,'Users',userData.uid,'Subscription','SubDetails'),{
        data: data
      })
    setModalShow(true)
    setIsExploding(true)
    setCompShow(false)
    }


  const createSes=async()=>{

     const docref = doc(db, 'Users',userData.uid)
        
   
     
        await setDoc(docref, {username: username, subscription: 'active',type: 'pro', email: userData.email}).then(async ()=>{
          
          const subref= collection(db, 'Users',userData.uid,'Subjects');
          
          
           // Adds a doc to the collection of Sessions and names it subjects with the description subjects
          await setDoc(doc(subref,'SubjectsList'),{subjects:[firstSub]});
          
          cookie.set('useraidt',userData.uid, {expires:  nextYear, path:'improvr.nitrondigital.com'});
          cookie.set('PAIDT', 'Tnf',{expires:  nextYear, path:'/'})
    
          localStorage.setItem('1stSignUp', true)
          localStorage.setItem('isAuth', true)
         
         
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
            setPrompt1Show(true)
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
            setPrompt1Show(true)
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

    const addForm=async()=>{
      const ref = doc(db, 'Forms',userData.uid)
      await setDoc(ref,{
        username:username,
        Find: find,
        Level: purpose
      })
      setCompShow(false);
      setModalShow(true)

    }

    

    

    
  return (
    <Container style={{display:'grid', placeItems:'center', background: `url(${bg}) no-repeat`, padding:'0%', margin:'0%', height:'100vh', width:'100vw'}} fluid={true} >
    
      <Card   style={{paddingTop:'50px',height:'480px', width:'360px', padding:'10px', margin:'20px', justifyContent:'center', alignItems:'center',textAlign:'center',background:'#282b2e', borderRadius:'20px', border:'4px solid rgb(97, 149, 232)', color:'lightgray'}}>
      <Card.Title>Sign Up </Card.Title>
      <Card.Body>
      <Button style={{marginTop:'5px', width:'300px'}} variant='primary' onClick={()=>{ setType('pro');signUpG()}} >Sign Up with Google <Google/></Button>
      <p style={{marginTop:'5px'}}>OR</p>
      <Form style={{textAlign:'left'}}>
        <Form.Control type='email' placeholder='Email' onChange={(e)=>{setEmail(e.target.value); if(email==='' || password===''|| username==='' || !checked){setSignDis(true)}else{setSignDis(false)}}}/>
        <Form.Control type='password' placeholder='Password' style={{marginTop:'5px'}} onChange={(e)=>{setPassword(e.target.value);if(email==='' || password===''|| username==='' || !checked){setSignDis(true)}else{setSignDis(false)} }}/>
        <Form.Control placeholder='Username' style={{marginTop:'5px', width:'100%'}} onChange={(e)=>{setUsername(e.target.value);if(email==='' || password==='' || username==='' || !checked ){setSignDis(true)}else{setSignDis(false)} }}/>
       
        <Form.Check type='checkbox'  style={{marginTop:'10px'}}  onChange={(e)=>{if(!e.target.checked || password==='' || email==='' || username===''){setSignDis(true); setChecked(false)}else{setSignDis(false); setChecked(true)}}} label='I accept the Terms and Conditions and Privacy Policy of Nitron Digital Improvr'/>
      
        
        <Button variant='secondary' disabled={signDis} style={{marginTop:'5px', width:'100%'}} onClick={()=>{setType('pro'); signUpEP()}}>Sign Up</Button>
        
      </Form>
     
      {errShow&&<Alert style={{marginTop:'5px'}} variant='danger'>{errMessage}</Alert>}
      </Card.Body>
      <p style={{textDecoration:'underline', color:'grey', cursor:'pointer' }} onClick={()=>{nav('/Login')}}>or go to Log In</p>
      <p style={{textDecoration:'underline', color:'grey', cursor:'pointer' }} onClick={()=>{nav('/')}}>or Try Improvr</p>

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
        <p style={{marginRight:'20px', textDecoration:'underline', color:'lightgray', cursor:'pointer'}} onClick={()=>{nav('/Ts&Cs')}}>Terms & Conditions</p>
        <p style={{marginRight:'20px', textDecoration:'underline', color:'lightgray', cursor:'pointer'}} onClick={()=>{nav('/PrivacyPolicy')}}>Privacy Policy</p>
        
       </div>
       <p style={{marginRight:'20px',  color:'lightgray'}}>All Rights belong to Nitron Digital</p>
       </div>
     
       <Modal
       className="special_modal"
       breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
       minBreakpoint="xxs"
         show={prompt1show}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          
          style={{color:'lightgray'}}
          centered>
            <Modal.Header>
              How Did You Find Us?
            </Modal.Header>
            <Modal.Body style={{display:'flex', flexDirection:'column', placeItems:'center', textAlign:'center'}}>
              <p>Tell us about how you found us, this will help us create a better experience for all users</p>
              <Button variant='outline-light' style={{width:'70%', marginBottom:'10px'}} onClick={()=>{setFind('Instagram'); setPrompt1Show(false); setPrompt2Show(true)}}>Social Media</Button>
              <Button variant='outline-light' style={{width:'70%', marginBottom:'10px'}} onClick={()=>{setFind('TikTok'); setPrompt1Show(false); setPrompt2Show(true)}}>Blogs</Button>
              <Button variant='outline-light' style={{width:'70%', marginBottom:'10px'}} onClick={()=>{setFind('Family or Friends'); setPrompt1Show(false); setPrompt2Show(true)}}>Family or Friends</Button>
              <Button variant='outline-light' style={{width:'70%', marginBottom:'10px'}} onClick={()=>{setFind('School'); setPrompt1Show(false); setPrompt2Show(true)}}>School</Button>
              <Button variant='outline-light' style={{width:'70%', marginBottom:'10px'}} onClick={()=>{setFind('Reddit'); setPrompt1Show(false); setPrompt2Show(true)}}>Reddit</Button>

            </Modal.Body>

          </Modal>

          <Modal
       className="special_modal"
       breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
       minBreakpoint="xxs"
         show={prompt2show}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          
          style={{color:'lightgray'}}
          centered>
            <Modal.Header>
              At What Level are you?
            </Modal.Header>
            <Modal.Body style={{display:'flex', flexDirection:'column', placeItems:'center', textAlign:'center'}}>
              <p>I am in:</p>
              <Button variant='outline-light' style={{width:'70%', marginBottom:'10px'}} onClick={()=>{setPurpose('Primary School(Gr1-Gr7)'); setPrompt2Show(false); setCompShow(true)}}>Primary School(Gr1-Gr7)</Button>
              <Button variant='outline-light' style={{width:'70%', marginBottom:'10px'}} onClick={()=>{setPurpose('High School(Gr8-Gr12)'); setPrompt2Show(false); setCompShow(true)}}>High School(Gr8-Gr12)</Button>
              <Button variant='outline-light' style={{width:'70%', marginBottom:'10px'}} onClick={()=>{setPurpose('Bachelors Degree'); setPrompt2Show(false); setCompShow(true)}}>Bachelor's Degree</Button>
              <Button variant='outline-light' style={{width:'70%', marginBottom:'10px'}} onClick={()=>{setPurpose('Honors Degree'); setPrompt2Show(false); setCompShow(true)}}>Honor's Degree</Button>
              <Button variant='outline-light' style={{width:'70%', marginBottom:'10px'}} onClick={()=>{setPurpose('Masters Degree'); setPrompt2Show(false); setCompShow(true)}}>Master's Degree</Button>
              <Button variant='outline-light' style={{width:'70%', marginBottom:'10px'}} onClick={()=>{setPurpose('PHD Degree'); setPrompt2Show(false); setCompShow(true)}}>PHD Degree</Button>
            

            </Modal.Body>

          </Modal>

          <Modal
       className="thin_modal"
       breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
       minBreakpoint="xxs"
         show={completePrompt}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          
          style={{color:'lightgray'}}
          centered>
            <Modal.Header>
             Join Improvr! 
            </Modal.Header>
            {isExploding && <ConfettiExplosion />}
            <Modal.Body style={{display:'flex', flexDirection:'column', placeItems:'center', textAlign:'center'}}>
            <div >
              <div style={{border:'2px solid rgb(97, 149, 232)', borderRadius:'5px', marginBottom:'10px', textAlign:'center'}}>
                <p style={{marginTop:'15px'}}>{num} people joined today</p>

              </div>

              <Card
              
              style={{border:'2px solid #393d40',background:'#17181a', display:'flex',flexDirection:'column',width:'300px', marginBottom:'20px', fontWeight:'lighter', padding:'25px', cursor:'pointer',color:'lightgray', overflow:'auto'}}
              >


                
                <div>
                    <p style={{fontSize:'20px'}}>Join Improvr pro today</p>
                        <h1 style={{fontSize:'40px', color:'rgb(97, 149, 232)'}}>$10</h1><br/>
                        <h3 style={{fontSize:'18px'}}>once off</h3>
                        <span>✅The full Improvr experience</span><br/>
                        <span>✅Unlimited Sessions</span><br/>
                        <span>✅Unlimited Projects</span><br/>
                       
                        <span>✅Up to 210 minutes a session</span><br/>
                        
                        <span>✅All Templates </span><br/>
                        
                        
                    
                        
                        <hr/>

                        <PayPalButton
                      style={{color:'blue'}}
                      amount = "10"
                      currency = "USD"
                      createOrder={(data,actions)=>{
                        return actions.order.create({
                          purchase_units: [{
                            amount: {
                              currency_code: "USD",
                              value: "10"
                            }
                          }],
                          application_context: {
                            shipping_preference: "NO_SHIPPING" // default is "GET_FROM_FILE"
                           }
                        });
                      
                      }}
                    
                      onApprove={paypalOnApprove}
                      catchError={paypalOnError}
                      onError={paypalOnError}
                      onCancel={paypalOnError}
                      />
                  </div>

                
              </Card>
             
                  
           
            
            </div>
              
            </Modal.Body>

          </Modal>
      
    </Container>
  )
}

export default SignUp