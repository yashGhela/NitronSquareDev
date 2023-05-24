import React from 'react'
import { Toast } from 'react-bootstrap'

function firstTimeLogin({showModal, setShowmodal}) {
  return (
    <div>
      <Toast
      show={showModal}
      onClose={setShowmodal(false)}>
      <Toast.Header>
        
        <strong className="me-auto">Welcome!</strong>
    
      </Toast.Header>
      <Toast.Body>Welcome to Improvr! Click on 'Start a Session' to start your first session</Toast.Body>
    </Toast>
    </div>
  )
}

export default firstTimeLogin