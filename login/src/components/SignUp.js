import React, {useState} from 'react';
import {Form, Button, Col, Row, Container} from 'react-bootstrap'
import axios from 'axios'

function SignUp(props) {
  const emailSignUp = useFormInput('')
  const usernameSignUp = useFormInput('')
  const pwdSignUp = useFormInput('')
  const rePwdSignUp = useFormInput('')
  const [stateSignUp, setStateSignUp] = useState('')

  function handleClick() {

    if(!checkPwd()){
      setStateSignUp('errorPwd')
    } else if(!checkUsername()) {
      setStateSignUp('errorUsername')
    } else {
      var data = {
        emailSignUp: emailSignUp.value,
        usernameSignUp: usernameSignUp.value,
        pwdSignUp: pwdSignUp.value,
        rePwdSignUp: rePwdSignUp.value
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

  function checkPwd() {
    if(pwdSignUp.value === rePwdSignUp.value)
      return true
    return false
  }

  return(
    <Container>
      <Row>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="emailSignUp" {...emailSignUp}>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group as={Col} controlId="usernameSignUp" {...usernameSignUp}>
              <Form.Label>Username</Form.Label>
              <Form.Control placeholder="Enter username" />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="pwdSignUp" {...pwdSignUp}>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password"  placeholder="" />
          </Form.Group>

          <Form.Group controlId="rePwdSignUp" {...rePwdSignUp}>
            <Form.Label>RePassword</Form.Label>
            <Form.Control type="password"  placeholder="" />
          </Form.Group>
          <span>{stateSignUp}</span>

          <Form.Group id="formGridCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>

          <Button variant="primary" onClick={handleClick}>
            Submit
          </Button>
        </Form>

      </Row>

  </Container>

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
