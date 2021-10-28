import React, {useState} from 'react';
import {Button, Modal, Row, Col, Container, Form} from 'react-bootstrap'
import axios from 'axios'
import { MDBBtn } from "mdbreact"

function AddTour(props) {

  const [show, setShow] = useState(false)
  const tentour = useFormInput(props.tentour)
  const gia = useFormInput(props.gia)
  const lichtrinh = useFormInput(props.lichtrinh)
  const [once, setOnce] = useState(false)
  function handleShow() {
    setShow(true)
  }
  function handleClose() {
    setShow(false)
  }
  function handleClick() {
    setShow(false)
    axios.post("http://localhost:8000/updateTour", { id_diadiem: props.idDiadiem, tentour: tentour.value, gia: gia.value, lichtrinh: lichtrinh.value, id_tour: props.idTour}).then((req) => {
      console.log(req);
    })
    props.callback()
  }



  return(
    <>
    <MDBBtn gradient="purple" size='sm' onClick={handleShow}>Sửa</MDBBtn>

       <Modal show={show} onHide={handleClose}>
         <Modal.Header closeButton>
           <Modal.Title>Thêm tour</Modal.Title>
         </Modal.Header>
         <Modal.Body>
          <Container style={{textAlign: 'center'}}>
            <Row>
              <Col>
                <Form.Label>Tên tour</Form.Label>
                <Form.Control {...tentour} placeholder={tentour.value}/>
              </Col>
              <Col>
                <Form.Label>Giá</Form.Label>
                <Form.Control {...gia} placeholder={gia.value}/>
              </Col>
            </Row>
            <Row>
            </Row>
            <Row>------------------------------------------------------------------------</Row>
            <Row>
              <Col>Lịch trình</Col>
              <Col>
                <textarea rows="4" cols="50" {...lichtrinh}>
                  {lichtrinh.value}
                </textarea>
              </Col>
            </Row>

          </Container>
         </Modal.Body>
         <Modal.Footer>
           <Button variant="secondary" onClick={handleClose}>
             Close
           </Button>
           <Button variant="primary" onClick={handleClick}>
             Save
           </Button>
         </Modal.Footer>
       </Modal>
    </>
  )
}

function useFormInput(initial){
  const [value, setValue] = useState(initial)

  function handleChange(e){
    setValue(e.target.value)
  }

  return {
    value,
    onChange: handleChange
  }
}

export default AddTour
