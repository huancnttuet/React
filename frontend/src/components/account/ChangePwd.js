import React, { useState } from 'react'
import TopPage from '../TopPage'
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
import { connect } from 'react-redux'
import PopUp from '../utils/PopUp'

function ChangePwd(props) {
	const pwd = useFormInput('')
	const newPwd = useFormInput('')
	const reNewPwd = useFormInput('')
	const [message, setMessage] = useState('')
	const [loading, setLoading] = useState(false)
	const [popUp, setPopUp] = useState(false)
	const [success, setSuccess] = useState(false)
	console.log(props)
	function handleClick() {
		if (pwd.value === '') {
			setMessage('Chưa nhập password')
		} else {
			if (newPwd.value === '') {
				setMessage('Chưa nhập New password')
			} else {
				if (newPwd.value !== reNewPwd.value) {
					setMessage('password không khớp nhau')
				} else {
					var data = {
						id: props.id,
						pwd: pwd.value,
						pwdNew: newPwd.value
					}
					console.log(data)
					setLoading(true)
					axios
						.post('http://localhost:8080/users/changepwd', { data })
						.then((res) => {
							setLoading(false)
							console.log(res.data)
							setMessage(res.data.message)
							if (res.data.status === 'Success') {
								setSuccess(true)
							} else {
								setSuccess(false)
							}
							setPopUp(true)
						})
				}
			}
		}
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
								<Form.Group controlId='formBasicChangePwd' {...pwd}>
									<Form.Label>Password</Form.Label>
									<Form.Control type='password' placeholder='Enter password' />
								</Form.Group>

								<Form.Group controlId='formBasicPassword1' {...newPwd}>
									<Form.Label>New Password</Form.Label>
									<Form.Control
										type='password'
										placeholder='Enter new password'
									/>
								</Form.Group>

								<Form.Group controlId='formBasicPassword2' {...reNewPwd}>
									<Form.Label>Re-New Password</Form.Label>
									<Form.Control
										type='password'
										placeholder='Enter re-password'
									/>
								</Form.Group>

								<Button variant='primary' onClick={handleClick}>
									Submit
								</Button>
								{message ? <Alert variant='warning'>{message}</Alert> : ''}
								<PopUp
									show={popUp}
									onHide={() => setPopUp(false)}
									message={message}
									title={
										success
											? 'Thao tác đã được thực hiện thành công'
											: 'Có lỗi xảy ra'
									}
								/>
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

const mapStateToProps = (state) => ({
	id: state.id
})

export default connect(mapStateToProps)(ChangePwd)
