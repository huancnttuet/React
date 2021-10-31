import React, { useState } from 'react'
import {
	Form,
	Button,
	Col,
	Row,
	Container,
	Spinner,
	Alert
} from 'react-bootstrap'
import axios from 'axios'
import { connect } from 'react-redux'
import PopUp from '../utils/PopUp'

function SignIn(props) {
	const username = useFormInput('')
	const pwd = useFormInput('')
	const [message, setMessage] = useState('')
	const [loading, setLoading] = useState(false)
	const [popUp, setPopUp] = useState(false)
	function handleClick() {
		var data = {
			usernameSignIn: username.value,
			pwdSignIn: pwd.value
		}
		setLoading(true)
		axios.post('http://localhost:8080/users/signin', { data }).then((res) => {
			setLoading(false)
			console.log(res.data)
			if (res.data.status === 'Success') {
				let data = res.data.data
				props.dispatch({
					type: 'LOGIN',
					payload: { id: data.id, level: data.level }
				})
			} else {
				setPopUp(true)
				setMessage(res.data.message)
			}
		})
	}

	if (props.authenticate === true) {
		return (
			<div>
				<h1>CHÀO MỪNG BẠN </h1>
			</div>
		)
	} else {
		return (
			<div>
				<Container>
					<Row style={{ marginTop: 50 }}>
						<Col></Col>
						<Col>
							{loading ? (
								<Spinner animation='border' role='status'></Spinner>
							) : (
								<Form>
									<Form.Group controlId='formBasicUsername' {...username}>
										<Form.Label>Username</Form.Label>
										<Form.Control type='text' placeholder='Enter username' />
										<Form.Text className='text-muted'>
											We'll never share your username with anyone else.
										</Form.Text>
									</Form.Group>

									<Form.Group controlId='formBasicPassword' {...pwd}>
										<Form.Label>Password</Form.Label>
										<Form.Control type='password' placeholder='Password' />
									</Form.Group>
									<Form.Group controlId='formBasicChecbox'>
										<Form.Check type='checkbox' label='Check me out' />
									</Form.Group>
									<Button variant='primary' onClick={handleClick}>
										Submit
									</Button>
									{message ? (
										<Alert variant='warning' style={{ fontSize: '14px' }}>
											{message}
										</Alert>
									) : (
										''
									)}
									<PopUp
										show={popUp}
										onHide={() => setPopUp(false)}
										message={message}
										title='Đăng nhập thất bại'
									/>
									<a href='http://localhost:3000/forgottenacc'>
										Forgotten account?
									</a>
								</Form>
							)}
						</Col>
						<Col></Col>
					</Row>
				</Container>
			</div>
		)
	}
}

function useFormInput(initial) {
	const [value, setValue] = useState(initial)

	function handleChange(e) {
		setValue(e.target.value)
	}

	return {
		value,
		onChange: handleChange
	}
}

const mapStateToProps = (state) => ({
	authenticate: state.authenticate
})

export default connect(mapStateToProps)(SignIn)
