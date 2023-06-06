import React from 'react'
import { Button, Card, Container,Row,Col, Modal, ButtonGroup } from 'react-bootstrap'
import Sidebar from '../Components/Sidebar'


import {arrayRemove, collection, deleteDoc, doc,getDoc, query, updateDoc, where, getDocs, setDoc} from 'firebase/firestore'
import Cookies from 'universal-cookie'
import { useState } from 'react'
import { db,auth, functions } from '../firebaseConfig'
import {Speedometer,CardText,BarChart, Hr, Journals, Bullseye, Instagram , Journal, Archive, Check2Square, Wallet2} from 'react-bootstrap-icons'
import {signOut} from 'firebase/auth';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'


    

function Settings() {




 



  const cookie = new Cookies()
  const user=cookie.get('useraidt')
  const paidt= cookie.get('PAIDT')
  const nextYear = new Date();

  nextYear.setFullYear(nextYear.getFullYear() + 1);

 
    
    

 
   
  
  

    let nav=useNavigate()
    
   


   
   

    
    


    
    const LogOut=()=>{
        signOut(auth).then(()=>{
          const cookies = new Cookies();
          cookies.remove('useraidt', { path: '/' });
          cookie.remove('PAIDT',{path:'/'} )
          
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
     return null
    }
    setSubjectList(subData)
   
    
  })





    useEffect( ()=>{
        docSnap();
        
       
        
       
        
        
        


    },[]);

  


    

    



    const DeleteSub=async(sub)=>{
        let subref=  doc(db,'Users',user,'Subjects','SubjectsList');
        await updateDoc(subref,{
            subjects: arrayRemove(sub)
        });
        
        
       
    }

  





  const closeAccount=async()=>{
    const docRef= (db, 'Users', user);

    await updateDoc(docRef, {
      subscription: 'inactive'
    })
  }


  return (
    <div className="Page" style={{height:'100vh', paddingBottom:'20%'}}>

       <div className="navB">
        <Sidebar/>
        </div>

        <div className="bod">
          
          <p style={{color:'white',marginTop:'20px', marginLeft:'10vw',fontSize:'25px'}}>Settings </p>

          <Container style={{  padding:'20px',  marginLeft:'10vw', marginTop:'10px', width:'70vw', height:'70vh', borderRadius:'10px'}}>
          


          <div className="Your Account" style={{backgroundColor:'#282b2e', padding:'20px', borderRadius:'10px', marginBottom:'10px' ,overflowX:'auto', border:' 2px solid #393d40'}}>
           <h2 style={{color:'lightgray', fontSize:'22px', marginTop:'20px', marginBottom:'10px'}}>Your Account:</h2>

          
             <Card style={{width:'250px', background:'#393d40',color:'lightgray',   height:'100%', marginTop:'10px',  border:' 2px solid #393d40'}} >
             <Card.Body>
             
               <Card.Text style={{padding:'20px',backgroundColor:'#282b2e', color:'lightgray', borderRadius:'10px'}}>
                 <h1>Pro</h1>
                  
                </Card.Text>
              </Card.Body>

             </Card>
          
      
        
           </div>


           <div className="Subjects" style={{backgroundColor:'#282b2e', padding:'20px', borderRadius:'10px', marginBottom:'10px' ,overflowX:'auto', border:' 2px solid #393d40'}}>
           <h2 style={{color:'lightgray', fontSize:'22px', marginTop:'20px', marginBottom:'10px'}}>Delete Subjects:</h2>
           <p style={{color:'lightgray'}}>Note: Once clicked, your subject will be deleted.</p>
           <ButtonGroup>
         <div style={{display: 'flex', margin:'20px',color:'lightgray', overflowX:'auto'}}>
          {subjectList.map((sub)=>{

              return(

                <Button 
                type="checkbox"
                 value={sub} 
                 variant="outline-light"
                 onClick={()=>{DeleteSub(sub)}}
               
                 style={{marginRight:'10px'}}
                 >
                  {sub}
                </Button>

              )



            })}


          </div>
         </ButtonGroup>
           </div>



           <div className="Help" style={{backgroundColor:'#282b2e', padding:'20px', borderRadius:'10px', marginBottom:'10px', border:' 2px solid #393d40'}}>
           <h2 style={{color:'lightgray', fontSize:'22px', marginTop:'20px', marginBottom:'10px'}}>Help:</h2>
           <Button variant='outline-light' onClick={()=>{window.location.href='https://sew3p1n5ald.typeform.com/to/dNp7i69d'}}>Report a bug or give feedback</Button>
            <p style={{color:'lightgray', fontSize:'16px', marginTop:'20px', marginBottom:'10px'}}>E-mail: info@nitrondigital.com</p>

           <Card  onClick={()=>{window.location.href='https://www.instagram.com/nitrondigital/'}} style={{backgroundColor:'rgb(12, 12, 12)',height:'50px', width:'50px', border:'none'}}>
           <Instagram style={{color:'lightgray', height:'50px', width:'50px',cursor:'pointer', backgroundColor:'#282b2e'}}/>
           </Card>

         

       

           </div>

           <div className="LogOut" style={{backgroundColor:'#282b2e', padding:'20px', borderRadius:'10px', marginBottom:'10px', border:' 2px solid #393d40'}}>
              <Button 
           disabled={false}
           onClick={()=>{LogOut()}}
           style={{marginBottom:'20px'}}
          >
            Log Out
           </Button>
           <p style={{marginRight:'20px', textDecoration:'underline', color:'lightgray', cursor:'pointer'}} onClick={()=>{nav('/Ts&Cs')}}>Terms & Conditions</p>
            <p style={{marginRight:'20px', textDecoration:'underline', color:'lightgray', cursor:'pointer'}} onClick={()=>{nav('/PrivacyPolicy')}}>Privacy Policy</p>

           </div>

        

          


          </Container>
          


            

        </div>
        



    </div>
    
  )
}

export default Settings