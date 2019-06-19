import React, { useState, useGlobal } from "reactn";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import { authServices } from "services";

function SignIn(props) {
  const [global, setGlobal] = useGlobal();
  const username = useFormInput("");
  const pwd = useFormInput("");
  const [message, setMessage] = useState("");

  console.log(global);
  function handleClick() {
    var data = {
      usernameSignIn: username.value,
      pwdSignIn: pwd.value
    };
    authServices.login(data).then(res => {
      console.log(res.data.login);
      if (res.data.login) {
        global.dispatch({
          type: "LOGIN",
          payload: res.data.id
        });
      } else {
        setMessage(res.data.message);
      }
    });
  }

  const goToForgottenAccount = () => {
    props.history.push("/forgottenacc");
  };

  console.log(global.state.authenticate);
  if (global.state.authenticate === true) {
    return (
      <>
        <h1>CHÀO MỪNG BẠN </h1>
      </>
    );
  } else {
    return (
      <div>
        <Container>
          <Row style={{ marginTop: 50 }}>
            <Col>{props.authenticate}</Col>
            <Col>
              <Form>
                <Form.Group controlId="username-signin" {...username}>
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="Enter username" />
                  <Form.Text className="text-muted">
                    We'll never share your username with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="password-signin" {...pwd}>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicChecbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" id="login-btn" onClick={handleClick}>
                  Submit
                </Button>
                <p>{message}</p>
                <a onClick={goToForgottenAccount}>Forgotten account?</a>
              </Form>
            </Col>
            <Col />
          </Row>
        </Container>
      </div>
    );
  }
}

function useFormInput(initial) {
  const [value, setValue] = useState(initial);

  function handleChange(e) {
    setValue(e.target.value);
  }

  return {
    value,
    onChange: handleChange
  };
}

export default SignIn;
