import { collection, orderBy, query, limit, onSnapshot, deleteDoc,doc, getDoc, updateDoc, arrayUnion,arrayRemove } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import {    useNavigate } from 'react-router-dom';

import Sidebar from '../Components/Sidebar'
import './Page.css';
import { db } from '../firebaseConfig';
import {Speedometer,CardText,BarChart, Hr, Journals, Bullseye } from 'react-bootstrap-icons'
import {Button, Modal, Card, Row, Col,  Form, Accordion,Container} from 'react-bootstrap';
import Cookies from 'universal-cookie';
import ReactSlider from 'react-slider';
import '../Util/SesSettings.css'


function Dashboard() {
  

  const cookie = new Cookies()
  const user=cookie.get('useraidt')
  
  const subRef=collection(db, 'Users',user,'Sessions');
  const [recsesList, setRecsesList]=useState([]); //Recent Sessions 
  const [modalShow, setModalShow]=useState(false);
  const [modalData, setModalData]= useState([]);
  
  
  
  const [gomodalShow, setGoModalShow] = useState(false);

 
  const [workMinutes, setWorkMinutes] = useState(45);//sets work minutes
  const [breakMinutes, setBreakMinutes] = useState(15);//sets break minutes
  
  const [subjectList, setSubjectList] =useState([]);
  const [subj, setSub]=useState('');

  const [disabled, setDisabled]=useState(true);

  const [scopeList, setScopeList]= useState([]);
  const [scopeModal, setScopeModalShow]= useState(false)
 
 
  let subref=  doc(db,'Users',user,'Subjects','SubjectsList');
  const scoperef= collection(db,'Users',user,'Scopes');

  const scopeQ= query(scoperef,limit(5));
  
 
  const docSnap = async()=>
  
  await getDoc(subref).then(docSnap=>{
    let subData=[];
    if(docSnap.exists()){
      
      subData= docSnap.data().subjects 
      
      
    }else{
      console.log('null');
    }
    setSubjectList(subData)
   
    
  })

  const newSub=async()=>{
    await updateDoc(subref, {
      subjects: arrayUnion(subj)
    });
    setModalShow(false);
    window.location.reload();
  }
 
 const q = query(subRef,orderBy('time', 'desc'),limit(5));


 useEffect(() => {  //loads all the 
 
  onSnapshot(scopeQ, (snapshot) => {
    setScopeList(
       snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
     );
     
     
   });
 
 
  onSnapshot(q, (snapshot) => {
   setRecsesList(
      snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
    
    
  });
  docSnap();
}, []);
 

  let nav = useNavigate();

  const DeleteSes=async({id})=>{
    const delref=doc(db, 'Users',user,'Sessions',id)
    await deleteDoc(delref)
    console.log('deleted');
    setModalShow(false)
  }

  const movetask=async({id, task})=>{
    const ref = doc(db,'Users',user,'Scopes',id)
    await updateDoc(ref,{
      incomplete: arrayRemove(task),
      complete: arrayUnion(task)


    });
   
    
    
   }

   const movetaskBack=async({id,task})=>{
    const ref = doc(db,'Users',user,'Scopes',id)
    await updateDoc(ref,{
      incomplete: arrayUnion(task),
      complete: arrayRemove(task)
    })
   }

   const DeleteSco=async({id})=>{
    const delref=doc(db, 'Users',user,'Scopes',id)
    await deleteDoc(delref)
    console.log('deleted');
    setModalShow(false)
  }


  

  return (
    <div className='Page'>
      
     
       
        <div className="navB">
        <Sidebar
        L1={<Button variant='light-outline' onClick={()=>nav(`/Dashboard/`)}><Speedometer style={{color:'white'}}/></Button>}
        L2={<Button variant='light-outline' onClick={()=>nav(`/Sessions/`)}><Journals style={{color:'white'}}/></Button>}
        L3={<Button variant='light-outline' onClick={()=>nav(`/Trends/`)}><BarChart style={{color:'white'}}/></Button>}
        L4={<Button variant='light-outline' onClick={()=>nav(`/Scopes/`)}><Bullseye style={{color:'white'}}/></Button>}/>
        </div>
       
        
     
       
        <div className="bod">
        
         <div className="top">
         <Card style={{
            width:'93vw',
             margin:'20px',
             height:'150px',
             backgroundColor:'rgb(97, 149, 232)',
             backgroundSize:'400% 400%',
             textAlign:'center',
             alignItems:'center',
             color:'white',
             padding:' 10px',
             animation:'gradient 15s ease infinite'
              }}>
            <Card.Title ><h1 style={{FontWeight:'bold', FontSize:'40px'}}>Start A New Session</h1></Card.Title>
            
          <Button  variant='outline-light' style={{height:'60px', width:'100px' }} onClick={()=>{setGoModalShow(true)}}>Lets Go!</Button>
          
          </Card>

          <Modal
            className="special_modal"
            breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
            minBreakpoint="xxs"
              show={gomodalShow}
               size="lg"
               aria-labelledby="contained-modal-title-vcenter"
               onHide={()=>{setGoModalShow(false)}}
               centered>
                <Modal.Header closeButton closeVariant='white'>
           <Modal.Title>
            Configure your Session
           </Modal.Title>
          </Modal.Header>
        
                  
              <div className="times" style={{backgroundColor:'rgb(12,12,12)', display:'flex', flexDirection:'column', placeItems:'center', margin:'10px', borderRadius:'20px', padding:'20px'}}>
                <h4 >Select Your Times:</h4>
              <label style={{marginLeft:'20px', marginTop:'10px'}}>Work Minutes: {workMinutes}:00</label>
              <ReactSlider 
              className='slider'
              thumbClassName='thumb'
              trackClassName='track'
              value={workMinutes}
              onChange={newValue => setWorkMinutes(newValue)}
              min={1}
              max={120}
              
              
              />
            

            <label style={{marginLeft:'20px'}}>Break Minutes: {breakMinutes}:00</label>
              
              <ReactSlider 
              className='slider green'
              thumbClassName='thumb'
              trackClassName='track'
              value={breakMinutes}
              onChange={newValue => setBreakMinutes(newValue)}
              min={1}
              
              max={120}
              
              
              />
              </div>

             
             <div className="list" style={{display:'inline',padding:'20px', margin:'10px',backgroundColor:'rgb(12,12,12)', borderRadius:'20px', placeItems:'center'}}>
              <h4 style={{placeItems:'center', fontSize:'20px'}}>Choose or add a subject</h4>
              <Form style={{display:'flex', marginTop:'10px', marginBottom:'10px'}}>
                <Form.Control placeholder='Math' style={{width:'450px', marginRight:'5px'}} onChange={(e)=>{setSub(e.target.value);if(e.target.value===''){setDisabled(true)} else{setDisabled(false)}}}/>
                <Button disabled={disabled} onClick={newSub}>Add</Button>
              </Form>
             
            <Container fluid={true}>
              <Row>
              {subjectList.map((sub)=>{
              
              return(
               <Col xs='2'>
                <Button 
                type="checkbox"
                 value={sub} 
                 variant="secondary"
                
                 onClick={(e)=>{ nav(`/Timer/`, {state:{workMinutes: workMinutes, breakMinutes: breakMinutes, subject: (e.target.value)}})}}
                 style={{marginRight:'5px', marginBottom:'5px', width:'100px'}}>
                  {sub}
                </Button>
                </Col>
              )
            
            })}
              </Row>
            </Container>
             </div>

              
     

         
          

          </Modal>
          
         
         </div>

         
        
        <div className="Recent" >
          <h3 style={{marginBottom:'10px', fontSize:'23px'}}>Recent Sessions:</h3>
         
            {recsesList.map((rec)=>{
              return(
                
                <div>
                  
                 
                  <Card 
                  style={{background:'RGB(12,12,12)' , display:'flex', width:'100%', marginBottom:'20px', fontWeight:'lighter', padding:'15px', cursor:'pointer'}} 
                  onClick={()=>{setModalShow(true); setModalData(rec) }}  
                  breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
                  minBreakpoint="xxs">
                    <Row>
                      <Col xs={6} > <h3 style={{fontWeight:'400', fontSize:'20px'}}>{rec.subject}</h3></Col>
                      <Col > <h3 style={{fontWeight:'400', fontSize:'20px'}}>{rec.WorkTime}</h3></Col>
                      <Col > <h3 style={{fontWeight:'400', fontSize:'20px'}}>{rec.BreakTime}</h3></Col>
                      <Col > <h3 style={{fontWeight:'400', fontSize:'20px'}}>{rec.time}</h3></Col>
                      
      
                   
                      </Row>
                  
                    </Card>

                    <Modal
                    className="special_modal"
                    breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
                    minBreakpoint="xxs"
                      show={modalShow}
                       size="lg"
                       aria-labelledby="contained-modal-title-vcenter"
                       onHide={()=>{setModalShow(false)}}
                       centered>
                    <Modal.Header closeButton closeVariant='white'>
                    <Modal.Title  id="contained-modal-title-vcenter" style={{marginRight:'70%'}}>
                     Session
                    </Modal.Title>
                    <Button variant='danger' onClick={()=>{DeleteSes({id: modalData.id})}}>Delete</Button>
                    </Modal.Header>
                     <Modal.Body>
                       <h4 style={{fontWeight:'bold', fontSize:'20px'}}>Subject: </h4>
                       <h4  style={{fontWeight:'400', fontSize:'20px'}}>{modalData.subject}</h4>
                       <h4 style={{fontWeight:'bold', fontSize:'20px'}}>Work Time: </h4>
                       <h4 style={{fontWeight:'400', fontSize:'20px'}}>{modalData.WorkTime} minutes</h4>
                       <h4 style={{fontWeight:'bold', fontSize:'20px'}}> Break Time: </h4>
                       <h4 style={{fontWeight:'400', fontSize:'20px'}}>{modalData.BreakTime} minutes</h4>
                       <h4 style={{fontWeight:'bold', fontSize:'20px'}}>Date: </h4>
                        <h4 style={{fontWeight:'400', fontSize:'20px'}}>{modalData.time}</h4>
                       <h4 style={{fontWeight:'bold', fontSize:'20px'}}>Rating: </h4>
                        <h4 style={{fontWeight:'400', fontSize:'20px'}}>{modalData.rating}⭐</h4>
                       <h5 style={{fontWeight:'bold', fontSize:'20px'}}>Description:</h5>
                       <p style={{fontWeight:'400', fontSize:'15x', padding:'10px', backgroundColor:'light-gray'}}>{modalData.description}</p>
                     </Modal.Body>
                     </Modal>

                    
              
                  </div>                      
              )
            })}

             
             
          </div>
          <div className="RecentScopes">
          <h3 style={{marginBottom:'10px', fontSize:'23px', marginLeft:'20px', color:'white'}}>Recent Scopes:</h3>
           
         <Container fluid={true}>
          <Row >
          {scopeList.map((scop)=>{
            return(
              <Col xs='2'  >
                <div>

                 <Card style={{width:'17rem', background:'RGB(12, 12, 12)', color:'white',  cursor:'pointer', height:'180px', marginTop:'10px'}} onClick={()=>{setScopeModalShow(true); setModalData(scop); }}>
                    <Card.Body>
                     <Card.Title>{scop.title}</Card.Title>
                      <Card.Text>
                       {scop.description}
                       </Card.Text>
                     </Card.Body>

                    </Card>

                  <Modal
                    
                    show={scopeModal}
                      size="lg"
                      aria-labelledby="contained-modal-title-vcenter"
                      onHide={()=>{setScopeModalShow(false)}}
                      className="special_modal"
                      
                      centered>
                  <Modal.Header closeButton closeVariant='white'> 
                  <Modal.Title  id="contained-modal-title-vcenter"  style={{marginRight:'70%'}}>
                    Scope
                  </Modal.Title>
                  <Button variant='danger' onClick={()=>{DeleteSco({id: modalData.id})}}>Delete</Button>
                  </Modal.Header>
                    <Modal.Body>
                      
                      <h1  style={{fontWeight:'bold', backgroundColor:'RGB(12,12,12)', padding:'10px', margin:'10px', borderRadius:'10px' }}>{modalData.title}</h1>
                     
                      <p style={{fontWeight:'400', backgroundColor:'RGB(12,12,12)', padding:'10px', margin:'10px', borderRadius:'10px' ,fontWeight:'lighter', fontSize:'20px'}}>Description:<br/>{modalData.description} minutes</p>
                      
                      <div className="mbod">
                  
                      <Accordion defaultActiveKey='0'  style={{backgroundColor: 'rgb(41, 44, 51)', marginBottom:'10px'}}>
                        <Accordion.Item eventkey='0'>
                          <Accordion.Header>Incomplete</Accordion.Header>
                          <Accordion.Body>

                              {modalData.incomplete?.map((inc)=>{
                        return(
                          <div className="list">

                            <input type="checkbox" value={inc}  style={{marginRight:'5px', marginBottom:'5px'}} onClick={()=>{movetask({id:modalData.id, task:inc})}}/>
                            <label style={{marginBottom: '5px'}}>{inc}</label><br/>

                          </div >
                        )
                      })}
                          </Accordion.Body>

                        </Accordion.Item>


                      </Accordion>

                      <Accordion defaultActiveKey='0'>
                        <Accordion.Item eventkey='0'>
                          <Accordion.Header>Complete</Accordion.Header>
                          <Accordion.Body>

                              {modalData.complete?.map((comp)=>{
                        return(
                          <div className="list">

                          
                            <input type="checkbox" value={comp}  style={{marginRight:'5px', marginBottom:'5px'}} onClick={()=>{movetaskBack({id:modalData.id, task:comp})}}/>
                            <label style={{marginBottom: '5px'}}>{comp}</label><br/>
                          
                            

                          </div >
                        )
                      })}
                          </Accordion.Body>

                        </Accordion.Item>

                        </Accordion>

                      </div>
                    </Modal.Body>
                    </Modal>

                </div>
              </Col>


            )
          })}
          </Row>
         </Container>
          </div>
        </div>
        </div>
      
      
      
      
    
  )
}

export default Dashboard