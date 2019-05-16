import React, {useState} from 'react';
import {Container, Row, Col, Table, Button, Badge} from 'react-bootstrap'
import axios from 'axios'
import AddTour from './AddTour'
import EditTour from './EditTour'
import DeleteTour from './DeleteTour'

function TourManager(props) {
  const id = props.id
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

        <Table striped bordered hover style={{tableLayout: 'fixed', width: '100%', margin:'20px auto', padding:'14px'}}>
          <thead>
            <tr>
              <th width='10%'>id</th>
              <th width='20%'>Tên tour</th>
              <th width='15%'>Giá</th>
              <th width='45%'>Lịch trình</th>
              <th width='10%'></th>
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
                    <td style={{wordWrap: 'break-word', overflowWrap: 'break-word'}}>{value.lichtrinh}</td>
                    <td>
                      <Container>
                        <Row>
                          <EditTour callback={callback} idTour={value.id_tour} idDiadiem={id} tentour={value.tentour} gia={value.gia} lichtrinh={value.lichtrinh} />
                        </Row>
                        <Row><DeleteTour callback={callback} id={value.id_tour} /></Row>
                        <Row></Row>
                      </Container>
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
