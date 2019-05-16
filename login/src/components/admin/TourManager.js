import React, {useState} from 'react';
import {Container, Row, Col, Table, Button, Badge} from 'react-bootstrap'
import axios from 'axios'
import AddTour from './AddTour'
import EditTour from './EditTour'

function TourManager(props) {
  const id = props.match.params.id
  const [once, setOnce] = useState(false)
  const [list, setList] = useState([])
  const [diadiem, setDiadiem] = useState('')
  if(!once) {
    axios.post('http://localhost:8000/getTour',{id:id}).then((req) => {
      console.log(req.data.list)
      setList(req.data.list)
      setDiadiem(req.data.diadiem)
      setOnce(true)
    })
  }
  const callback = () => {
    setOnce(false)
  }
  return (
    <div>
      <Container style={{textAlign:'center'}}>
        <Row >
          <Col></Col>
          <Col>
            <h3>
              <Badge pill variant="danger">
                Các tour du lịch ở {diadiem}
              </Badge>
            </h3>
          </Col>
          <Col><AddTour id={id} callback={callback} /></Col>
        </Row>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th width='10%'>id</th>
              <th width='20%'>Tên tour</th>
              <th width='15%'>Giá</th>
              <th width='45%'>Lịch trình</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              list.map((value, index) => {
                return(
                  <tr>
                    <td>{value.id_tour}</td>
                    <td>{value.tentour}</td>
                    <td>{value.gia}</td>
                    <td>{value.lichtrinh}</td>
                    <td>
                      <EditTour callback={callback} idTour={value.id_tour} idDiadiem={id} tentour={value.tentour} gia={value.gia} lichtrinh={value.lichtrinh} />
                    </td>
                  </tr>
                )
              })
            }

          </tbody>
        </Table>

      </Container>

    </div>
  )
}

export default TourManager
