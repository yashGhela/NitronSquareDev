import { addDoc, collection,doc,getDoc, getDocs, query, limit, where, onSnapshot,updateDoc,arrayUnion, arrayRemove, orderBy, getCountFromServer} from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {  useNavigate , useLocation} from 'react-router-dom';
import { db, storage } from '../firebaseConfig';
import {Alert, Accordion, Button, Card, Col, Form, Modal, Row ,Container, FormControl, Image, FormCheck, CloseButton, ButtonGroup,Badge} from 'react-bootstrap';

import ReactSlider from 'react-slider';
import Cookies from 'universal-cookie';
import Quickbar from '../Components/Quickbar';
import ReactPlayer from 'react-player';
import { BarChart, BoxArrowLeft, Bullseye, CameraVideoFill, Check, CloudDrizzle, Fire, ImageAlt, ListTask, Moon, MusicNoteBeamed, Pause, Play, Spotify, StopFill, Stopwatch, Tree, Water, Wind, Youtube } from 'react-bootstrap-icons';

import { format } from 'date-fns';


import {
  Chart as ChartJS,
} from 'chart.js';


import { getDownloadURL, listAll, ref } from 'firebase/storage';

import SpotifyPlayer from 'react-spotify-player';
import { AddToDo, CompleteToDo, getData, movetask, movetaskBack, newTassk } from '../Util/functions';
import treeS from '../Assets/Nitron Music/Forrest Sounds.mp3'
import seaS from '../Assets/Nitron Music/Ocean Sounds.mp3'
import RainS from '../Assets/Nitron Music/Rain Sounds.mp3'
import NightS from '../Assets/Nitron Music/Night Sounds.mp3'
import WindS from '../Assets/Nitron Music/Wind Sounds.mp3'
import FireS from '../Assets/Nitron Music/Campfire Sounds.mp3'
import AlarmS from '../Assets/Alarm.mp3'
import  { SoundsModal, TrendsModal,ScopesModal, TodoModal,   } from '../Components/modals';
import TimerComp, { minutes, seconds } from '../Components/TimerComp';
import { Helmet } from 'react-helmet';





window.Chart = ChartJS


function Timer() {
  

  //basic use 
   const location = useLocation();

    

    let worldsort=['Ghibli', 'Mountains','Ocean', 'Forest', 'Rainy','City', 'Animal Crossing', 'Tears of The Kingdom', 'Stardew Valley']

    //bgs
    
    const ghibli1='https://firebasestorage.googleapis.com/v0/b/nstudy-dev.appspot.com/o/Backgrounds%2FGhibli%2Fghibli%201.png?alt=media&token=747bc1da-4d79-40f4-b793-d1edd3fdf75a'

    let [world,setWorld]=useState('')
    

    let imageListRef= ref(storage,`Backgrounds/${world}`)

    const getWorlds=({id})=>{
      setWorld(id);
      listAll(imageListRef).then((result)=>{
        result.items.forEach((item)=>{
          getDownloadURL(item).then((url)=>{
           if(imageList.includes(url)){
            return null
           }else{
            setImageList((prev)=>[...prev,url])
           }
          })
        })
      })
    }


    const nav=useNavigate();
    
    
    const cookie = new Cookies()
    const user=cookie.get('useraidt');
    const paidt= cookie.get('PAIDT');
    const [stateUp,setStateUp]=useState('complete')

    let subject= location.state.subject;
    let OWT=location.state.Wtsum;
    let OBT=location.state.Btsum;

    const [modalShow, setModalShow]= useState(false);
    const [rating, setRating]=useState(0)
    const [description, setDescription]=useState('');



    const [imageList,setImageList]=useState([]);
    const [imageUrl,setImageUrl]=useState(ghibli1);

    const [toDo, setToDo]=useState('');
    
    const [ToDoList, setToDoList]=useState([]);
   


    const [url,setUrl]=useState('');
    const [urlShow,setURlShow]=useState(false);
    
    const [spotifyShow,setSpotifyShow]=useState(false);
    


    const treeSound=()=>{
    
        tree.play()
        tree.loop=true;
      }
  
      const OceanSound=()=>{
      
        ocean.play();
        ocean.loop=true;
      }
      
      const RainSound=()=>{
       
        rain.play();
        rain.loop=true;
      }
      
      const NightSound=()=>{
        
        night.play();
        night.loop=true
      }
      
      const WindSound=()=>{
        
        wind.play();
        wind.loop=true
      }
      
      const FireSound=()=>{
        
        fire.play();
        fire.loop=true
        
      }

    
    
 
    //This code is for location and navigation, no timer logic


    //Quickbar code
    const [mediaShow, setMediaShow]= useState(false);
    const [trendShow, setTrendShow] = useState(false);
    const [scopeShow, setScopeShow] = useState(false);
    const [alert,showAlert]=useState(false)
    const [timerShow, setTimerShow] = useState(false);

    const [imageShow, setImageShow]=useState(false);
    
  
    
    const [tree,setTree]= useState(new Audio(treeS));
    const [ocean,setOcean]= useState(new Audio(seaS))
    const [rain,setRain]= useState(new Audio(RainS))
    const [night,setNight]= useState(new Audio(NightS));
    const [wind,setWind]= useState(new Audio(WindS));
    const [fire,setFire]=useState(new Audio(FireS));
    const [alarm,setAlarm]=useState(new Audio(AlarmS))

   
      

   

  

    //New Times Modal 

    const [newWorkMinutes, setNewWorkMinutes]= useState(45);
    const [newBreakMinutes,setNewBreakMinutes]=useState(15);
   

    
    

   
  

   


    const [finWorkTime, setFinWorkTime]= useState(location.state.workMinutes);
    const [finBreakTime,setFinBreakTime]=useState(location.state.breakMinutes);



    const [subjectList, setSubjectList] =useState([]);

  

 
 
 
  let subref=  doc(db,'Users',user,'Subjects','SubjectsList')
  
 
  const docSnap = async()=>
  
  await getDoc(subref).then(docSnap=>{
    let subData=[];
    if(docSnap.exists()){
      
      subData= docSnap.data().subjects 
      
      
    }else{
      return null;
    }
    setSubjectList(subData)
   
    
  })


  //Quick Trends Stuff 

 
  





  const [userData,setChartData] = useState(
    {
      labels: ['Loading'],
      datasets:[{
        label: 'Loading',
        data: null
      }]
      
    }
  )


  //Quick scopes section
  const scoperef= collection(db,'Users',user,'Scopes');
  const [scopeList, setScopeList]=useState([]);

  const [newTask, setNewTask]=useState('')

 



   
   

   //Timer code
   

   const proTimeVal=()=>{
    if(paidt==='Tnf'){
      setMaxTime(210)
    }else {
      setMaxTime(90)
    }
   }
   const[maxTime,setMaxTime]=useState(0)
  

   useEffect(()=>{
    docSnap()
    proTimeVal()
    
   
   
  
   
  
   
    onSnapshot(scoperef, (snapshot) => {
      setScopeList(
         snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
       );

       
       
       
       
     });
  
    
   //clears the interval
   },  []);


  


 


  
 
     
  

 
   

 //AddDoc function

 const doneHand=async()=>{
  await getDoc(doc(db,'Users',user)).then(async (snap)=>{
    if(snap.data().type==='free'){
      const colRef=collection(db,'Users',user,'Sessions');
      await getCountFromServer(colRef).then(async (snap)=>{
        if (snap.data().count<30){
          await addDoc(collection(db, 'Users',user,'Sessions'),{
            WorkTime: finWorkTime,
            BreakTime: finBreakTime,
            subject: subject,
            description: description,
            rating: rating,
            time: format(new Date(), 'yyyy/MM/dd')
        
        
          })
          tree.pause();
          ocean.pause();
          wind.pause();
          night.pause();
          fire.pause();
          rain.pause();
          alarm.pause();
          nav(`/Dashboard/`)
        }else {
          showAlert(true)
        }

      })
    }else {
      await addDoc(collection(db, 'Users',user,'Sessions'),{
        WorkTime: finWorkTime,
        BreakTime: finBreakTime,
        subject: subject,
        description: description,
        rating: rating,
        time: format(new Date(), 'yyyy/MM/dd')
    
    
      })
      tree.pause();
      ocean.pause();
      wind.pause();
      night.pause();
      fire.pause();
      rain.pause();
      alarm.pause();
      nav(`/Dashboard/`)
    }
  })

}

  return (
   
    <div style={{background:`url(${imageUrl}) no-repeat`,minWidth:'100vw', minHeight:'100vh', display:'flex', paddingTop:'20px', paddingBottom:'10px',maxHeight:'100%', maxWidth:'100%', overflow:'auto'}}>

      <div className="quickBar">
    <Quickbar
      L1={<Button  variant='light-outline' onClick={()=>{setMediaShow(true);}}><MusicNoteBeamed style={{color:'white', }}/></Button>}
      L2={<Button  variant='light-outline'  onClick={()=>{setTimerShow(true)}}><Stopwatch style={{color:'white', }}/></Button>}
      L3={<Button  variant='light-outline'   onClick={()=>{setTrendShow(true);getData({sub:subject, setChartData: setChartData});}}><BarChart style={{color:'white', }}/></Button>}
      L4={<Button  variant='light-outline'  onClick={()=>{setScopeShow(true)}}><Bullseye style={{color:'white', }}/></Button>}
      L5={<Button  variant='light-outline' onClick={()=>{setImageShow(true)}}><ImageAlt style={{color:'white', }}/></Button>}
      
      L8={<Button  variant='light-outline' onClick={()=>{setURlShow(true)}}><Youtube style={{color:'white', }}/></Button>}
      L9={<Button  variant='light-outline' onClick={()=>{setSpotifyShow(true)}}><Spotify style={{color:'white', }}/></Button>}
      L7={<Button  variant='light-outline' onClick={()=>{nav('/Dashboard')}}><BoxArrowLeft style={{color:'white', }}/></Button>}
      
    />
  </div>
      
      <div style={{placeItems:'center', width:'80vw'}}>
        <TimerComp 
        location={location} 
        setModalShow={setModalShow} 
        setFinWorkTime={setFinWorkTime} 
        setFinBreakTime={setFinBreakTime} 
        subject={subject} 
        newWorkMinutes={newWorkMinutes} 
        newBreakMinutes={newBreakMinutes}
        alarm={alarm}
        setNewBreakMinutes={setNewBreakMinutes}
        setNewWorkMinutes={setNewWorkMinutes}
        timerShow={timerShow}
        setTimerShow={setTimerShow}
        maxTime={maxTime}
        
        />

        <div style={{minWidth:'200px',maxWidth:'500px', marginLeft:'50%',alignItems:'center', placeItems: 'center', marginRight:'10px'}}>
        <Container style={{borderRadius:'10px', boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.4 )',backdropFilter: 'blur( 2px )', background:'rgba( 255, 255, 255, 0.25 )', marginTop:'20px', border:'2px solid #b1b4b5', padding:'20px',  }}>
        <p style={{marginBottom:'10px', fontSize:'22px', marginLeft:'5px', color:'white'}}>Session Tasks:</p>
        <Form style={{display:'flex'}}>
          <Form.Control width={'70%'} style={{marginRight:'10px',backdropFilter: 'blur( 2px )', background:'rgba( 255, 255, 255, 0.25 )',}} onChange={(e)=>{setToDo(e.target.value)}}/>
          <Button variant='outline-light' onClick={()=>{setToDoList(prev=>[...prev,toDo]); console.log(ToDoList)}} >Add</Button>
        </Form>

          <hr/>

       <div>
       {ToDoList.map((i)=>{
            return(
              <Card 
         style={{boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.4 )',backdropFilter: 'blur( 10px )', background:'rgba( 255, 255, 255, 0.25 )', display:'flex', marginBottom:'20px', fontWeight:'lighter', padding:'15px', cursor:'pointer',color:'gray', border:'2px solid #b1b4b5' }} 
         
         breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
         minBreakpoint="xxs">
          <Row>
           <Col>
           <h3 style={{fontWeight:'400', fontSize:'20px'}}>{i}</h3></Col>
        
           <Col><Button  variant="secondary"  
              style={{float:'right'}} ><Check/></Button></Col>
          </Row>
       
           </Card>
        
            )
            
          })}
       </div>
          </Container>
        </div>
   
  
    
    <Modal
       show={modalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      onHide={()=>setModalShow(false)}
      className='thin_modal'
     
      centered>
      <Modal.Header closeButton closeVariant='white' >
        <Modal.Title  id="contained-modal-title-vcenter">
         Time to Add Your Session!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <h3  style={{fontSize:'20px', fontWeight:'400'}}>Add a rating to your session:</h3>
        <h4 style={{fontSize:'20px', fontWeight:'400', marginTop:'15px'}}>⭐: {rating}</h4>
        <div style={{marginBottom:'20%',color:'lightgray'}}>
        <ReactSlider
        className='slider purple'
        thumbClassName='thumb'
        trackClassName='track'
        value={rating}
        
        onChange={newValue => setRating(newValue)}
        min={0}
        max={5}
        
        />
        </div>
       <Form style={{marginTop:'40px'}}>
        <Form.Group>
          
          <Form.Control className='special_modal' as='textarea' rows={3} placeholder='Enter a description' style={{resize:'none'}} onChange={(e)=>{setDescription(e.target.value)}}/>
        </Form.Group>
       </Form>
      </Modal.Body>
      <Modal.Footer>
        {alert&&<Alert variant='warning'>You have already created 500 sessions, click here to upgrade to pro for unlimited sessions. <span style={{textDecoration:'underline', cursor:'pointer'}} onClick={()=>{nav('/Settings')}}>Upgrade</span></Alert>}
 
       <Button style={{width:'100%'}} onClick={()=>{doneHand();}} >Done</Button>
      </Modal.Footer>
    </Modal>

   
      </div>

  <div className="QuickBarModals" style={{float:'left'}}>
  
  <Modal className='timer-modal'
      show={mediaShow}
      onHide={()=>{setMediaShow(false)}}
     
      style={{background:'none'}}
      >
       <Modal.Header closeButton closeVariant='white' className='handle'>
         Sounds
       </Modal.Header>
       <Modal.Body style={{display:'flex', flexDirection:'column'}}>
        
          <Card variant='outline-light' style={{background:'#282b2e' , display:'flex', marginBottom:'20px', fontWeight:'lighter', padding:'15px', cursor:'pointer',color:'lightgray'}}  >
                       <Row>
                       <Col xs={4} > <Tree style={{height:'30px', width:'50px'}}/></Col>
                       <Col>< FormCheck style={{marginLeft:'70%', marginTop:'3%'}} type='switch' onChange={(e)=>{if(e.target.checked){treeSound()}else{tree.pause()}}}/></Col>
                       </Row></Card>
         <Card variant='outline-light' style={{background:'#282b2e' , display:'flex', marginBottom:'20px', fontWeight:'lighter', padding:'15px', cursor:'pointer',color:'lightgray'}}  >
                       <Row>
                       <Col xs={4} > <Water style={{height:'30px', width:'50px'}}/></Col>
                       <Col>< FormCheck style={{marginLeft:'70%', marginTop:'3%'}}  type='switch' onChange={(e)=>{if(e.target.checked){OceanSound()}else{ocean.pause()}}}/></Col>
                       </Row></Card>
         <Card variant='outline-light' style={{background:'#282b2e' , display:'flex', marginBottom:'20px', fontWeight:'lighter', padding:'15px', cursor:'pointer',color:'lightgray'}}  >
                       <Row>
                       <Col xs={4} > <CloudDrizzle style={{height:'30px', width:'50px'}}/></Col>
                       <Col>< FormCheck style={{marginLeft:'70%', marginTop:'3%'}} type='switch' onChange={(e)=>{if(e.target.checked){RainSound()}else{rain.pause()}}}/></Col>
                       </Row></Card>
         <Card variant='outline-light' style={{background:'#282b2e' , display:'flex', marginBottom:'20px', fontWeight:'lighter', padding:'15px', cursor:'pointer',color:'lightgray'}}  >
                       <Row>
                       <Col xs={4} > <Moon style={{height:'30px', width:'50px'}}/></Col>
                       <Col>< FormCheck style={{marginLeft:'70%', marginTop:'3%'}} type='switch' onChange={(e)=>{if(e.target.checked){NightSound()}else{night.pause()}}}/></Col>
                       </Row></Card>
        
         <Card variant='outline-light' style={{background:'#282b2e' , display:'flex', marginBottom:'20px', fontWeight:'lighter', padding:'15px', cursor:'pointer',color:'lightgray'}}  >
                       <Row>
                       <Col xs={4} > <Wind style={{height:'30px', width:'50px'}}/></Col>
                       <Col>< FormCheck style={{marginLeft:'70%', marginTop:'3%'}} type='switch' onChange={(e)=>{if(e.target.checked){WindSound()}else{wind.pause()}}}/></Col>
                       </Row></Card>
         <Card variant='outline-light' style={{background:'#282b2e' , display:'flex', marginBottom:'20px', fontWeight:'lighter', padding:'15px', cursor:'pointer',color:'lightgray'}}  >
                       <Row>
                       <Col xs={4} > <Fire style={{height:'30px', width:'50px'}}/></Col>
                       <Col>< FormCheck style={{marginLeft:'70%', marginTop:'3%'}} type='switch' onChange={(e)=>{if(e.target.checked){FireSound()}else{fire.pause()}}}/></Col>
                       </Row></Card>
       
        <div style={{placeItems:'center'}}>
       
        </div>
 
       </Modal.Body>
 
     </Modal>
  

   <TrendsModal show={trendShow} setShow={setTrendShow} userData={userData} subject={subject}/>
   
   <div className="scopes">
   <ScopesModal show={scopeShow} setShow={setScopeShow} scopeList={scopeList} newTask={newTask} setNewTask={setNewTask}/>
    
    
    

   

  
    <Modal
    className='timer-modal'
    show={imageShow}
    onHide={()=>{setImageShow(false)}}
    
    style={{background:'none'}}
    >
    
   
    <Modal.Header closeButton closeVariant='white'>
       Worlds
     </Modal.Header>

     <Modal.Body style={{display:'flex', flexDirection:'column'}}>
     <p style={{textAlign:'center'}}>Double click to load</p>
     <ButtonGroup>
   
      <div style={{display: 'flex', margin:'10px',color:'lightgray', overflow:'auto'}}>
      {worldsort.map((i)=>{
         return(
          <Button 
         type="checkbox"
          value={i} 
          variant="outline-light"
          onClick={()=>{getWorlds({id:i})}}
        
          style={{marginRight:'10px'}}
          >
           {i}
         </Button>
         )
      })}
       </div>
      </ButtonGroup>
     
     
       <Container>
        <Row>
          <Col>
          {imageList.map((url)=>{
        return(
    
          
          <Image style={{margin:'0', cursor:'pointer', padding:'5px', width:'50%'}} src={url} onClick={()=>{setImageUrl(url)}} fluid/>
         
       
       
        )
       
      })}
          
          </Col>
        </Row>
       </Container>
       
        

     </Modal.Body>

    </Modal>

   
   {urlShow?
   
   <Card
   className='timer-modal'

   style={{boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',backdropFilter: 'blur( 50px )', background:'rgba( 255, 255, 255, 0.25 )',marginBottom:'10px', border:'2px solid #b1b4b5'}}>
   
     <Card.Header style={{display:'flex', borderBottom:'2px solid #b1b4b5'}}>
       Media
       <CloseButton style={{marginLeft:'70%'}} onClick={()=>setURlShow(false)}/>
      
     </Card.Header>
     <Card.Body>
     <Form style={{display:'flex', flexDirection:'column'}}>
       <p>Enter URL</p>
       <FormControl style={{width:'80%', marginRight:'15px',backdropFilter: 'blur( 2px )', background:'rgba( 255, 255, 255, 0.25 )',}} onChange={(e)=>{setUrl(e.target.value)}} />
      
     </Form>
     <hr style={{ color:'lightgray',backgroundColor:'lightgray' ,width:'100%',}}/>
    <div style={{height:'150px'}}>
    <ReactPlayer url={url} width='100%' height='100%' stopOnUnmount={false} pip={true} controls={true} playing={()=>{if(urlShow==='true'||urlShow==='false'){return true}}}/>
    </div>

     

     </Card.Body>



   </Card>

   :null}

      {spotifyShow? 
      <Card
      className='timer-modal'
      
      style={{boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',backdropFilter: 'blur( 50px )', background:'rgba( 255, 255, 255, 0.25 )',marginBottom:'10px', border:'2px solid #b1b4b5'}}>
      
        <Card.Header style={{display:'flex', borderBottom:'2px solid #b1b4b5'}}>
          Spotify
          <CloseButton style={{marginLeft:'70%'}} onClick={()=>setSpotifyShow(false)}/>
          
        </Card.Header>
        <Card.Body>
      
        <SpotifyPlayer

        uri="https://open.spotify.com/playlist/3WLDIcG4Cx2UOPy0rbFhQn?si=d5bed878c963410e"
        view='list'
        theme='black'
        size='large'/>


        

        </Card.Body>



      </Card>:null}
   </div>
  </div>
  
  </div>
  )
}

export default Timer