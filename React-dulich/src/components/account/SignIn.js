import React,{useState} from 'react'
import {Form, Button, Col, Row, Container} from 'react-bootstrap'
import axios from 'axios'
import { connect } from 'react-redux'


function SignIn(props) {
  const username = useFormInput('')
  const pwd = useFormInput('')
  const [message, setMessage] = useState('')

  console.log(props);
  function handleClick() {
    var data = {
      usernameSignIn: username.value,
      pwdSignIn: pwd.value
    }

    axios.post('http://localhost:8000/signin', {data}).then((res) => {
      console.log(res.data.login);
      if(res.data.login){
        props.dispatch({type: 'LOGIN', payload: {id: res.data.id, level: res.data.level} })
      } else {
        setMessage(res.data.message)
      }
    })
  }

  if(props.authenticate === true){
    return (
      <div>

        <h1>CHÀO MỪNG BẠN </h1>
      </div>
    )
  }
  else {
    return(
      <div>

        <Container>
          <Row style={{marginTop:50}}>
            <Col>
            </Col>
            <Col >
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
                <p>{message}</p>
                <a href='http://localhost:3000/forgottenacc'>Forgotten account?</a>
              </Form>
            </Col>
            <Col>
            </Col>
          </Row>
        </Container>

      </div>
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

const mapStateToProps = state => ({
  authenticate: state.authenticate
})

export default connect(mapStateToProps)(SignIn)
