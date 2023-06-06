import { collection, orderBy, query, limit, onSnapshot, deleteDoc,doc, getDoc, updateDoc, arrayUnion,arrayRemove } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import {    useNavigate } from 'react-router-dom';

import Sidebar from '../Components/Sidebar'
import './Page.css';
import { db } from '../firebaseConfig';
import {Speedometer,CardText,BarChart, Hr, Journals, Bullseye, Check, Journal, Archive, Wallet2,Gear, Check2Square, ThreeDotsVertical, PersonWorkspace, Book, BrightnessHigh } from 'react-bootstrap-icons'
import {Button, Modal, Card, Row, Col,  Form, Accordion,Container, FormCheck, Nav, Dropdown} from 'react-bootstrap';
import Cookies from 'universal-cookie';
import ReactSlider from 'react-slider';
import firstTimeLogin from '../Components/firstTimeLogin';

import '../Util/SesSettings.css'
import { Helmet } from 'react-helmet';
import { Notice } from '../Components/modals';


function Dashboard() {
  

  const cookie = new Cookies()
  const user=cookie.get('useraidt')
  const paidt= cookie.get('PAIDT')
  const freedt=cookie.get('FAIDT')
 

  
  
  const subRef=collection(db, 'Users',user,'Sessions');
  const [recsesList, setRecsesList]=useState([]); //Recent Sessions 
  const [modalShow, setModalShow]=useState(false);
  const [modalData, setModalData]= useState([]);
  const [dataExists, setDataExists] = useState(true);
  const [scopesExists, setScopesExists]=useState(true);
  
  
  const [gomodalShow, setGoModalShow] = useState(false);

 
  const [workMinutes, setWorkMinutes] = useState(45);//sets work minutes
  const [breakMinutes, setBreakMinutes] = useState(15);//sets break minutes
  
  
  
  const [subjectList, setSubjectList] =useState([]);

  const [subj, setSub]=useState('');

  const [disabled, setDisabled]=useState(true);

  const [scopeList, setScopeList]= useState([]);
  const [scopeModal, setScopeModalShow]= useState(false)

  const [newTask, setNewTask]=useState('');
  const [Free,setFree]=useState('true')

  const [templatesList, setTemplatesList]=useState([]);
  const [tdataExists, setTDataExists]=useState(true);

  const [updateTitle, setUpdateTitle]=useState('');
  const [updateDesc, setUpdateDesc]= useState('');
  const [isUpdate, setIsUpdate]=useState(false);
  const [templates,setTemplates]=useState(true)
  const [saveDis, setSaveDis]=useState(true);
 
 
  let subref=  doc(db,'Users',user,'Subjects','SubjectsList');
  const scoperef= collection(db,'Users',user,'Scopes');

  const scopeQ= query(scoperef,limit(5));
  
 
 
  const docSnap = async()=>
  
  await getDoc(subref).then(docSnap=>{
    let subData=[];
    if(docSnap.exists()){
      
      subData= docSnap.data().subjects 
      
      
    }else{
     return null
    }
    setSubjectList(subData)
   
    
  })

  const newSub=async()=>{
    await updateDoc(subref, {
      subjects: arrayUnion(subj)
    });
   
    
  }
  
  const[maxTime,setMaxTime]=useState(0)

  const tempref= collection(db, 'Users', user, 'Templates');
 const q = query(subRef,orderBy('time', 'desc'),limit(5));

 const proTimeVal=()=>{
  if(paidt==='Tnf'){
    setMaxTime(210)
  }else {
    setMaxTime(90)
  }
 }


 useEffect(() => {  //loads all the 


  proTimeVal()
  onSnapshot(scopeQ, (snapshot) => {
    if(snapshot.empty){
      setScopesExists(false)
    }else{
    
      setScopeList(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      
      
    
    }})

    
    onSnapshot(tempref, (snapshot) => {

      if (snapshot.empty){
        setTDataExists(false)
    
      }else {
       
        setTDataExists(true)
        setTemplatesList(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      
      }
        
        
      });
 
 
  onSnapshot(q, (snapshot) => {

  if (snapshot.empty){
    setDataExists(false)

  }else {
   
    setRecsesList(
      snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  
  }
    
    
  });
  docSnap();
}, []);
 

  let nav = useNavigate();

  const DeleteSes=async({id})=>{
    const delref=doc(db, 'Users',user,'Sessions',id)
    await deleteDoc(delref)
   
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
   
    setModalShow(false)
  }

  const newTassk=async({id})=>{
    const newRef=doc(db,'Users', user, 'Scopes', id)
    await updateDoc(newRef,{
      incomplete: arrayUnion(newTask)
    })
    
  }

  const Save=async({id})=>{
    const ref = doc(db,'Users',user,'Scopes',id)
    await updateDoc(ref,{
      title: updateTitle,
      description: updateDesc
    })
    setScopeModalShow(false)
    setIsUpdate(false)
  }

  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  const ref= doc(db,'Users',user);
  const updateMe=async ()=>{
    await updateDoc(ref,{
      type: 'pro'
    }).then(()=>{
      cookie.set('PAIDT', 'Tnf',{expires:  nextYear, path:'/'})
      setFree('false')
     
    })
    
  }




  

  return (
    
    
    <div className='Page' >
      
      
      {paidt==='Tnf'?null:<Notice show={Free} setShow={setFree} update={updateMe}/>}
    
     
       
        <div className="navB">
        <Sidebar />
        </div>
       

     
       
        <div className="bod">
        
         <div className="top">
         <Card style={{
            
             margin:'20px',
             height:'160px',
             backgroundColor:'#17181a',
             border: '3px solid rgb(97, 149, 232)',
             backgroundSize:'400% 400%',
             textAlign:'center',
             alignItems:'center',
             color:'white',
             padding:' 10px',
             animation:'gradient 15s ease infinite'
              }}>
            <Card.Title style={{  marginBottom:'30px'}}><h1 style={{FontWeight:'bold', FontSize:'40px'}}>Dashboard</h1></Card.Title>
            
          <Button  variant='primary' size='lg' onClick={()=>{setGoModalShow(true)}}>Start a new Session</Button>
          
          </Card>

          <Modal
            className="special_modal"
           
              show={gomodalShow}
              
               aria-labelledby="contained-modal-title-vcenter"
               onHide={()=>{setGoModalShow(false)}}
               style={{color:'lightgray'}}
               >
                <Modal.Header closeButton closeVariant='white'>
           <Modal.Title style={{color:'lightgray'}}>
            Configure your Session
           </Modal.Title>
          </Modal.Header>
           <Modal.Body>
           <div>
          <div style={{display:'flex'}}>
                    <Button variant='dark' style={{width:'50%', marginRight:'5px'}} onClick={()=>{setTemplates(false)}}>Custom</Button>
                    <Button variant='dark' style={{width:'50%'}} onClick={()=>{setTemplates(true)}}>Templates</Button>
                  </div>
          </div>
          {templates?
          <div>
            {tdataExists? templatesList.map((temp)=>{
           return (
            <Col style={{width:'450px', marginBottom:'10px', padding:'10px'}}xs='2' >
            <Card style={{width:'100%', backgroundColor:'#282b2e', color:'lightgray' , height:'100%', marginTop:'10px', border:' 2px solid #393d40'}} >
              <Card.Header style={{display:'flex'}}>
                <Card.Title>{temp.title}</Card.Title> 
                
               </Card.Header>
           <Card.Body>
            
            <Card.Text>
               <p><Book style={{marginRight:'5px'}}/>{temp.subject}</p>
               <div style={{marginTop:'10px'}}>
               <p><PersonWorkspace style={{marginRight:'5px'}}/>{temp.workTime} Minutes</p>
               <p><BrightnessHigh style={{marginRight:'5px'}}/>{temp.breakTime} Minutes</p>
               </div>
               </Card.Text>
            </Card.Body>
            <Card.Footer><Button 
            style={{width:'100%'}}
            onClick={(e)=>{ nav(`/Timer/`, {state:{
              workMinutes: temp.workTime, 
              breakMinutes: temp.breakTime,
              subject: temp.subject, 
              WT: temp.WorkTime, 
              BT: temp.breakTime, 
              OWTsum:0,
              sessionTasks: temp.sessionTasks,
              OBTsum:0,
              NT:false
             }})}}
            >Start</Button></Card.Footer>

           </Card>
           </Col>
           )

        }):
        <div>
          <center>
          <p style={{color:'lightgray', textAlign:'center', fontSize:'15px', marginTop:'10px'}}>No Templates added yet</p>
         <Button onClick={()=>{nav('/Templates')}}  variant='outline-secondary' style={{borderStyle:'dashed', marginRight:'10px', borderRadius:'15px'}}>Create a template</Button>
          </center>
          </div>
          }
          </div>
          
          
          :
          <div>
            
            <div className="times" style={{border: '3px solid rgb(97, 149, 232)',marginTop:'20px' ,display:'flex', flexDirection:'column', placeItems:'center', margin:'10px', borderRadius:'20px', padding:'20px',color:'lightgray'}}>
                <p style={{fontSize:'20px'}} >Select Your Times:</p>
              <label style={{marginLeft:'20px', marginTop:'10px',color:'lightgray'}}>Work Minutes: {workMinutes}:00</label>
              <ReactSlider 
              className='slider'
              thumbClassName='thumb'
              trackClassName='track'
              value={workMinutes}
              onChange={newValue => setWorkMinutes(newValue)}
              min={1}
              max={maxTime}
              
              
              />
            

            <label style={{marginLeft:'20px',color:'lightgray'}}>Break Minutes: {breakMinutes}:00</label>
              
              <ReactSlider 
              className='slider green'
              thumbClassName='thumb'
              trackClassName='track'
              value={breakMinutes}
              onChange={newValue => setBreakMinutes(newValue)}
              min={1}
              
              max={maxTime}
              
              
              />
             
              </div>

            


             
             <div className="list" style={{border: '3px solid rgb(97, 149, 232)', display:'flex', flexDirection:'column', placeItems:'center', margin:'10px', borderRadius:'20px', padding:'20px',color:'lightgray'}}>
              <p  style={{placeItems:'center', fontSize:'25px',color:'lightgray'}}>Choose or add a subject</p>
              <Form style={{display:'flex', marginTop:'10px', marginBottom:'10px'}}>
                <Form.Control className='special_modal' placeholder='Math' style={{width:'350px', marginRight:'5px'}}  onChange={(e)=>{setSub(e.target.value);if(e.target.value===''){setDisabled(true)} else{setDisabled(false)}}}/>
                <Button disabled={disabled} onClick={()=>{newSub();setSubjectList([...subjectList,subj])}}>Add</Button>
              </Form>
             
            <Container fluid={true}>
              <Row>
              {subjectList.map((sub)=>{
              
              return(
               <Col xs='2' style={{marginRight:'45px', marginLeft:'0'}}>
                <Button 
                type="checkbox"
                 value={sub} 
                 variant="dark"
                
                 onClick={(e)=>{ nav(`/Timer/`, {state:{
                  workMinutes: workMinutes, 
                  breakMinutes: breakMinutes,
                  subject: (e.target.value), 
                  WT: workMinutes, 
                  BT: breakMinutes, 
                  OWTsum:0,
                  OBTsum:0,
                  NT:false
                 }})}}
                 style={{marginRight:'5px', marginBottom:'5px', width:'100px'}}>
                  {sub}
                </Button>
                </Col>
              )
            
            })}
              </Row>
            </Container>
             </div>

          </div>
          
          }
        
           </Modal.Body>
                  
              
     

         
         

          </Modal>
          
         
         </div>

         
        
        <div className="Recent" style={{ padding:'20px', borderRadius:'10px', border:'1px solid #282b2e', margin:'20px'}} >
          
          <p style={{marginBottom:'10px', fontSize:'23px',color:'lightgray'}}>Recent Sessions:</p>
         
              {dataExists?   recsesList.map((rec)=>{
              return(
                
                <div>
                  
                 
                  <Card 
                  style={{background:'#282b2e' , display:'flex', marginBottom:'20px', fontWeight:'lighter', padding:'15px', cursor:'pointer',color:'lightgray', border:' 2px solid #393d40'}} 
                  onClick={()=>{setModalShow(true); setModalData(rec) }}  
                  breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
                  minBreakpoint="xxs">
                    <Row>
                      <Col xs={4} > <h3 style={{fontWeight:'400', fontSize:'20px'}}>{rec.subject}</h3></Col>
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
                       style={{color:'gray'}}
                       aria-labelledby="contained-modal-title-vcenter"
                       onHide={()=>{setModalShow(false)}}
                       centered>
                    <Modal.Header closeButton closeVariant='white'>
                    <Modal.Title  id="contained-modal-title-vcenter" style={{marginRight:'70%',color:'lightgray'}}>
                     Session
                    </Modal.Title>
                    <Button variant='danger' onClick={()=>{DeleteSes({id: modalData.id})}}>Delete</Button>
                    </Modal.Header>
                     <Modal.Body>
                      <div className="subject" style={{backgroundColor:'rgb(12,12,12)',padding:'10px', borderRadius:'10px', margin:'10px', border:' 2px solid #393d40'}}>
                      <h4 style={{fontWeight:'bold', fontSize:'20px',color:'lightgray'}}>Subject: </h4>
                       <h4  style={{fontWeight:'400', fontSize:'20px',color:'lightgray'}}>{modalData.subject}</h4>
                      </div>
                       <div className="times"  style={{backgroundColor:'rgb(12,12,12)',padding:'10px', borderRadius:'10px', margin:'10px', border:' 2px solid #393d40'}}>
                       <h4 style={{fontWeight:'bold', fontSize:'20px',color:'lightgray'}}>Work Time: </h4>
                       <h4 style={{fontWeight:'400', fontSize:'20px',color:'lightgray'}}>{modalData.WorkTime} minutes</h4>
                       <h4 style={{fontWeight:'bold', fontSize:'20px',color:'lightgray'}}> Break Time: </h4>
                       <h4 style={{fontWeight:'400', fontSize:'20px',color:'lightgray'}}>{modalData.BreakTime} minutes</h4>
                       </div>
                       <div className="date"  style={{backgroundColor:'rgb(12,12,12)',padding:'10px', borderRadius:'10px', margin:'10px', border:' 2px solid #393d40'}}>
                       <h4 style={{fontWeight:'bold', fontSize:'20px',color:'lightgray'}}>Date: </h4>
                        <h4 style={{fontWeight:'400', fontSize:'20px',color:'lightgray'}}>{modalData.time}</h4>
                       </div>
                      <div className="rating"  style={{backgroundColor:'rgb(12,12,12)',padding:'10px', borderRadius:'10px', margin:'10px', border:' 2px solid #393d40'}}>
                      <h4 style={{fontWeight:'bold', fontSize:'20px',color:'lightgray'}}>Rating: </h4>
                        <h4 style={{fontWeight:'400', fontSize:'20px',color:'lightgray'}}>{modalData.rating}⭐</h4>
                      </div>
                       <div className="desc" style={{backgroundColor:'rgb(12,12,12)',padding:'10px', borderRadius:'10px', margin:'10px', border:' 2px solid #393d40'}}>
                       <h5 style={{fontWeight:'bold', fontSize:'20px',color:'lightgray'}}>Description:</h5>
                       <p style={{fontWeight:'400', fontSize:'15x', padding:'10px', backgroundColor:'light-gray'}}>{modalData.description}</p>
                       </div>
                       <div className="Complete"  style={{backgroundColor:'RGB(12,12,12)', padding:'10px', margin:'10px', borderRadius:'10px' ,color:'lightgray',  border:' 2px solid #393d40', overflowY:'scroll', height:'100px'}}>
                       <h4 style={{fontWeight:'bold', fontSize:'20px',color:'lightgray'}}>Session Tasks:</h4>
                       {modalData.sessionTasks?.map((comp)=>{
                       return(
                         <div className="list">

                                 <Card 
                                style={{background:'#282b2e', display:'flex', marginBottom:'20px', fontWeight:'lighter', padding:'15px', cursor:'pointer',color:'lightgray', border:'2px solid #393d40' }} 
                                
                                breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
                                minBreakpoint="xxs">
                                  <Row>
                                  <Col>
                                  <h3 style={{fontWeight:'400', fontSize:'20px'}}>{comp}</h3></Col>
                                  
                                
                                  </Row>
                              
                                  </Card>

                         </div >
                       )
                     })}
                       </div>
                            
                       
                     </Modal.Body>
                     </Modal>

                    
              
                  </div>                      
              )
            }): 
            <center>
              <p style={{color:'lightgray', textAlign:'center', fontSize:'25px'}}>No Sessions added yet</p>
               <Button onClick={()=>{nav('/Templates')}}  variant='outline-secondary' style={{borderStyle:'dashed', marginRight:'10px', borderRadius:'15px'}}>Find a Template to get started</Button>
            </center>}

             
             
          </div>
          <div className="RecentScopes" style={{ padding:'20px', borderRadius:'10px', border:'1px solid #282b2e', margin:'20px'}} >
          <p style={{marginBottom:'10px', fontSize:'23px', marginLeft:'22px', color:'lightgray'}}>Recent Scopes:</p>
           
         <Container fluid={true} style={{marginLeft:'8px', overflow:'auto'}}>
          <Row >
          {scopesExists? scopeList.map((scop)=>{
            return(
             
               <Col style={{width:'450px', marginBottom:'10px'}}xs='2' >
                

                <Card style={{width:'100%', backgroundColor:'#282b2e', color:'lightgray' , cursor:'pointer', height:'100%', marginTop:'10px', border:' 2px solid #393d40'}} onClick={()=>{setScopeModalShow(true); setModalData(scop); }}>
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
                 <Button variant='outline-light' onClick={()=>{if(isUpdate){setIsUpdate(false); setSaveDis(true)}else{setIsUpdate(true); setSaveDis(false)}}} style={{marginRight:'10px'}}>Edit</Button>
                 <Button variant='danger' onClick={()=>{DeleteSco({id: modalData.id})}}>Delete</Button>
                 </Modal.Header>
                   <Modal.Body>
                     
                   {isUpdate? <Form style={{display:'flex',backgroundColor:'RGB(12,12,12)', padding:'10px', margin:'10px', borderRadius:'10px'}}>
                       <Form.Control style={{width:'80%',}} placeholder={modalData.title} 
                       onChange={(e)=>{if(e.target.value===''){setUpdateTitle(modalData.title)}else{
                         setUpdateTitle(e.target.value)
                       }}}/>
                       
                     </Form>:<h1  style={{fontWeight:'bold', backgroundColor:'RGB(12,12,12)', padding:'10px', margin:'10px', borderRadius:'10px' ,color:'lightgray', border:' 2px solid #393d40'}}>{modalData.title}</h1>}
                    
                     {isUpdate? <Form style={{display:'flex',backgroundColor:'RGB(12,12,12)', padding:'10px', margin:'10px', borderRadius:'10px'}}>
                       <Form.Control style={{width:'80%',}} placeholder={modalData.description}
                       onChange={(e)=>{if(!e.target.value){setUpdateDesc(modalData.description)}else{
                         setUpdateDesc(e.target.value)
                       }}}/>
                       
                     </Form>:<p style={{fontWeight:'400', backgroundColor:'RGB(12,12,12)', padding:'10px', margin:'10px', borderRadius:'10px' ,fontWeight:'lighter', fontSize:'20px',color:'lightgray',  border:' 2px solid #393d40'}}>Description:<br/>{modalData.description} </p>}
                     
                     
                     <div className="mbod">

                     <div className="Incomplete" style={{backgroundColor:'RGB(12,12,12)', padding:'10px', margin:'10px', borderRadius:'10px' ,color:'lightgray', border:' 2px solid #393d40'}}>
                       <h3>Incomplete:</h3>
                       <div style={{display:'inline'}}>
                          <Form style={{display:'flex', marginBottom:'10px'}}>
                             <Form.Control className='special_modal' placeholder='Add a Task' style={{width:'80%'}} onChange={(e)=>{setNewTask(e.target.value)}}/>
                             <Button style={{marginLeft:'10px'}} onClick={()=>{newTassk({id:modalData.id});modalData.incomplete.push(newTask)}}>Add</Button>
                           </Form>
                          </div>
                 

                             {modalData.incomplete?.map((inc)=>{
                       return(
                         <div className="list">

                           <Button  variant="secondary" value={inc}  style={{marginRight:'5px', marginBottom:'5px'}} onClick={()=>{movetask({id:modalData.id, task:inc}); 
                             var del= modalData.incomplete.indexOf(inc); 
                            
                             modalData.incomplete.splice(del,1);
                              modalData.complete.push(inc)}}><Check/></Button>
                           <label style={{marginBottom: '5px'}}>{inc}</label><br/>

                         </div >
                       )
                     })}

                     </div>
                       

                     <div className="Complete"  style={{backgroundColor:'RGB(12,12,12)', padding:'10px', margin:'10px', borderRadius:'10px' ,color:'lightgray',  border:' 2px solid #393d40'}}>
                       <h3>Complete:</h3>
                       {modalData.complete?.map((comp)=>{
                       return(
                         <div className="list">

                         
                           <Button  variant="secondary" value={comp}  style={{marginRight:'5px', marginBottom:'5px'}} onClick={()=>{
                             movetaskBack({id:modalData.id, task:comp}); 
                             var del = modalData.complete.indexOf(comp);
                             modalData.complete.splice(del,1)
                              modalData.incomplete.push(comp)}}><Check/></Button>
                           <label style={{marginBottom: '5px'}}>{comp}</label><br/>
                         
                           

                         </div >
                       )
                     })}
                       </div>

                     </div>
                   </Modal.Body>
                   <Modal.Footer>
                   <Button variant='outline-light' onClick={()=>{Save({id:modalData.id})}} disabled={saveDis}>Save</Button>
                   </Modal.Footer>
                   </Modal>
                   </Col>
                   

                 

          
            
             

            )
          }): <div >
              <center>
              <p style={{color:'lightgray', textAlign:'center', fontSize:'25px'}}>No scopes added yet</p>
               <Button onClick={()=>{nav('/Templates')}}  variant='outline-secondary' style={{borderStyle:'dashed', marginRight:'10px', borderRadius:'15px'}}>Find a Template to get started</Button>
              </center>
            </div>}
          </Row>
         </Container>
          </div>
        </div>
    
        </div>
      
      
      
      
    
  )
}

export default Dashboard