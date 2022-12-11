import React from 'react'
import { Button , Card, Modal, Accordion} from 'react-bootstrap'
import {Speedometer,CardText,BarChart } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../Components/Sidebar'
import Cookies from 'universal-cookie'
import { Hr } from 'react-bootstrap-icons'
import { db } from '../firebaseConfig'
import { useEffect } from 'react'
import { onSnapshot, collection, updateDoc, arrayRemove, arrayUnion,doc } from 'firebase/firestore'
import { useState } from 'react'



function Scope() {

  const [scopeList, setScopeList]= useState([]);
  
  const[modalData, setModalData]=useState([]);
  const [modalShow, setModalShow] = useState(false);
    const nav=useNavigate();
    const cookie = new Cookies()
    const user=cookie.get('useraidt')
    const subref= collection(db,'Users',user,'Scopes');

  

    useEffect(() => {  //loads all the tenants
    
 
    
 
      onSnapshot(subref, (snapshot) => {
       setScopeList(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        
        
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
    

  return (
    <div className='Page'>

         <div className="navB">
        <Sidebar
        L1={<Button variant='dark' onClick={()=>nav(`/Dashboard/${user}`)}><Speedometer/></Button>}
        L2={<Button variant='dark' onClick={()=>nav(`/Sessions/${user}`)}><CardText/></Button>}
        L3={<Button variant='dark' onClick={()=>nav(`/Trends/${user}`)}><BarChart/></Button>}
        L4={<Button variant='dark' onClick={()=>nav(`/Scopes/${user}`)}><Hr/></Button>}/>
        
         </div>

         <div className="bod">
        
        <Card style={{
          width:'93vw',
           margin:'20px',
           height:'250px',
           backgroundImage:'linear-gradient(-45deg ,rgb(163, 207, 137) ,rgb(182, 95, 177), rgb(52, 110, 235))',
           backgroundSize:'400% 400%',
           textAlign:'center',
           alignItems:'center',
           color:'white',
           padding:' 10px',
           animation:'gradient 15s ease infinite'
            }}>
          <Card.Title ><h1 style={{FontWeight:'bold', FontSize:'40px'}}>Scopes</h1></Card.Title>
          <Button onClick={()=>{nav(`/CreateScope/${user}`)}} variant='outline-light' style={{height:'60px', width:'120px' }}>Create a New Scope</Button>
          
        
        
        </Card>

        <div className="Scopes" style={{display:'flex', marginLeft:'20px'}}>

          {scopeList.map((scop)=>{
            return(
              <div>

                 <Card style={{width:'18rem', background:'RGB(12, 12, 12)', color:'white', marginRight:'20px', cursor:'pointer', height:'180px'}} onClick={()=>{setModalShow(true); setModalData(scop); }}>
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
                    <Modal.Header closeButton>
                    <Modal.Title  id="contained-modal-title-vcenter">
                     Scope
                    </Modal.Title>
                    </Modal.Header>
                     <Modal.Body>
                       
                       <h1  style={{fontWeight:'bold', }}>{modalData.title}</h1>
                       <h4 style={{fontWeight:'bold',}}>Description: </h4>
                       <p style={{fontWeight:'400', fontSize:'20px'}}>{modalData.description} minutes</p>
                       
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


            )
          })}
        </div>


        </div>
    </div>
  )
}

export default Scope