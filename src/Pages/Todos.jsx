import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar'
import { Button, Card, FormCheck,Form, Container ,Row,Col, Badge} from 'react-bootstrap'
import {  useNavigate } from 'react-router-dom'
import { Check2Square, Speedometer,CardText,BarChart, Hr, Journals, Bullseye, Check, Journal, Archive, Wallet2,Gear  } from 'react-bootstrap-icons'
import { collection, doc, onSnapshot, updateDoc, addDoc, query, orderBy } from 'firebase/firestore'
import Cookies from 'universal-cookie';
import { db } from '../firebaseConfig'
import { format } from 'date-fns'


function Todos() {
    let nav=useNavigate();
    const date= new Date()
    const today=format(date, 'yyyy/MM/dd')
    const tomorrow= format(date.getDate()+1, 'yyyy/MM/dd')
    const cookie = new Cookies()
    const paidt= cookie.get('PAIDT')

    const user=cookie.get('useraidt')
    const q= collection(db,'Users',user,'ToDos');
    const todoRef= query(q, orderBy('date','desc'))
   

    const [todoExists, setTodoExists]=useState(true)
    const [todoList,setTodoList]=useState([]);
    const [todo,setTodo]=useState('');
    const [stateUp,setStateUp]=useState('complete')

    const state=(todo)=>{
      if(todo.state==='incomplete'){return('danger')}else{return('success')}
    }

    const CompleteToDo=async({id})=>{
      await updateDoc(doc(q,id),{
        state:stateUp
      })
      
    }

    
    const AddToDo=async()=>{
      await addDoc(todoRef,{
        name: todo,
        state: 'incomplete',
        date: format(new Date(), 'yyyy/MM/dd')
      })
     
    }
   

    useEffect(()=>{
      onSnapshot(todoRef,(snapshot)=>{
        if(snapshot.empty){
          setTodoExists(false)
          console.log(todoList)
        }else{
          setTodoList(
            snapshot.docs.map((doc)=>({...doc.data(),id:doc.id}))
          )
          setTodoExists(true)
          
          console.log(todoList)
          

        }
        
          
        })

       
      
        

    },[])
  return (
    <div className='Page'>
        
        <div className="navB">
        <Sidebar
        L1={<Button variant='light-outline' onClick={()=>nav(`/Dashboard/`)}><Speedometer style={{color:'white'}}/></Button>}
        L2={<Button variant='light-outline' onClick={()=>nav(`/Sessions/`)}><Archive style={{color:'white'}}/></Button>}
        L3={<Button variant='light-outline' onClick={()=>nav(`/Trends/`)}><BarChart style={{color:'white'}}/></Button>}
        L4={<Button variant='light-outline' onClick={()=>nav(`/Scopes/`)}><Bullseye style={{color:'white'}}/></Button>}
        L5={<Button variant='light-outine'><Check2Square style={{color:'white'}}/></Button>}
     />
        </div>

        {paidt==='Tnf'?
        <div className='bod'>
        <Card style={{
            
            margin:'20px',
            height:'150px',
            border: '3px solid  rgb(199, 78, 120)',
            backgroundColor:'#17181a',
            backgroundSize:'400% 400%',
            textAlign:'center',
            alignItems:'center',
            color:'white',
            padding:' 10px',
            animation:'gradient 15s ease infinite'
             }}>
           <Card.Title ><h1 style={{FontWeight:'400', FontSize:'40px'}}>Todos</h1></Card.Title>
         </Card>

         
         <Container style={{  padding:'20px',  marginLeft:'10vw', marginTop:'10px', width:'70vw', height:'100%', borderRadius:'10px', color:'lightgray'}}>
          <div style={{backgroundColor:'#282b2e', padding:'20px', borderRadius:'10px', marginBottom:'10px'}}> 
          <p style={{color:'lightgray',fontSize:'25px'}}>Add a Task </p>
          <Form  className='special_modal' style={{display:'flex', padding:'20px'}}>
          <Form.Control className='special_modal' style={{width:'80%', marginRight:'15px'}} value={todo} onChange={(e)=>{setTodo(e.target.value)}}/>
        <Button onClick={()=>{AddToDo(); setTodo('')}} variant='outline-light'>Add! </Button>
          </Form>
          </div>
          </Container>
    

        
         <Container style={{  padding:'20px',  marginLeft:'10vw', marginTop:'10px', width:'70vw', height:'100%', borderRadius:'10px', color:'lightgray'}}>
          <div style={{backgroundColor:'#282b2e', padding:'20px', borderRadius:'10px', marginBottom:'10px'}}> 
           
          <p style={{color:'lightgray',fontSize:'25px'}}>Todos </p>
           
            
              <div>
              {todoList.map((todo)=>{
                return(
                  <Card 
                  style={{background:'#282b2e' , display:'flex', marginBottom:'20px', fontWeight:'lighter', padding:'15px', cursor:'pointer',color:'lightgray'}} 
                  
                  breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
                  minBreakpoint="xxs">
                   <Row>
                    <Col>
                    <h3 style={{fontWeight:'400', fontSize:'20px'}}>{todo.name}</h3></Col>
                    <Col><h3 style={{fontWeight:'400', fontSize:'20px'}}>{todo.date}</h3></Col>
                    <Col><Badge pill bg={state(todo)}>{todo.state}</Badge></Col>
                    <Col><Button  variant="secondary" onClick={()=>{CompleteToDo({id: todo.id}); if (todo.state==='incomplete'){setStateUp('complete')}else{setStateUp('incomplete')}}}  style={{float:'right'}} ><Check/></Button></Col>
                   </Row>
                
                    </Card>
                )
              })}
              </div>
            
          </div>
          </Container>
        

         
        </div>
        :
        <div className='bod'>
           <Card style={{
            
            margin:'20px',
            height:'150px',
            border: '3px solid  rgb(199, 78, 120)',
            backgroundColor:'#17181a',
            backgroundSize:'400% 400%',
            textAlign:'center',
            alignItems:'center',
            color:'white',
            padding:' 10px',
            animation:'gradient 15s ease infinite'
             }}>
           <Card.Title ><h1 style={{FontWeight:'400', FontSize:'40px'}}>Todos</h1></Card.Title>
         </Card>

         <div style={{textAlign:'center', color:'lightgray'}}>
          <p >Pro mode coming soon. <br/> Follow our instagram for more updates <br/> @nitrondigital</p>
         </div>

        </div>
            }

       
    </div>
  )
}

export default Todos