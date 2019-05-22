import React, {useState} from 'react';
import {Button, Modal, Row, Col, Container, Form} from 'react-bootstrap'
import axios from 'axios'
import { MDBBtn } from "mdbreact"

function DeleteTour(props) {

  const [show, setShow] = useState(false)
  const [once, setOnce] = useState(false)
  function handleShow() {
    setShow(true)
  }
  function handleClose() {
    setShow(false)
  }
  function handleClick() {
    setShow(false)
    axios.post("http://localhost:8000/deletetour", {id: props.id}).then((req) => {
      console.log(req);
    })
    props.callback()
  }



  return(
    <>
    <MDBBtn gradient="peach" onClick={handleShow} size='sm'>Xóa</MDBBtn>


       <Modal show={show} onHide={handleClose}>
         <Modal.Header closeButton>
           <Modal.Title>Xóa tour</Modal.Title>
         </Modal.Header>
         <Modal.Body>
          <Container style={{textAlign: 'center'}}>
            <p>Bạn có chắc chắn muốn xóa?</p>

          </Container>
         </Modal.Body>
         <Modal.Footer>
           <Button variant="secondary" onClick={handleClose}>
             Quay lại
           </Button>
           <Button variant="primary" onClick={handleClick}>
             Đồng ý
           </Button>
         </Modal.Footer>
       </Modal>
    </>
  )
}


export default DeleteTour
