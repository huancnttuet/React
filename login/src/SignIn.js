import React,{useState, useEffect} from 'react'
import {Form, Button, Col, Row, Container} from 'react-bootstrap'
import axios from 'axios'

export default function SignIn(props) {
  const email = useFormInput('')
  const pwd = useFormInput('')

  function handleClick() {
    var data = {
      email: email.value,
      pwd: pwd.value
    }

    axios.post('http://localhost:8000/login', {data}).then((res) => {
      
    })
  }

  return(
    <Container>
      <Row>
        <Col>
          <Form>
            <Form.Group controlId="formBasicEmail" {...email}>
              <Form.Label>Email address</Form.Label>
              <Form.Control type="text" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" {...pwd}>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicChecbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary"  onClick={handleClick}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>

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
