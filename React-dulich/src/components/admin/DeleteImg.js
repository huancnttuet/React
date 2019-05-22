import React from 'react';
import { MDBBtn } from "mdbreact"
import axios from 'axios'

function DeleteImg(props) {
const id_tour = props.id
function handleClick() {
  axios.post('http://localhost:8000/deleteImg', {id: id_tour, path: props.path}).then((req) => {
    console.log(req);
    props.callback()
  })
}


  return (
    <div>
      <MDBBtn style={{marginTop:'25px'}} gradient="peach" size='sm' onClick={handleClick}>Xóa</MDBBtn>
    </div>
  )
}

export default DeleteImg
