import React, {useState} from 'react';
import {Button, Modal, Row, Col, Container, Form} from 'react-bootstrap'
import axios from 'axios'

function AddTour(props) {

  const [show, setShow] = useState(false)
  const tentour = useFormInput('')
  const gia = useFormInput('')
  const lichtrinh = useFormInput('')
  const [once, setOnce] = useState(false)
  function handleShow() {
    setShow(true)
  }
  function handleClose() {
    setShow(false)
  }
  function handleClick() {
    setShow(false)
    axios.post("http://localhost:8000/insert", {data:{ id_diadiem: props.id, tentour: tentour.value, gia: gia.value, lichtrinh: lichtrinh.value}, table:'tour'}).then((req) => {
      console.log(req);
    })
    props.callback()
  }



  return(
    <>
    <Button variant="outline-primary" onClick={handleShow}>
         Thêm
    </Button>

       <Modal show={show} onHide={handleClose}>
         <Modal.Header closeButton>
           <Modal.Title>Thêm tour</Modal.Title>
         </Modal.Header>
         <Modal.Body>
          <Container style={{textAlign: 'center'}}>
            <Row>
              <Col>
                <Form.Label>Tên tour</Form.Label>
                <Form.Control {...tentour}/>
              </Col>
              <Col>
                <Form.Label>Giá</Form.Label>
                <Form.Control {...gia}/>
              </Col>
            </Row>
            <Row>
            </Row>
            <Row>------------------------------------------------------------------------</Row>
            <Row>
              <Col>Lịch trình</Col>
              <Col>
                <textarea rows="4" cols="50" {...lichtrinh}>

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
