import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useGlobal } from "reactn";
import { withRouter } from "react-router-dom";

function TopPage(props) {
  const [authenticate, setAuthenticate] = useGlobal("authenticate");
  const [id, setId] = useGlobal("id");
  // console.log(state.id);
  // console.log(state);
  // console.log(dispatch);

  const goToHome = () => {
    props.history.push("/");
  };

  const goToChangePwd = () => {
    props.history.push("/changepwd");
  };

  const goToSignIn = () => {
    props.history.push("/");
  };
  const goToSignUp = () => {
    props.history.push("/signup");
  };

  if (authenticate === true || authenticate === "true") {
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand onClick={goToHome} style={{ cursor: "pointer" }}>
            Demo
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link onClick={goToHome}>Home</Nav.Link>

              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link
                onClick={() => {
                  setAuthenticate(false);
                  setId(0);
                  goToHome();
                }}
              >
                Logout
              </Nav.Link>
              <Nav.Link onClick={goToChangePwd}>Change Password</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  } else {
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand onClick={goToHome}>Demo</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link onClick={goToHome}>Home</Nav.Link>

              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link onClick={goToSignIn}>Signin</Nav.Link>
              <Nav.Link onClick={goToSignUp}>Signup</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(TopPage);
