import React, {useState} from 'react';
import {Col, Row, Container, Card} from 'react-bootstrap'
import BoxImg from './BoxImg'

import axios from 'axios'



function ListBoxImg(props) {
  const [list, setList] = useState([])
  const [once, setOnce] = useState(false)
  if(!once)
    axios.get('http://localhost:8000/getList').then((req) => {
      console.log(req.data.list);
      setList(req.data.list)
      setOnce(true)
    })


  return(
    <Card className="text-center">
      <Card.Header>Tour trong nước</Card.Header>
      <Card.Body>
        <Container>
          <Row>
            {
              list.map((value, index) => {
                return(<Col><BoxImg id={value.id} pathImg={value.imgKey} title={value.diadiem} /></Col>)
              })
            }

          </Row>
        </Container>
      </Card.Body>
      <Card.Footer className="text-muted">2 days ago</Card.Footer>
    </Card>
  )
}

export default ListBoxImg
