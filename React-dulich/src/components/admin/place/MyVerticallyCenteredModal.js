import React,{useState} from 'react';
import {Modal, Button, Image} from 'react-bootstrap'
import axios from 'axios'

function MyVerticallyCenteredModal(props) {
  const [choosed, setChoosed] = useState({
    id: props.choose.id,
    diadiem: props.choose.diadiem,
    imgKey: props.choose.imgKey
  })
  const [file, setFile] = useState({name:''})
  const [del, setDel] = useState(false)
  const [imgAccess, setImgAccess] = useState(false)
  function handleClick() {
    if(imgAccess){
      const formData = new FormData()
      formData.append('foo', file)
      console.log(file);
      axios.post("http://localhost:8000/uploadimg", formData,{

      }).then((req) => {
        console.log(req);
      })
      console.log(choosed);
      axios.post("http://localhost:8000/update", {data: choosed, del: true, fileName: file.name}).then((req) => {
        console.log(req);
        props.callback(req.message)
        setImgAccess(false)
      })
    } else {
      axios.post("http://localhost:8000/update", {data: choosed, del: false}).then((req) => {
        console.log(req);
        props.callback(req.message)
      })
    }

  }
  function handleChange1(e) {
    setChoosed({
      id: props.choose.id,
      diadiem: e.target.value,
      imgKey: props.choose.imgKey
    })

  }
  function handleChange2(e) {
    setImgAccess(true)
    setFile(e.target.files[0])
    setChoosed({
      id: props.choose.id,
      diadiem: props.choose.diadiem,
      imgKey: props.choose.imgKey
    })
    setDel(true)

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
            Sửa
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Địa điểm</label>
          <input type='text' placeholder={props.choose.diadiem} onChange={handleChange1} />
          <label>Ảnh</label>
          <img src={props.choose.imgKey} style={{height:150,width:150}} />
          <input type='file' name='foo' onChange={handleChange2} />

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClick}>OK</Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
  )
}
export default MyVerticallyCenteredModal
