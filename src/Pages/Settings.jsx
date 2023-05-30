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
import { async } from '@firebase/util'
import TsCs from '../Components/TsCs';
import PP from '../Components/PP';
import { PayPalButton } from 'react-paypal-button-v2'

import {  httpsCallable } from 'firebase/functions'
import { APP_SECRET, CLIENT_ID } from '../Util/config'
    

function Settings() {

  const [cancelMod, setCancelMod]=useState(false)
 const [subID, setSubID]=useState('')

 const [cancelStatus, setCancelStatus] = useState('');
 const [TP, setTP]=useState('Monthly')



  const cookie = new Cookies()
  const user=cookie.get('useraidt')
  const paidt= cookie.get('PAIDT')
  const nextYear = new Date();

  nextYear.setFullYear(nextYear.getFullYear() + 1);

  const paypalSubscribeY = (data, actions) => {
    return actions.subscription.create({
    'plan_id': 'P-5JW39259P5674953XMRL2XFA',
    });
    };

    const paypalSubscribeM = (data, actions) => {
      return actions.subscription.create({
      'plan_id': 'P-0G807194D16574536MRCPXFI',
      });
      };
    const paypalOnError = (err) => {
    console.log("Error")
    }
    const paypalOnApprove = (data, detail) => {
    updateToPro({data:data})
    
    
    };
    
    const updateToPro=async({data})=>{
      await updateDoc(doc(db,'Users',user),{
        type: 'pro'
      }).then(()=>{
        cookie.set('PAIDT', 'Tnf',{expires:  nextYear, path:'/'});
        window.location.reload()
      });
      await setDoc(doc(db,'Users',user,'Subscription','SubDetails'),{
        data: data
      })
      
    
      

    }

 
   
  
  

    let nav=useNavigate()
    
   

    const cancelSub=async()=>{
      await updateDoc(doc(db,'Users',user),{
        type: 'free'
      });
      await deleteDoc(doc(db,'User',user,'Subscription','SubDetails'))
      cookie.remove('PAIDT',{path:'/'});
      setCancelMod(false)
    }

   
   

    
    


    
    const LogOut=()=>{
        signOut(auth).then(()=>{
          const cookies = new Cookies();
          cookies.remove('useraidt', { path: '/' });
          cookie.remove('PAIDT',{path:'/'} )
          
          nav('/Login');
          
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
  const subId=async()=>{
    await getDoc(doc(db,'Users',user,'Subscription','SubDetails')).then((snap)=>{
      const data=snap.data().data
      setSubID(data.subscriptionID)
    });
  }





    useEffect( ()=>{
        docSnap();
        subId()
       
        
       
        
        
        


    },[]);

  

    const callFunction=async ()=>{
     
      

      
        try {
          const response = await fetch(
            `https://api-m.paypal.com/v1/billing/subscriptions/${subID}/cancel`,
            {
              method: 'POST',
              headers: {
                'Authorization': `Basic ${btoa(CLIENT_ID + ':' + APP_SECRET)}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
              body: JSON.stringify({ reason: 'Not satisfied with the service' }),
            }
          );
    
          const responseData = await response.json();
    
          if (response.ok) {
            setCancelStatus('Subscription canceled successfully');
            console.log('Success')
          } else {
            setCancelStatus(`Error canceling subscription: ${responseData.message}`);
          }
        } catch (error) {
          console.error(error);
          setCancelStatus('Error canceling subscription');
        }
      };
    

    



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

           {paidt==='Tnf'?
           <div style={{padding:'20px', }}>
            <Button variant='outline-danger'
            
            onClick={()=>{setCancelMod(true);console.log(subID);}}
            >Cancel Subscription</Button>
            <p style={{color:'lightgray', marginTop:'20px'}}> If you are experiencing difficulties cancelling your subscription,<br/> please contact us at info@nitrondigital.com </p>
            <Modal
             aria-labelledby="contained-modal-title-vcenter"
             centered
              show={cancelMod}
              onHide={()=>setCancelMod(false)}
              className='special_modal'>
                <Modal.Header closeButton closeVariant='white' >Cancel Subscription</Modal.Header>
                <Modal.Body>
                  <p style={{color:'lightgray'}}>Are you sure you want to cancel your subscription?</p>
                  <div style={{display:'flex'}}>
                    <Button variant='outline-danger' onClick={()=>{cancelSub(); callFunction()}} style={{marginRight:'5px', width:'50%'}}>Yes</Button>
                    <Button variant='outline-light' onClick={()=>setCancelMod(false)} style={{marginRight:'5px', width:'50%'}}>No</Button>
                  </div>
                </Modal.Body>
              </Modal>



           </div>
           :<div style={{width:'30%'}}>
              <Card
              
              style={{background:'#f0f4ff', display:'flex',flexDirection:'column',width:'300px', marginBottom:'20px', fontWeight:'lighter', padding:'25px', cursor:'pointer',color:'#17181a', overflow:'auto'}}
              >
                <Card.Header style={{borderBottom:'0 none'}}>
                  <div style={{display:'flex'}}>
                    <Button variant='dark' style={{width:'50%', marginRight:'5px'}} onClick={()=>{setTP('Monthly')}}>Monthly</Button>
                    <Button variant='dark' style={{width:'50%'}} onClick={()=>{setTP('Yearly')}}>Yearly</Button>
                  </div>
                </Card.Header>
                  {TP==='Yearly'?
                  <div>
                    <p style={{fontSize:'20px'}}>Join Improvr pro today</p>
                        <h1 style={{fontSize:'40px'}}>$35/year</h1><br/>
                        <span>✔️Unlimited Sessions</span><br/>
                        <span>✔️Unlimited Scopes</span><br/>
                        <span>✔️Up to 210 minutes a session</span><br/>
                        <span>✔️Todos </span><br/>
                        <span>✔️All creator kits </span><br/>
                        
                    
                        
                        <hr/>

                        <PayPalButton
                      style={{color:'blue'}}
                      amount = "35"
                      currency = "USD"
                      createSubscription={paypalSubscribeY}
                      onApprove={paypalOnApprove}
                      catchError={paypalOnError}
                      onError={paypalOnError}
                      onCancel={paypalOnError}
                      />
                  </div>
                  :
                  <div>

                    <p style={{fontSize:'20px'}}>Join Improvr pro today</p>
                          <h1 style={{fontSize:'40px'}}>$5/month</h1><br/>
                          <span>✔️Unlimited Sessions</span><br/>
                          <span>✔️Unlimited Scopes</span><br/>
                          <span>✔️Up to 210 minutes a session</span><br/>
                          <span>✔️Todos </span><br/>
                          <span>✔️All creator kits </span><br/>
                          
                      
                          
                          <hr/>

                          <PayPalButton
                        style={{color:'blue'}}
                        amount = "5"
                        currency = "USD"
                        createSubscription={paypalSubscribeM}
                        onApprove={paypalOnApprove}
                        catchError={paypalOnError}
                        onError={paypalOnError}
                        onCancel={paypalOnError}
                        />
                  </div>
                  
                  
                  }

                
              </Card>
             
                  
           
            
            </div>}
      
        
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