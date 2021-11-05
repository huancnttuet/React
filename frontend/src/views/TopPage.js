import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { connect } from 'react-redux'
import Clock from 'react-live-clock'

function TopPage(props) {
	var pathHome = `http://localhost:3000/home`

	const pathChangePwd = `/changepwd/${props.id}`
	console.log(props)
	if (props.type) {
		if (props.level !== '0' || props.level !== 0) {
			return (
				<div>
					<Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
						<Navbar.Brand href={pathHome}>Demo</Navbar.Brand>
						<Navbar.Toggle aria-controls='responsive-navbar-nav' />
						<Navbar.Collapse id='responsive-navbar-nav'>
							<Nav className='mr-auto'>
								<Nav.Link href={pathHome}>Home</Nav.Link>

								<NavDropdown title='' id='collasible-nav-dropdown'>
									<NavDropdown.Item href='http://localhost:3000/weather'>
										Thời tiết
									</NavDropdown.Item>
									<NavDropdown.Item href='#action/3.2'>
										Another action
									</NavDropdown.Item>
									<NavDropdown.Item href='#action/3.3'>
										Something
									</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item href='#action/3.4'>
										Separated link
									</NavDropdown.Item>
								</NavDropdown>
							</Nav>
							<Nav>
								<Clock
									style={{
										float: 'right',
										marginRight: '34px',
										fontSize: '28px',
										color: 'white'
									}}
									format={'HH:mm:ss'}
									ticking={true}
									timezone={'Asia/Ho_Chi_Minh'}
								/>
								<Nav.Link
									href='http://localhost:3000/home'
									onClick={() => props.dispatch({ type: 'LOGOUT' })}
								>
									Logout
								</Nav.Link>
								<Nav.Link href={pathChangePwd}>Change Password</Nav.Link>
							</Nav>
						</Navbar.Collapse>
					</Navbar>
				</div>
			)
		} else {
			return (
				<div>
					<Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
						<Navbar.Brand href={pathHome}>Demo</Navbar.Brand>
						<Navbar.Toggle aria-controls='responsive-navbar-nav' />
						<Navbar.Collapse id='responsive-navbar-nav'>
							<Nav className='mr-auto'>
								<Nav.Link href={pathHome}>Home</Nav.Link>

								<NavDropdown title='' id='collasible-nav-dropdown'>
									<NavDropdown.Item href='http://localhost:3000/weather'>
										Thời tiết
									</NavDropdown.Item>
									<NavDropdown.Item href='http://localhost:3000/manager'>
										Quản lý các tour
									</NavDropdown.Item>
									<NavDropdown.Item href='http://localhost:3000/order'>
										Quản lý danh sách các order
									</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item href='#action/3.4'>
										Separated link
									</NavDropdown.Item>
								</NavDropdown>
								<Navbar.Brand href={pathHome}>Xin chào, Admin</Navbar.Brand>
							</Nav>
							<Nav>
								<Clock
									style={{
										float: 'right',
										marginRight: '34px',
										fontSize: '28px',
										color: 'white'
									}}
									format={'HH:mm:ss'}
									ticking={true}
									timezone={'Asia/Ho_Chi_Minh'}
								/>
								<Nav.Link
									href='http://localhost:3000/home'
									id='logoutBtn'
									onClick={() => props.dispatch({ type: 'LOGOUT' })}
								>
									Logout
								</Nav.Link>
								<Nav.Link href={pathChangePwd}>Change Password</Nav.Link>
							</Nav>
						</Navbar.Collapse>
					</Navbar>
				</div>
			)
		}
	} else {
		return (
			<div>
				<Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
					<Navbar.Brand href={pathHome}>Demo</Navbar.Brand>
					<Navbar.Toggle aria-controls='responsive-navbar-nav' />
					<Navbar.Collapse id='responsive-navbar-nav'>
						<Nav className='mr-auto'>
							<Nav.Link href={pathHome}>Home</Nav.Link>

							<NavDropdown title='' id='collasible-nav-dropdown'>
								<NavDropdown.Item href='http://localhost:3000/weather'>
									Thời tiết
								</NavDropdown.Item>
								<NavDropdown.Item href='#action/3.2'>
									Another action
								</NavDropdown.Item>
								<NavDropdown.Item href='#action/3.3'>
									Something
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href='#action/3.4'>
									Separated link
								</NavDropdown.Item>
							</NavDropdown>
						</Nav>
						<Nav>
							<Clock
								style={{
									float: 'right',
									marginRight: '34px',
									fontSize: '28px',
									color: 'white'
								}}
								format={'HH:mm:ss'}
								ticking={true}
								timezone={'Asia/Ho_Chi_Minh'}
							/>
							<Nav.Link href='http://localhost:3000/signin'>Signin</Nav.Link>
							<Nav.Link href='http://localhost:3000/signup'>Signup</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	authenticate: state.authenticate,
	id: state.id,
	level: state.level
})

export default connect(mapStateToProps)(TopPage)
