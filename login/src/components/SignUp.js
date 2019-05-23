import React, {useState} from 'react';
import {Form, Button, Col, Row, Container} from 'react-bootstrap'
import axios from 'axios'


function SignUp(props) {
  const emailSignUp = useFormInput('')
  const usernameSignUp = useFormInput('')

  const [stateSignUp, setStateSignUp] = useState('')

  function handleClick() {

    if(!checkUsername()) {
      setStateSignUp('errorUsername')
    } else {
      var data = {
        emailSignUp: emailSignUp.value,
        usernameSignUp: usernameSignUp.value
      }
      axios.post('http://localhost:8000/signup', {data}).then( (res) => {
        setStateSignUp(res.data.message)
      })
    }
  }

  function checkUsername() {
    if(usernameSignUp.value.length < 6)
     return false
    return true
  }

  return(
    <div>

      <Container>
        <Row style={{marginTop:50}}>
          <Col></Col>
          <Col>
            <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="emailSignUp" {...emailSignUp}>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="usernameSignUp" {...usernameSignUp}>
                <Form.Label>Username</Form.Label>
                <Form.Control placeholder="Enter username" />
              </Form.Group>
            </Form.Row>


            <span>{stateSignUp}</span>

            <Form.Group id="formGridCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>

            <Button variant="primary" id='signup-btn' onClick={handleClick}>
              Submit
            </Button>
          </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>

  )
}

function useFormInput(initial) {
  const [value, setValue] = useState(initial)

  function handleChange(e) {
    setValue(e.target.value)
  }
  return {
    value,
    onChange : handleChange
  }
}

export default SignUp
