import React from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import {useGlobal} from 'reactn'


function TopPage(props) {
    const [state, setState] = useGlobal('state')
    const [dispatch, setDispatch] = useGlobal('dispatch')
    console.log(state.id);
    console.log(state);
    console.log(dispatch);
    var id = ''
    if(state.id !== 0){
      id = state.id
    }
    const pathHome=`http://localhost:3000/${id}`
    const pathChangePwd = `/changepwd`

    if(state.authenticate === true || state.authenticate === 'true'){
      return (
        <div>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href={pathHome}>Demo</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href={pathHome}>Home</Nav.Link>

              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="http://localhost:3000/" onClick={() => dispatch({type:'LOGOUT'})}>Logout</Nav.Link>
              <Nav.Link href={pathChangePwd}>Change Password</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        </div>
      )
    } else {
      return (
        <div>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href={pathHome}>Demo</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href={pathHome}>Home</Nav.Link>

              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="http://localhost:3000/">Signin</Nav.Link>
              <Nav.Link href="http://localhost:3000/signup">Signup</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        </div>
      )
    }

}


export default TopPage
