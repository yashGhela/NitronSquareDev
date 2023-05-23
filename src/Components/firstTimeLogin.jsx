import React from 'react'
import { Modal } from 'react-bootstrap'

function firstTimeLogin({showModal, setShowmodal}) {
  return (
    <div>
        <Modal className='special_modal'
        show={showModal}
              
        aria-labelledby="contained-modal-title-vcenter"
        onHide={()=>{setShowmodal(false)}}
        style={{color:'lightgray'}}
        centered> 
            <Modal.Header>Welcome to Improvr</Modal.Header>
            <Modal.Body>
                <h3>Currently your in the dashboard. Here you can see your recent studying sessions and your most recent scopes.</h3>
                <h3 color='rgb(97, 149, 232)'>Click the button in the card to start your first session</h3>
            </Modal.Body>
        </Modal>
    </div>
  )
}

export default firstTimeLogin