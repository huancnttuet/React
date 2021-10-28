import React, {useState} from 'react';
import {Button, Modal, Row, Col, Container, Form, Card} from 'react-bootstrap'
import { MDBBtn } from "mdbreact";
import axios from 'axios'

function BookTour(props) {
  const id_tour = props.id
  const tour = props.info
  const [show, setShow] = useState(false)
  const [style, setStyle] = useState({visibility:'hidden'})
  const [message, setMessage] = useState('')
  const email = useFormInput('')
  const hovaten = useFormInput('')
  const code = useFormInput('')
  const [once, setOnce] = useState(false)

  function handleShow() {
    setShow(true)
  }
  function handleClose() {
    setShow(false)
  }
  function handleClick() {
    setStyle({visibility:''})
    if(!once){
      axios.post('http://localhost:8000/sendCode', {email: email.value}).then((req) => {
        console.log(req);
        setOnce(true)
      })
    } else {
      axios.post('http://localhost:8000/booktour', {id_tour: id_tour, email: email.value, hovaten: hovaten.value, code: code.value}).then((req) => {
        console.log(req.data);
        if(req.data.result){
          setMessage('OK')
          axios.post('http://localhost:8000/createOrder', {id_tour: id_tour, email: email.value, hovaten: hovaten.value, trangthai: 'Chưa nộp tiền'}).then((req) => {
            console.log(req.data);
          })
        } else {
          setMessage('Mã xác thực không đúng, vui lòng nhập lại')
        }
      })

    }
  }

console.log(code.value);

  return(
    <>
      <MDBBtn gradient="aqua" size='lg' onClick={handleShow}>Đặt Tour</MDBBtn>
       <Modal show={show} onHide={handleClose}>
         <Modal.Header closeButton>
           <Modal.Title>Đặt tour</Modal.Title>
         </Modal.Header>
         <Modal.Body>
          <Container style={{textAlign: 'center'}}>
            <Row>
              <Col></Col>
              <Col>
                <Card bg="success" text="white" style={{ width: '18rem' }}>
                  <Card.Header>{tour.tentour}</Card.Header>
                  <Card.Body>
                  <Card.Title>{tour.gia} VNĐ</Card.Title>
                  <Card.Text>
                    <p>Nhập thông tin của bạn:</p>
                    <Form.Label>Email</Form.Label>
                    <Form.Control {...email}/>
                    <Form.Label>Họ và tên</Form.Label>
                    <Form.Control {...hovaten}/>
                    <div style={style}>
                    <Form.Label>Mã xác thực</Form.Label>
                    <Form.Control {...code}/>
                    {message}
                    </div>
                  </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col></Col>
            </Row>
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

export default BookTour
