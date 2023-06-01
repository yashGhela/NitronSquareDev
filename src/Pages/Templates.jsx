import React from 'react'
import Sidebar from '../Components/Sidebar'
import { Button, Card } from 'react-bootstrap'

function Templates() {

    let categories= ['Light','Deep work', 'Quick', 'Long']
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
           
   
         
         </Card>
        </div>

        <div style={{padding:'20px', borderRadius:'10px', border:'1px solid #282b2e', overflow:'auto', display:'flex', margin:'20px'}}>
           {categories.map((i)=>{
             return(
                <Button variant='outline-secondary' value={i} style={{borderStyle:'dashed', borderRadius:'15px', marginRight:'10px'}} >{i}</Button>
             )
           })}

        </div>
        <div style={{padding:'20px', borderRadius:'10px', border:'1px solid #282b2e', overflow:'auto', display:'flex', margin:'20px'}}>
        <p style={{marginBottom:'10px', fontSize:'23px', marginLeft:'5px', color:'lightgray'}}>Favourites:</p>
            </div>
    </div>
   </div>
  )
}

export default Templates