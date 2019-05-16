import React,{useState, useReducer} from 'react';
import {Table,  Badge, Container, Col, Row, Button, Modal, ButtonToolbar} from 'react-bootstrap'
import axios from 'axios'
import MyVerticallyCenteredModal from './MyVerticallyCenteredModal'
import AddMyVerticallyCenteredModal from './AddMyVerticallyCenteredModal'
function PlaceManager(props) {
  const [list, setList] = useState([])
  const [once, setOnce] = useState(false)


  const [modalShow, setModalShow] = useState(false)
  const [modalShow2, setModalShow2] = useState(false)
  const [dataUpdate, setDataUpdate] = useState()
  const [choose, setChoose] = useState({
    id: 0,
    diadiem:'',
    imgKey: ''
  })
  const [idDelete, setIdDelete] = useState()
  const [show, setShow] = useState(false)

  function handleShow() {
    setShow(true)
  }
  function handleClose() {
    setShow(false)
  }
  function handleOK() {
    console.log(idDelete);
    setShow(false)
    setOnce(false)
    axios.post('http://localhost:8000/delete', {id: idDelete}).then((req) => {

      })
  }

  function modalClose() {
    setModalShow(false)
  }
  function modalClose2() {
    setModalShow2(false)
  }

  const myCallback = (dataFromChild) => {
    console.log(dataFromChild);
    setOnce(false)
  }
  const callback = () => {
    setOnce(false)
    setModalShow(false)
  }

  if(!once)
    axios.post('http://localhost:8000/getAll', {table: 'diadiem'}).then((req) => {
      console.log(req);
      setList(req.data.list)
      setOnce(true)
    })


  return (
    <div>
    <Container style={{textAlign: 'center'}}>
      <Row>
        <Col></Col>
        <Col><h4><Badge variant="warning">Quản lý các địa điểm du lịch</Badge></h4></Col>
        <Col>
          <ButtonToolbar>
            <Button
              variant="outline-primary"
              onClick={() => {
                setModalShow2(true)
              }}
            >
              Thêm
            </Button>

            <AddMyVerticallyCenteredModal
              show={modalShow2}
              onHide={modalClose2}
              callbackFromParent={myCallback}
            />
          </ButtonToolbar>
        </Col>
      </Row>
      <Row>
        <Col>
        <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th style={{width:'10%'}}>id</th>
            <th style={{width:'20%'}}>Địa điểm</th>
            <th style={{width:'20%'}}>Đường dẫn ảnh</th>
            <th style={{width:'30%'}}>Ảnh</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            list.map((value, index) => {
              return(
                <tr>
                <td>{value.id}</td>
                <td>{value.diadiem}</td>
                <td>{value.imgKey}</td>
                <td><img style={{height:150}}src={value.imgKey} /></td>
                <td>

                <Button variant="outline-danger" onClick={() => {
                    setShow(true)
                    setIdDelete({
                      id: value.id
                    })
                  }}>
                   Xóa
                 </Button>

                 <Modal show={show} onHide={handleClose}>
                   <Modal.Header closeButton>
                     <Modal.Title>Xóa</Modal.Title>
                   </Modal.Header>
                   <Modal.Body>Bạn có chắc chắn muốn xóa!</Modal.Body>
                   <Modal.Footer>
                     <Button variant="secondary" onClick={handleClose}>
                       Close
                     </Button>
                     <Button variant="outline-danger" onClick={handleOK}>
                       OK
                     </Button>
                   </Modal.Footer>
                 </Modal>

                <ButtonToolbar>
                  <Button
                    variant="outline-warning"
                    onClick={() => {
                      setModalShow(true)
                      setChoose({
                        id: value.id,
                        diadiem: value.diadiem,
                        imgKey: value.imgKey
                      })
                    }}
                  >
                    Sửa
                  </Button>

                  <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={modalClose}
                    choose={choose}
                    callback={callback}
                  />
                </ButtonToolbar>
                <Button variant="outline-link"><a href={`diadiem/${value.id}`}>--></a></Button>
                </td>
                </tr>
              )
            })
          }
        </tbody>
        </Table>
        </Col>
      </Row>
    </Container>
    </div>
  )
}



export default PlaceManager
