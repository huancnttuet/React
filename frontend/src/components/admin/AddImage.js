import React, {useState} from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact"
import DeleteImg from './DeleteImg'
import axios from 'axios'

function AddImage(props) {
  const id = props.match.params.id
  const [file, setFile] = useState([])
  const [once, setOnce] = useState(false)
  const [pathImg, setPathImg] = useState([])
  var arr = []
  if(!once){
    axios.post(`${process.env.API}/createFolder`, {id: id}).then((req) => {
      console.log(req);
    })
    setOnce(true)
    axios.post(`${process.env.API}/showImg`, {id:id}).then((req) => {
      console.log(req.data);
      setPathImg(req.data.listImg)
    })
  }



  function handleChange(e) {
    console.log(e.target.files);
    setFile(e.target.files)
  }

  function handleClick() {
    setOnce(false)
    const data = new FormData()
    for (var i = 0; i < file.length; i++) {
      data.append('foo', file[i])
      arr.push(file[i].name)
    }
    console.log(data);
    console.log(file);
    axios.post(`${process.env.API}/pathImg`, {path: arr, id: id}).then((req) => {
      console.log(req);
      setOnce(false)
    })
    axios.post(`${process.env.API}/uploadimgs`, data, {}).then((req) => {
      console.log(req);
      setOnce(false)
    })
  }

  const callback = () => {
    setOnce(false)
  }

  return (
    <div>
    <MDBContainer className="mt-5">
      <h3>Ảnh</h3>
      <MDBRow>
        <MDBCol>
          <MDBInput type='file' name='foo' multiple onChange={handleChange}/>
        </MDBCol>
        <MDBCol><MDBBtn style={{marginTop:'25px'}} gradient="aqua" onClick={handleClick}>Thêm</MDBBtn></MDBCol>
        <MDBCol></MDBCol>
      </MDBRow>
      <MDBRow>
        {pathImg.map((value, index) => {
          return (
            <MDBCol lg="4" md="12" className="mb-4">
              <img src={value.path} className="img-fluid z-depth-1" alt={value.path} />
              {value.id_img}
              <DeleteImg id={value.id_img} callback={callback} path={value.path}/>
            </MDBCol>
          )
        })}
      </MDBRow>

    </MDBContainer>

    </div>
  )

}

export default AddImage
