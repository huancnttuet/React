import React,{useState} from 'react';
import {Modal, Button} from 'react-bootstrap'
import axios from 'axios'

function AddMyVerticallyCenteredModal(props) {
  const [choosed, setChoosed] = useState({
    diadiem: '',
    imgKey: '',
  })
  const [file, setFile] = useState({name:''})


  function handleClick() {

    const formData = new FormData()
    formData.append('foo', file)
    console.log(file);
    axios.post("http://localhost:8000/uploadimg", formData,{

    }).then((req) => {
      console.log(req);
    })
    axios.post("http://localhost:8000/insert", {data: choosed, table:'diadiem'}).then((req) => {
      console.log(req);
    })
    props.callbackFromParent({once: false})
  }
  function handleChange1(e) {
    setChoosed({
      diadiem: e.target.value,
      imgKey: '/img/' + file.name
    })

  }
  function handleChange2(e) {
    setFile(e.target.files[0])
    setChoosed({
      diadiem: choosed.diadiem,
      imgKey: '/img/' + e.target.files[0].name
    })
  }
  return(
    <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Thêm
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Địa điểm</label>
          <input type='text'  onChange={handleChange1} />
          <label>Ảnh</label>
          <input type='file' name='foo' onChange={handleChange2} />

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClick} >OK</Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
  )
}
export default AddMyVerticallyCenteredModal
