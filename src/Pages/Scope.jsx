import React from 'react'
import { Button , Card, Modal, Accordion, Col, Row, Container,Form, Offcanvas, Badge, Toast} from 'react-bootstrap'
import {Speedometer,CardText,BarChart, Journals, Bullseye, Check } from 'react-bootstrap-icons'
import {  useNavigate } from 'react-router-dom'
import Sidebar from '../Components/Sidebar'
import Cookies from 'universal-cookie'
import { Hr } from 'react-bootstrap-icons'
import { db } from '../firebaseConfig'
import { useEffect } from 'react'
import { onSnapshot, collection, updateDoc, arrayRemove, arrayUnion,doc, query, orderBy, deleteDoc, addDoc } from 'firebase/firestore'
import { useState } from 'react'

import { format } from 'date-fns/esm';
import { async } from '@firebase/util'



function Scope() {

  const [scopeList, setScopeList]= useState([]);
  const [newTask, setNewTask]=useState('');
  
  const[modalData, setModalData]=useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [offShow, setOffShow]=useState(false)
  
    const nav=useNavigate();
    const cookie = new Cookies()
    const user=cookie.get('useraidt')
    const subref= collection(db,'Users',user,'Scopes');
    const [scopesExists, setScopesExists]=useState(true);

  
    const [Newtitle, setNewTitle]=useState();
    const [Newdescription, setNewDescritption]=useState('');
    
    const [disabled, setDisabled]=useState(true);
    const [task, setTask]=useState('');
    const [NewtaskList, setNewTaskList]= useState([]);

    const [updateTitle, setUpdateTitle]=useState('');
    const [updateDesc, setUpdateDesc]= useState('');
    const [isUpdate, setIsUpdate]=useState(false);
    const [saveDis, setSaveDis]=useState(true);
  
    const addScope=async()=>{
      
      const subref= collection(db,'Users',user,'Scopes');
      await addDoc(subref, {
        title: Newtitle,
        description: Newdescription,
        incomplete: NewtaskList,
        complete: [],
        date: format(new Date(), 'yyyy/MM/dd')
      })
      setOffShow(false)
      setNewTaskList([])
      
    }

  

    useEffect(() => {  
    
 
    
 
      onSnapshot(subref, (snapshot) => {
        if(snapshot.empty){
          setScopesExists(false)
        }else{
        
          setScopeList(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
          }    
        
        
      });
    }, []);

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

   const DeleteSes=async({id})=>{
    const delref=doc(db, 'Users',user,'Scopes',id)
    await deleteDoc(delref)
    console.log('deleted');
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
    setModalShow(false)
    setIsUpdate(false)
  }





  
    

  return (
    
    <div className='Page' style={{height:'100vh'}}>


         <div className="navB">
         <Sidebar
        L1={<Button variant='light-outline' onClick={()=>nav(`/Dashboard/`)}><Speedometer style={{color:'white'}}/></Button>}
        L2={<Button variant='light-outline' onClick={()=>nav(`/Sessions/`)}><Journals style={{color:'white'}}/></Button>}
        L3={<Button variant='light-outline' onClick={()=>nav(`/Trends/`)}><BarChart style={{color:'white'}}/></Button>}
        L4={<Button variant='light-outline' onClick={()=>nav(`/Scopes/`)}><Bullseye style={{color:'white'}}/></Button>}/>
        
         </div>

         <div className="bod">
        
        <Card style={{
         
           margin:'20px',
           height:'150px',
           backgroundImage:'linear-gradient(-45deg ,rgb(163, 207, 137) , rgb(52, 110, 235))',
           backgroundSize:'400% 400%',
           textAlign:'center',
           alignItems:'center',
           color:'white',
           padding:' 10px',
           animation:'gradient 15s ease infinite'
            }}>
          <Card.Title ><h1 style={{FontWeight:'bold', FontSize:'40px'}}>Scopes</h1></Card.Title>
          <Button onClick={()=>{setOffShow(true)}} variant='outline-light' style={{height:'60px', width:'120px' }}>Create a New Scope</Button>
          
        
        
        </Card>

        <div className="Scopes" style={{display:'flex', marginLeft:'7px',overflow:'auto'}}>

         <Container fluid={true} >
          <Row >
         
         {scopesExists?   scopeList.map((scop)=>{
            return(
              
            
               <Col style={{width:'450px'}}  xs='2' >
                

                <Card style={{width:'100%', background:'#282b2e',color:'lightgray',  cursor:'pointer', height:'100%', marginTop:'10px'}} onClick={()=>{setModalShow(true); setModalData(scop);}}>
                   <Card.Body>
                    <Card.Title>{scop.title}</Card.Title>
                     <Card.Text>
                      {scop.description}
                      </Card.Text>
                    </Card.Body>

                   </Card>
                   
                 <Modal
                   
                   show={modalShow}
                     size="lg"
                     aria-labelledby="contained-modal-title-vcenter"
                     onHide={()=>{setModalShow(false)}}
                     className="special_modal"
                     
                     centered>
                 <Modal.Header closeButton closeVariant='white'> 
                 <Modal.Title  id="contained-modal-title-vcenter"  style={{marginRight:'70%'}}>
                   Scope
                 </Modal.Title>
                 <Button variant='outline-light' onClick={()=>{if(isUpdate){setIsUpdate(false); setSaveDis(true)}else{setIsUpdate(true); setSaveDis(false)}}} style={{marginRight:'10px'}}>Edit</Button>
           
                 <Button variant='danger' onClick={()=>{DeleteSes({id: modalData.id})}}>Delete</Button>
                 
                 </Modal.Header>
                   <Modal.Body>
                     
                     {isUpdate? <Form style={{display:'flex',backgroundColor:'RGB(12,12,12)', padding:'10px', margin:'10px', borderRadius:'10px'}}>
                       <Form.Control style={{width:'80%',}} placeholder={modalData.title} 
                       onChange={(e)=>{if(!e.target.value){setUpdateTitle(modalData.title)}else{
                         setUpdateTitle(e.target.value)
                       }}}/>
                       
                     </Form>:<h1  style={{fontWeight:'bold', backgroundColor:'RGB(12,12,12)', padding:'10px', margin:'10px', borderRadius:'10px' ,color:'lightgray'}}>{modalData.title}</h1>}
                    
                     {isUpdate? <Form style={{display:'flex',backgroundColor:'RGB(12,12,12)', padding:'10px', margin:'10px', borderRadius:'10px'}}>
                       <Form.Control style={{width:'80%',}} placeholder={modalData.description}
                       onChange={(e)=>{if(!e.target.value){setUpdateDesc(modalData.description)}else{
                         setUpdateDesc(e.target.value)
                       }}}/>
                       
                     </Form>:<p style={{fontWeight:'400', backgroundColor:'RGB(12,12,12)', padding:'10px', margin:'10px', borderRadius:'10px' ,fontWeight:'lighter', fontSize:'20px',color:'lightgray'}}>Description:<br/>{modalData.description} </p>}
                     
                     <div className="mbod">
                      

                       <div className="Incomplete" style={{backgroundColor:'RGB(12,12,12)', padding:'10px', margin:'10px', borderRadius:'10px' ,color:'lightgray'}}>
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

                           <Button  variant="secondary"  value={inc}  style={{marginRight:'5px', marginBottom:'5px'}} onClick={()=>{
                             movetask({id:modalData.id, task:inc}); 
                             var del= modalData.incomplete.indexOf(inc); 
                             console.log(del);
                             modalData.incomplete.splice(del,1);
                              modalData.complete.push(inc)}}><Check/></Button>
                           <label style={{marginBottom: '5px'}}>{inc}</label><br/>

                         </div >
                       )
                     })}
                       </div>

                       <div className="Complete"  style={{backgroundColor:'RGB(12,12,12)', padding:'10px', margin:'10px', borderRadius:'10px' ,color:'lightgray'}}>
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
          }):<h1 style={{color:'lightgray', textAlign:'center', fontSize:'25px'}}>No scopes added yet</h1>}
          </Row>
         </Container>
        </div>

        <Modal 
        placement='end' 
        className='special_modal'
        show= {offShow}
        onHide={()=>{setOffShow(false)}}>
          <Modal.Header closeButton closeVariant='white'>
            Create a New Scope
          </Modal.Header>
          <Modal.Body>
          <div className="titleBar" style={{ color:'lightgray', display:'grid', placeItems:'center',  marginTop:'20px'}}>
          <Form style={{width:'100%'}}> 
            <Form.Group>
              <Form.Label >Title:</Form.Label>
              <Form.Control className='special_modal' onChange={(e)=>{setNewTitle(e.target.value); if(e.target.value===''){setDisabled(true)}else{setDisabled(false)}}}/>
              <Form.Label>Description:</Form.Label>
              <Form.Control className='special_modal' as='textarea' rows={3} style={{resize:'none'}} onChange={(e)=>{setNewDescritption(e.target.value)}} />
              <Form.Label>Add a Task:</Form.Label>
              <Form.Control className='special_modal' onChange={(e)=>{setTask(e.target.value);if(NewtaskList===[]){setDisabled(true)}else{setDisabled(false)}}} style={{marginTop:'5px'}} value={task}/>
              <Button variant='outline-light' onClick={()=>{setNewTaskList([...NewtaskList,task]);setTask(''); <h2>Added!</h2>}} style={{marginTop:'10px'}} >Add</Button>
              
            </Form.Group>
          </Form>

          <hr style={{ color:'lightgray',backgroundColor:'lightgray' ,width:'100%'}}/>


         <div style={{display:'flex', flexDirection:'column', textAlign:'left', marginBottom:'10px', marginTop:'10px'}}>
         <p style={{fontSize:'23px', float:'left'}}>Your Tasks: </p>
          {NewtaskList.map((i)=>{
            return(
         
                <ul>
                  <li>{i}</li>
                </ul>
              
            )
          })}
         </div>

          <Button onClick={()=>{setNewTaskList([...NewtaskList,task]); addScope()}} disabled={disabled}>Finish</Button>
          </div>
          </Modal.Body>
        </Modal>
       

        </div>
    </div>
  )
}

export default Scope