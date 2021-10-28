import React, {useState} from 'react';
import { MDBInput, MDBContainer, MDBCol, MDBRow, MDBBtn, MDBBadge } from "mdbreact";
import axios from 'axios'

function OrderDetail(props) {
  var id = props.match.params.id
  const [once, setOnce] = useState(false)
  const [data, setData] = useState({
    id_order: null,
    id_tour: null,
    email: '',
    hovaten: '',
    trangthai: '',
    created_at:'',
    updated_at: ''
  })
  const [id_tour, setId_tour] = useState(null)
  const [email, setEmail] = useState('')
  const [hovaten, setHovaten] = useState('')
  const [trangthai, setTrangthai] = useState('')
  if(!once) {
    axios.post('http://localhost:8000/getOneOrder', {id: id}).then((req) => {
      console.log(req.data.result);
      setData(req.data.result)
      setId_tour(req.data.result.id_tour)
      setEmail(req.data.result.email)
      setHovaten(req.data.result.hovaten)
      setTrangthai(req.data.result.trangthai)
    })
    setOnce(true)
  }


  const [message, setMessage] = useState('')
  function handleClick() {
    axios.post('http://localhost:8000/updateOrder', {id_order: data.id_order, id_tour: id_tour, email: email, hovaten: hovaten, trangthai: trangthai}).then((req) => {
      console.log(req.data);
      if(req.data.result){
        setMessage('Sửa thành công')
      } else {
        setMessage('Có lỗi xảy ra')
      }
    })
  }

  function handleChange1(e) {
    setId_tour(e.target.value)
  }
  function handleChange2(e) {
    setEmail(e.target.value)
  }
  function handleChange3(e) {
    setHovaten(e.target.value)
  }

  function handleChange4(e) {
    setTrangthai(e.target.value)
  }
  return (
    <MDBContainer style={{marginTop:'33px'}}>
      <MDBRow style={{marginLeft:'500px', marginBottom:'20px'}}>
        <MDBBadge pill color="warning">Sửa</MDBBadge>
      </MDBRow>
      <MDBRow style={{marginBottom:'20px'}}>
        <MDBCol style={{ textAlign:'right'}}>Id_tour:</MDBCol>
        <MDBCol>
          <input type='number' placeholder={data.id_tour} size='10' onChange={handleChange1}/>
        </MDBCol>
        <MDBCol>
        </MDBCol>
      </MDBRow>
      <MDBRow style={{marginBottom:'20px'}}>
        <MDBCol style={{ textAlign:'right'}} >
          Email:
        </MDBCol>
        <MDBCol>
          <input type='text' placeholder={data.email} size='25' onChange={handleChange2}/>
        </MDBCol>
        <MDBCol>
        </MDBCol>
      </MDBRow>
      <MDBRow style={{marginBottom:'20px'}}>
        <MDBCol style={{ textAlign:'right'}}>
          Họ và tên:
        </MDBCol>
        <MDBCol>
          <input type='text' placeholder={data.hovaten} size='25' onChange={handleChange3}/>
        </MDBCol>
        <MDBCol>
        </MDBCol>
      </MDBRow>
      <MDBRow style={{marginBottom:'20px'}}>
        <MDBCol style={{ textAlign:'right'}}>
          Trạng thái:
        </MDBCol>
        <MDBCol>
          <input type='text' placeholder={data.trangthai} size='25' onChange={handleChange4}/>
        </MDBCol>
        <MDBCol>
        </MDBCol>
      </MDBRow>
      <MDBRow style={{marginBottom:'20px'}}>

        <MDBCol style={{textAlign:'right'}}>
          <MDBBtn gradient='aqua' onClick={handleClick}> Sửa </MDBBtn>
        </MDBCol>
        <MDBCol>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

function useFormInput(initial){
  const [value, setValue] = useState(initial)

  function handleChange(e){
    setValue(e.target.value)
  }

  return {
    value,
    onChange: handleChange
  }
}

export default OrderDetail
