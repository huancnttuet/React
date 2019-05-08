import React from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'

export default function TopPage() {
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="http://localhost:3000">Demo</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="http://localhost:3000">Home</Nav.Link>

            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="http://localhost:3000/signin">Signin</Nav.Link>
            <Nav.Link href="http://localhost:3000/signup">Signup</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      </div>
    )
}
