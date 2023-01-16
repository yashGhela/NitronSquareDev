import React from 'react'
import { Button, Card, Container,Row,Col } from 'react-bootstrap'
import Sidebar from '../Components/Sidebar'
import GooglePayButton from '@google-pay/button-react'
import {arrayRemove, doc,getDoc, updateDoc} from 'firebase/firestore'
import Cookies from 'universal-cookie'
import { useState } from 'react'
import { db } from '../firebaseConfig'
import {Speedometer,CardText,BarChart, Hr, Journals, Bullseye, Instagram } from 'react-bootstrap-icons'
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
          cookies.remove('useraidt');
          
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
        await updateDoc(subref,{
            subjects: arrayRemove(sub)
        })
        
        console.log('removed')
    }


  return (
    <div className="Page">

       <div className="navB">
        <Sidebar
        L1={<Button variant='light-outline' onClick={()=>nav(`/Dashboard/`)}><Speedometer style={{color:'white'}}/></Button>}
        L2={<Button variant='light-outline' onClick={()=>nav(`/Sessions/`)}><Journals style={{color:'white'}}/></Button>}
        L3={<Button variant='light-outline' onClick={()=>nav(`/Trends/`)}><BarChart style={{color:'white'}}/></Button>}
        L4={<Button variant='light-outline' onClick={()=>nav(`/Scopes/`)}><Bullseye style={{color:'white'}}/></Button>}/>
        </div>

        <div className="bod">
          
          <h1 style={{color:'white',marginTop:'20px', marginLeft:'10vw'}}>Settings </h1>

          <Container style={{  padding:'20px',  marginLeft:'10vw', marginTop:'70px', width:'70vw', height:'70vh', borderRadius:'10px'}}>
           <div className="Account" style={{backgroundColor:'rgb(12,12,12)', padding:'20px', borderRadius:'10px' , marginBottom:'10px'}}>
           <h2 style={{color:'gray', fontSize:'22px'}}>Your Account</h2>
            <Card style={{height:'270px', width:'220px', marginTop:'20px', backgroundColor:'rgb(97, 149, 232)', color:'white'}}>
                <Card.Body>
                    <Card.Title>
                        Join Now
                    </Card.Title>
                    <h1 style={{textAlign:'center', fontSize:'60px', fontWeight:'bold'}}>$5/m</h1>
                    <Card.Text>
                        Join the Improvr family now and gain unlimited access to all features.
                    </Card.Text>
                    <GooglePayButton
                    environment='TEST'
                    buttonSizeMode='fill'
                    style={{width: '200px'}}
                    paymentRequest={{
                        apiVersion:2,
                        apiVersionMinor: 0,
                        allowedPaymentMethods:[
                            {
                                type:'CARD',
                                parameters:{
                                    allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                    allowedCardNetworks: ['MASTERCARD', 'VISA']
                                },
                                tokenizationSpecification:{
                                    type:'PAYMENT_GATEWAY',
                                    parameters:{
                                        gateway:'example',
                                        gatewayMerchantId: 'exampleGatewayMerchantId'
                                    }
                                }
                            }
                        ],
                        merchantInfo:{
                            merchantId: 'BCR2DN4TYSUMTD3M',
                            merchantName: 'Demo Only'

                        },
                        transactionInfo:{
                            totalPriceStatus:'FINAL',
                            totalPriceLabel: 'Total',
                            totalPrice:'5',
                            currencyCode:'USD',
                            countryCode:'US'
                        }
                    }}
                    onLoadPaymentData={paymentData=>{
                        console.log('SUCCESS!', paymentData.paymentMethodData)
                    }}
                    />
                  
                </Card.Body>

            </Card>
           </div>




           <div className="Subjects" style={{backgroundColor:'rgb(12,12,12)', padding:'20px', borderRadius:'10px', marginBottom:'10px'}}>
           <h2 style={{color:'gray', fontSize:'22px', marginTop:'20px', marginBottom:'10px'}}>Delete Subjects:</h2>
           <p style={{color:'gray'}}>Note: Once clicked, your subject will be deleted.</p>
           <Container fluid={true}>
              <Row>
              {subjectList.map((sub)=>{
              
              return(
               <Col xs='1' style={{marginRight:'5px', marginLeft:'0'}}>
                <Card 
                type="checkbox"
                 value={sub} 
                 variant="secondary"
                onClick={()=>{DeleteSub({sub:sub})}}
               
                 style={{marginRight:'5px', marginBottom:'5px', width:'100px'}}>
                  {sub}
                </Card>
                </Col>
              )
            
            })}
              </Row>
            </Container>
           </div>



           <div className="Help" style={{backgroundColor:'rgb(12,12,12)', padding:'20px', borderRadius:'10px', marginBottom:'10px'}}>
           <h2 style={{color:'gray', fontSize:'22px', marginTop:'20px', marginBottom:'10px'}}>Help:</h2>
            <h3 style={{color:'gray', fontSize:'16px', marginTop:'20px', marginBottom:'10px'}}>E-mail: info@nitrondigital.com</h3>

           <Card  onClick={()=>{window.location.href="'https://www.instagram.com/nitrondigital/'"}} style={{backgroundColor:'rgb(41, 44, 51)',height:'50px', width:'50px', border:'none'}}>
           <Instagram style={{color:'gray', height:'50px', width:'50px',cursor:'pointer'}}/>
           </Card>

           </div>

           <Button onClick={LogOut}>Log Out</Button>


          </Container>


            

        </div>



    </div>
  )
}

export default Settings