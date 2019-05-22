import React, {useState} from 'react';
import axios from 'axios'
import {Container, Row, Col, Card} from 'react-bootstrap'

function ListTour(props) {
  const [once, setOnce] = useState(false)
  const [list, setList] = useState([])
  const [diadiem, setDiadiem] = useState('')
  const id = props.match.url.split("/")[2]



  if(!once){
    axios.post('http://localhost:8000/getListTour', {id:id}).then( (req) =>{
    console.log(req);
    setList(req.data.list)
    setDiadiem(req.data.list[0].diadiem)
    })
    setOnce(true)
  }

console.log(list);
  return(
    <Container>

        <Card>
          <Card.Header>{diadiem}</Card.Header>
          {

            list.map((value, index) => {
              var url = `http://localhost:3000/detail/${value.id_tour}`
              return(
                <Row style={{marginTop:24}}>
                  <Col>
                    <img src={value.path} style={{height:300, width:300, display:'block', margin:'0 auto'}}/>
                  </Col>
                  <Col>
                    <Card.Body>
                      <a href={url}><Card.Title>{value.tentour}</Card.Title></a>
                      <Card.Text>
                        {value.gia} VNĐ
                      </Card.Text>

                    </Card.Body>
                  </Col>
                </Row>
              )
            })
          }

        </Card>


    </Container>
  )

}

export default ListTour
