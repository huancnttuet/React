import React, {useState, useGlobal} from 'reactn';
import {Form, Button, Col, Row, Container} from 'react-bootstrap'
import { authServices } from 'services'

function ChangePwd(props) {
  const [id, setId] = useGlobal('id')
  const pwd = useFormInput('')
  const newPwd = useFormInput('')
  const reNewPwd = useFormInput('')
  const [message, setMessage] = useState('')

  console.log(props);
  function handleClick() {
    if(pwd.value === ''){
      setMessage('Chưa nhập password')
    } else{
      if(newPwd.value === ''){
        setMessage('Chưa nhập New password')
      } else {
        if(newPwd.value !== reNewPwd.value){
          setMessage('password không khớp nhau')
        } else {
          var data = {
            id: id,
            pwd: pwd.value,
            pwdNew: newPwd.value
          }
          console.log(data);
          authServices.changepwd(data).then((res) => {
            console.log(res.data);
            setMessage(res.data.message)
          })
        }
      }
    }
  }

  return (
    <div>
      <Container>
        <Row style={{marginTop:50}}>
          <Col></Col>
          <Col>
            <Form>
              <Form.Group controlId="formBasicChangePwd" {...pwd}>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword1" {...newPwd}>
                <Form.Label>New Password</Form.Label>
                <Form.Control type="password" placeholder="Enter new password"/>
              </Form.Group>

              <Form.Group controlId="formBasicPassword2" {...reNewPwd}>
                <Form.Label>Re-New Password</Form.Label>
                <Form.Control type="password" placeholder="Enter re-password"/>
              </Form.Group>

              <Button variant="primary" id='cp-btn' onClick={handleClick}>
                Submit
              </Button>
            </Form>
            <p>{message}</p>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
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


export default ChangePwd
