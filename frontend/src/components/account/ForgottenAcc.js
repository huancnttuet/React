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
import TopPage from '../../views/TopPage'
import PopUp from '../utils/PopUp'

function ForgottenAcc(props) {
	const emailFA = useFormInput('')

	const [stateFA, setStateFA] = useState('')
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(false)
	const [popUp, setPopUp] = useState(false)
	function handleClick() {
		var data = {
			emailFA: emailFA.value
		}
		setLoading(true)
		axios
			.post('http://localhost:8080/users/forgottenacc', { data })
			.then((res) => {
				setLoading(false)
				setStateFA(res.data.message)

				if (res.data.status === 'Success') {
					setSuccess(true)
					setStateFA('Đổi mật khẩu thành công')
				} else {
					setSuccess(false)
				}
				setPopUp(true)
			})
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
									<Form.Group as={Col} controlId='emailFA' {...emailFA}>
										<Form.Label>Email</Form.Label>
										<Form.Control type='email' placeholder='Enter email' />
									</Form.Group>
								</Form.Row>

								{stateFA ? <Alert variant='warning' style={{ fontSize: '14px' }}>{stateFA}</Alert> : ''}
								<PopUp
									show={popUp}
									onHide={() => setPopUp(false)}
									message={stateFA}
									title={
										success
											? 'Thao tác đã được thực hiện thành công'
											: 'Có lỗi xảy ra'
									}
								/>
								<Button variant='primary' onClick={handleClick}>
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

export default ForgottenAcc
