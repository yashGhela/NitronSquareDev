import React from 'react'
import { Button, Card, Container,Row,Col } from 'react-bootstrap'
import Sidebar from '../Components/Sidebar'
import GooglePayButton from '@google-pay/button-react'
import {arrayRemove, deleteDoc, doc,getDoc, updateDoc} from 'firebase/firestore'
import Cookies from 'universal-cookie'
import { useState } from 'react'
import { db,auth } from '../firebaseConfig'
import {Speedometer,CardText,BarChart, Hr, Journals, Bullseye, Instagram } from 'react-bootstrap-icons'
import {signOut} from 'firebase/auth';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { async } from '@firebase/util'
function Settings() {



  
 



    let nav=useNavigate()
    const cookie = new Cookies()
    const user=cookie.get('useraidt')


    
    const LogOut=()=>{
        signOut(auth).then(()=>{
          const cookies = new Cookies();
          cookies.remove('useraidt', { path: '/' });
          
          nav('/');
          
        })}

    const [subjectList, setSubjectList] =useState([]);
    let subref=  doc(db,'Users',user,'Subjects','SubjectsList');

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

    useEffect(()=>{
        docSnap()

    },[])



    const DeleteSub=async(sub)=>{
        let subref=  doc(db,'Users',user,'Subjects','SubjectsList');
        await updateDoc(subref,{
            subjects: arrayRemove(sub)
        });
        
        
        console.log('removed')
    }





  const closeAccount=async()=>{
    const docRef= (db, 'Users', user);

    await deleteDoc(docRef).then(
      LogOut()
     )
  }


  return (
    <div className="Page" style={{height:'100%', paddingBottom:'20%'}}>

       <div className="navB">
        <Sidebar
        L1={<Button variant='light-outline' onClick={()=>nav(`/Dashboard/`)}><Speedometer style={{color:'white'}}/></Button>}
        L2={<Button variant='light-outline' onClick={()=>nav(`/Sessions/`)}><Journals style={{color:'white'}}/></Button>}
        L3={<Button variant='light-outline' onClick={()=>nav(`/Trends/`)}><BarChart style={{color:'white'}}/></Button>}
        L4={<Button variant='light-outline' onClick={()=>nav(`/Scopes/`)}><Bullseye style={{color:'white'}}/></Button>}/>
        </div>

        <div className="bod">
          
          <h1 style={{color:'white',marginTop:'20px', marginLeft:'10vw'}}>Settings </h1>

          <Container style={{  padding:'20px',  marginLeft:'10vw', marginTop:'10px', width:'70vw', height:'70vh', borderRadius:'10px'}}>
           <div className="Account" style={{backgroundColor:'rgb(12,12,12)', padding:'20px', borderRadius:'10px' , marginBottom:'10px'}}>
           <h2 style={{color:'gray', fontSize:'22px'}}>Your Account</h2>
          
            
           </div>




           <div className="Subjects" style={{backgroundColor:'rgb(12,12,12)', padding:'20px', borderRadius:'10px', marginBottom:'10px'}}>
           <h2 style={{color:'gray', fontSize:'22px', marginTop:'20px', marginBottom:'10px'}}>Delete Subjects:</h2>
           <p style={{color:'gray'}}>Note: Once clicked, your subject will be deleted.</p>
           <Container fluid={true} style={{display:'flex'}}>
            
              {subjectList.map((sub)=>{
              
              return(
               
                <Button 
                type="checkbox"
                 value={sub} 
                 variant="outline-light"
                 onClick={()=>{DeleteSub(sub)}}
               
                style={{marginRight:'10px'}}>
                  {sub}
                </Button>
                
              )
            
            })}
             
            </Container>
           </div>



           <div className="Help" style={{backgroundColor:'rgb(12,12,12)', padding:'20px', borderRadius:'10px', marginBottom:'10px'}}>
           <h2 style={{color:'gray', fontSize:'22px', marginTop:'20px', marginBottom:'10px'}}>Help:</h2>
            <h3 style={{color:'gray', fontSize:'16px', marginTop:'20px', marginBottom:'10px'}}>E-mail: info@nitrondigital.com</h3>

           <Card  onClick={()=>{window.location.href="'https://www.instagram.com/nitrondigital/'"}} style={{backgroundColor:'rgb(12, 12, 12)',height:'50px', width:'50px', border:'none'}}>
           <Instagram style={{color:'gray', height:'50px', width:'50px',cursor:'pointer'}}/>
           </Card>

         

       

           </div>

           <div className="LogOut" style={{backgroundColor:'rgb(12,12,12)', padding:'20px', borderRadius:'10px', marginBottom:'10px'}}>
              <Button 
           disabled={false}
           onClick={()=>{LogOut()}}
           
          >
            Log Out
           </Button>

           </div>

          


          </Container>
          


            

        </div>
        



    </div>
    
  )
}

export default Settings