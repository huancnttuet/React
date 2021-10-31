import { Button, Modal } from 'react-bootstrap'
function PopUp(props) {
	console.log(props)
	return (
		<Modal
			{...props}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					{props.title}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>{props.message}</p>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide}>Đóng</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default PopUp
