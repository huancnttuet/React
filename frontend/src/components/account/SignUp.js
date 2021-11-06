import React, { useState } from 'react'
import {
	Form,
	Button,
	Col,
	Row,
	Container,
	Alert,
	Spinner
} from 'react-bootstrap'
import axios from 'axios'
import TopPage from '../../views/TopPage'
import PopUp from '../utils/PopUp'

function SignUp(props) {
	const emailSignUp = useFormInput('')
	const usernameSignUp = useFormInput('')
	const [loading, setLoading] = useState(false)
	const [stateSignUp, setStateSignUp] = useState('')
	const [success, setSuccess] = useState(false)
	const [popUp, setPopUp] = useState(false)

	function handleClick() {
		if (!checkUsername()) {
			setStateSignUp('username cần có ít nhất 6 ký tự')
		} else {
			var data = {
				emailSignUp: emailSignUp.value,
				usernameSignUp: usernameSignUp.value
			}
			setLoading(true)
			axios.post('http://localhost:8080/users/signup', { data }).then((res) => {
				setLoading(false)
				console.log(res.data)
				setPopUp(true)
				if (res.data.status === 'Success') {
					setSuccess(true)
				} else {
					setSuccess(false)
				}
				setStateSignUp(res.data.message)
			})
		}
	}

	function checkUsername() {
		if (usernameSignUp.value.length < 6) return false
		return true
	}

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
								<Form.Row>
									<Form.Group as={Col} controlId='emailSignUp' {...emailSignUp}>
										<Form.Label>Email</Form.Label>
										<Form.Control type='email' placeholder='Enter email' />
									</Form.Group>
								</Form.Row>
								<Form.Row>
									<Form.Group
										as={Col}
										controlId='usernameSignUp'
										{...usernameSignUp}
									>
										<Form.Label>Username</Form.Label>
										<Form.Control placeholder='Enter username' />
									</Form.Group>
								</Form.Row>

								{stateSignUp ? (
									<Alert variant='warning' style={{ fontSize: '14px' }}>
										{stateSignUp}
									</Alert>
								) : (
									''
								)}

								<PopUp
									show={popUp}
									onHide={() => setPopUp(false)}
									message={stateSignUp}
									title={
										success
											? 'Tạo tài khoản thành công'
											: 'Tạo tài khoản thất bại'
									}
								/>

								<Form.Group id='formGridCheckbox'>
									<Form.Check type='checkbox' label='Check me out' />
								</Form.Group>

								<Button id='submitBtn' variant='primary' onClick={handleClick}>
									Submit
								</Button>
							</Form>
						)}
					</Col>
					<Col></Col>
				</Row>
			</Container>
		</div>
	)
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

export default SignUp
