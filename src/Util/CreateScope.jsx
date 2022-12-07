import React from 'react'
import { Container, Form, Navbar } from 'react-bootstrap'

function CreateScope() {
  return (
    <div className='Page2'>
        <Navbar bg='dark' variant='dark'>
            <Container>
                <Navbar.Brand>
                    Create a Scope
                </Navbar.Brand>

            </Container>
        </Navbar>

       
          <div className="titleBar" style={{ color:'white', display:'grid', placeItems:'center', marginLeft:'20px', marginTop:'20px'}}>
          <Form style={{width:'500px'}}> 
            <Form.Group>
              <Form.Label >Title:</Form.Label>
              <Form.Control/>
              <Form.Label>Description:</Form.Label>
              <Form.Control as='textarea' rows={3} style={{resize:'none'}} />
              
            </Form.Group>
          </Form>
          </div>
        
    </div>
  )
}

export default CreateScope