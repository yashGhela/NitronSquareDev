import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar'
import { Button, Card, Col, Container, Modal, Row, Form, Badge } from 'react-bootstrap'
import { addDoc, collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Cookies from 'universal-cookie';
import ReactSlider from 'react-slider';
import { BrightnessHigh, PersonWorkspace, Trash } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';


function Templates() {

  let nav = useNavigate()
  const cookie = new Cookies()
  const user=cookie.get('useraidt')
  const paidt= cookie.get('PAIDT')

  const [ToDoList,setToDoList]=useState([])
  const [gomodalShow, setGoModalShow] = useState(false);
  const [toDo, setToDo]=useState('');
  const [title,setTitle]=useState('');
  const [dataExists, setDataExists] = useState(true);
  const [templatesList, setTemplatesList]=useState([]);

  const [workMinutes, setWorkMinutes] = useState(45);//sets work minutes
  const [breakMinutes, setBreakMinutes] = useState(15);//sets break minutes
  const[maxTime,setMaxTime]=useState(0)
  const tempref= collection(db, 'Users', user, 'Templates');
  
  
  
  const [subjectList, setSubjectList] =useState([]);
  const [subject, setSubject]=useState('');


  let subref=  doc(db,'Users',user,'Subjects','SubjectsList');

  const proTimeVal=()=>{
    if(paidt==='Tnf'){
      setMaxTime(210)
    }else {
      setMaxTime(90)
    }
   }


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

  const addTemplate=async()=>{
     const ref=collection(db,'Users',user,'Templates')
     await addDoc(ref,{
      title: title,
      subject: subject,
      workTime: workMinutes,
      breakTime: breakMinutes,
      sessionTasks: ToDoList,


     });
     setGoModalShow(false)

  }



    useEffect(()=>{
      proTimeVal()
      docSnap()

      onSnapshot(tempref, (snapshot) => {

        if (snapshot.empty){
          setDataExists(false)
      
        }else {
         
          setDataExists(true)
          setTemplatesList(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
        
        }
          
          
        });

    },[])
  return (
   <div className="Page">
    <div className="navB">
        <Sidebar/>
    </div>

    <div className="bod">
        <div className="top">
        <Card style={{
            
            margin:'20px',
            height:'160px',
            backgroundColor:'#17181a',
            border: '3px solid #a26ded',
            backgroundSize:'400% 400%',
            textAlign:'center',
            alignItems:'center',
            color:'white',
            padding:' 10px',
            animation:'gradient 15s ease infinite'
             }}>
           <Card.Title style={{  marginBottom:'30px'}}><h1 style={{FontWeight:'bold', FontSize:'40px'}}>Templates</h1></Card.Title>
           <Button  variant='outline-light' size='lg' onClick={()=>{setGoModalShow(true)}}>Create a Template</Button>
           
   
         
         </Card>
        </div>

        <Modal
            className="special_modal"
           
              show={gomodalShow}
              
               aria-labelledby="contained-modal-title-vcenter"
               onHide={()=>{setGoModalShow(false)}}
               style={{color:'lightgray'}}
               >
                <Modal.Header closeButton closeVariant='white'>
           <Modal.Title style={{color:'lightgray'}}>
            Configure your Template
           </Modal.Title>
          </Modal.Header>
        
          <div className="times" style={{border: '3px solid rgb(97, 149, 232)', display:'flex', flexDirection:'column', placeItems:'center', margin:'10px', borderRadius:'20px', padding:'20px',color:'lightgray'}}>
            
       
              <Form style={{display:'flex', marginTop:'10px', marginBottom:'10px'}}>
             
                <Form.Control placeholder='Title' className='special_modal'  style={{width:'440px', marginRight:'5px'}}  onChange={(e)=>{setTitle(e.target.value)}}/>
                
              </Form>
            </div>
                  
              <div className="times" style={{border: '3px solid rgb(97, 149, 232)', display:'flex', flexDirection:'column', placeItems:'center', margin:'10px', borderRadius:'20px', padding:'20px',color:'lightgray'}}>
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
              <div className="times" style={{border: '3px solid rgb(97, 149, 232)', display:'flex', flexDirection:'column', placeItems:'center', margin:'10px', borderRadius:'20px', padding:'20px',color:'lightgray'}}>
              <p style={{fontSize:'20px'}} >Add Tasks:</p>
              <Form style={{display:'flex', marginTop:'10px', marginBottom:'10px'}}>
                <Form.Control className='special_modal' value={toDo}  style={{width:'380px', marginRight:'5px'}}  onChange={(e)=>{setToDo(e.target.value)}}/>
                <Button  onClick={()=>{setToDoList(prev=>[...prev,toDo]); setToDo('')}}>Add</Button>
              </Form>

              <div className="Complete"  style={{backgroundColor:'#17181a', padding:'10px', margin:'10px', borderRadius:'10px' ,color:'lightgray',  border:' 2px solid #393d40', overflowY:'scroll', height:'100px', width:'440px'}}>
                       <h4 style={{fontWeight:'bold', fontSize:'16px',color:'lightgray'}}>Session Tasks:</h4>
                       {ToDoList?.map((comp)=>{
                       return(
                         <div className="list">

                                 <Card 
                                style={{background:'#393d40', display:'flex', marginBottom:'20px', fontWeight:'lighter', padding:'15px', cursor:'pointer',color:'lightgray', border:'2px solid #393d40' }} 
                                
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
              <p style={{fontStyle:'italic', fontSize:'12px', margin:'0'}}>optional</p>
                </div>

            


             
             <div className="list" style={{display:'inline',padding:'20px', margin:'10px',border: '3px solid rgb(97, 149, 232)', borderRadius:'20px', placeItems:'center',color:'lightgray'}}>
              <p  style={{placeItems:'center', fontSize:'25px',color:'lightgray'}}>Choose a subject</p>
              
             
            <Container fluid={true}>
              <Row>
              {subjectList.map((sub)=>{
              
              return(
               <Col xs='2' style={{marginRight:'45px', marginLeft:'0'}}>
                <Button 
                type="checkbox"
                 value={sub} 
                 variant="outline-secondary"
                 onClick={()=>{setSubject(sub)}}
                
                
                 style={{marginRight:'5px', marginBottom:'5px', width:'100px',borderStyle:'dashed',  borderRadius:'15px'}}>
                  {sub}
                </Button>
                </Col>
              )
            
            })}
              </Row>
            </Container>
             </div>

              
     

         
         <Modal.Footer><Button onClick={()=>{addTemplate()}} style={{width:'100%'}}>Add Template for {subject}</Button></Modal.Footer>

          </Modal>
          

     
        <div style={{padding:'20px', borderRadius:'10px', border:'1px solid #282b2e',   margin:'20px'}}>
        <p style={{marginBottom:'10px', fontSize:'23px', marginLeft:'5px', color:'lightgray'}}>Library:</p>

        <Container fluid={true} style={{marginLeft:'8px', overflow:'auto'}}>
          <Row >
          {dataExists? templatesList.map((temp)=>{
           return (
            <Col style={{width:'450px', marginBottom:'10px'}}xs='2' >
            <Card style={{width:'100%', backgroundColor:'#282b2e', color:'lightgray' , height:'100%', marginTop:'10px', border:' 2px solid #393d40'}} >
              <Card.Header style={{display:'flex'}}><Card.Title>{temp.title}</Card.Title> </Card.Header>
           <Card.Body>
            
            <Card.Text>
               <Badge pill >{temp.subject}</Badge>
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

        }):  <center>
        <p style={{color:'lightgray', textAlign:'center', fontSize:'25px'}}>No Templates added yet</p>
         <Button onClick={()=>{setGoModalShow(true)}}  variant='outline-secondary' style={{borderStyle:'dashed', marginRight:'10px', borderRadius:'15px'}}>Create a template</Button>
      </center>}
            </Row>
            </Container>
            </div>
    </div>
   </div>
  )
}

export default Templates