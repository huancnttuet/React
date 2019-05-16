import React, {useState} from 'react';
import {Container, Row, Col, Button, Card} from 'react-bootstrap'
import BookTour from './BookTour'
import axios from 'axios'

function DetailTour(props) {
  const id = props.match.url.split('/')[2]
  const [tour, setTour] = useState({
    tentour:'',
    gia: 0,
    lichtrinh: ''
  })
  const [path, setPath] = useState([])
  const [lichtrinh, setLichtrinh] = useState([])
  const [once, setOnce] = useState(false)
  const [once1, setOnce1] = useState(false)
  if(!once){
    axios.post('http://localhost:8000/detail',{id: id}).then((req) => {
      console.log(req.data.detail);
      setTour(req.data.detail)
      setLichtrinh(tour.lichtrinh.split('\n'))
      console.log(tour.lichtrinh.split('\n'));
      setOnce(true)
    })
  }
  if(!once){
    axios.post('http://localhost:8000/getimg',{id: id}).then((req) => {
      console.log(req.data.path);
      setPath(req.data.path)
      setOnce(true)
    })
  }
  return (
    <Container>

    <Card>
      <Card.Header>{tour.tentour}</Card.Header>

      <Card.Title>Ảnh</Card.Title>
      <Row >
      {
        path.map((value, index) => {
          return(
            <Col>
              <img src={value.path} style={{height:200, width:200}}/>
            </Col>
          )
        })
      }
      </Row>
      <Row>
        <Col>
          <Card.Title>Giá</Card.Title>
          <Card.Text>{tour.gia} VNĐ</Card.Text>
        </Col>
        <Col >
          <BookTour id={id} info={tour}/>
        </Col>
      </Row>

      <Card.Body>
        <Card.Title>Lịch trình</Card.Title>
        <Card.Text>
          {lichtrinh.map((value, index) => {
            return(<p> {value}</p>)
          })}
        </Card.Text>
      </Card.Body>
    </Card>
    </Container>
  )
}

export default DetailTour
