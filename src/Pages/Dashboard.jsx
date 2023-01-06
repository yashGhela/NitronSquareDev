import { collection, orderBy, query, limit, onSnapshot, deleteDoc,doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import {    useNavigate } from 'react-router-dom';

import Sidebar from '../Components/Sidebar'
import './Page.css';
import { db } from '../firebaseConfig';
import {Speedometer,CardText,BarChart, Hr, Journals, Bullseye } from 'react-bootstrap-icons'
import {Button, Modal, Card, Row, Col,  Form} from 'react-bootstrap';
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
 
 
  let subref=  doc(db,'Users',user,'Subjects','SubjectsList')
  
 
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
             
             {subjectList.map((sub)=>{
              
              return(
                <Button 
                type="checkbox"
                 value={sub} 
                 variant="secondary"
                
                 onClick={(e)=>{ nav(`/Timer/`, {state:{workMinutes: workMinutes, breakMinutes: breakMinutes, subject: (e.target.value)}})}}style={{marginRight:'5px', marginBottom:'5px', width:'100px'}}>
                  {sub}
                </Button>
              )
            
            })}
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
        </div>
        </div>
      
      
      
      
    
  )
}

export default Dashboard