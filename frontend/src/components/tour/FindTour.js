import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { MDBDataTable, MDBContainer, MDB } from 'mdbreact';

function FindTour(props) {
  var data1 = props.match.params.data
  console.log(data1)
  const [once, setOnce] = useState(false)
  const data2 = {
    columns: [
      {
        label: 'Tên Tour',
        field: 'tentour',
        sort: 'asc',
        width: 15
      },
      {
        label: 'Giá',
        field: 'gia',
        sort: 'asc',
        width: 27
      },
    ],
    rows: []
  }
  const [data, setData] = useState(data2)



  if(!once) {
    axios.post('http://localhost:8000/find', {data: data1}).then((req) => {
      console.log(req.data);
      req.data.list.map((value, index) => {
        data.rows.push({tentour: <a href={`http://localhost:3000/detail/${value.id_tour}`}>{value.tentour}</a>, gia: `${value.gia} VNĐ`})
      })
      setData(data)
      console.log(data);
      setOnce(true)
    })
  } else
  return (
    <MDBContainer>
      <MDBDataTable striped bordered data={data}  style={{textAlign:'center'}}/>
    </MDBContainer>
  )

  return (<div></div>)
}

export default FindTour
