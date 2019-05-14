import React,{useState, useDispatch, addReducer, useReducer, useContext} from 'react'
import {Form, Button, Col, Row, Container} from 'react-bootstrap'
import axios from 'axios'
import {useGlobal} from 'reactn'
import TopPage from './TopPage'
import Context from './Context'

function SignIn(props) {
  const [global, setGlobal] = useGlobal()

  const username = useFormInput('')
  const pwd = useFormInput('')
  const [message, setMessage] = useState('')
  const [state, dispatch] = useContext(Context)


  console.log(global);
  function handleClick() {
    var data = {
      usernameSignIn: username.value,
      pwdSignIn: pwd.value
    }

    axios.post('http://localhost:8000/signin', {data}).then((res) => {
      console.log(res.data.login);
      if(res.data.login){
          dispatch({type:'LOGIN', payload: res.data.id})
      } else {
        setMessage(res.data.message)
      }
    })

  }
  console.log(state.authenticate);
  if(state.authenticate === true){
    return (
      <div>
        <TopPage type='logout' />
        <h1>CHÀO MỪNG BẠN </h1>
      </div>
    )
  }
  else {
    return(
      <div>
        <TopPage type='signin' />
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



export default SignIn
