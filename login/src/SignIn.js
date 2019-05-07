import React,{useState, useEffect} from 'react'
import {Form, Button, Col, Row, Container} from 'react-bootstrap'
import axios from 'axios'

export default function SignIn(props) {
  const username = useFormInput('')
  const pwd = useFormInput('')
  const [stateLogin , setStateLogin] = useState(false)
  console.log(props);
  function handleClick() {
    var data = {
      usernameSignIn: username.value,
      pwdSignIn: pwd.value
    }

    axios.post('http://localhost:8000/login', {data}).then((res) => {
      console.log(res.data.login);
      if(res.data.login){
        setStateLogin(true);
      }
    })
  }
  if(stateLogin == true){
    return (
      <div>
        <h1>CHÀO MỪNG BẠN =))</h1>
      </div>
    )
  }
  else {
    return(
      <Container>
        <Row>
          <Col>
            <Form>
              <Form.Group controlId="formBasicUsername" {...username}>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" />
                <Form.Text className="text-muted">
                  We'll never share your username with anyone else.
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
