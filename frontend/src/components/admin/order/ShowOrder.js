import React, {useState} from 'react';
import axios from 'axios'
import { MDBDataTable, MDBContainer, MDB } from 'mdbreact';

function ShowOrder(props) {
  const [once, setOnce] = useState(false)
  const data2 = {
    columns: [
      {
        label: 'id_order',
        field: 'id_order',
        sort: 'asc',
        width: 5
      },
      {
        label: 'Email',
        field: 'email',
        sort: 'asc',
        width: 8
      },
      {
        label: 'Họ và tên',
        field: 'hovaten',
        sort: 'asc',
        width: 27
      },
      {
        label: 'id_tour',
        field: 'id_tour',
        sort: 'asc',
        width: 27
      },
      {
        label: 'Trạng thái',
        field: 'trangthai',
        sort: 'asc',
        width: 27
      },
      {
        label: 'Ngày order',
        field: 'created_at',
        sort: 'asc',
        width: 27
      },
      {
        label: 'Ngày sửa',
        field: 'updated_at',
        sort: 'asc',
        width: 27
      },
    ],
    rows: []
  }
  const [data, setData] = useState(data2)

  if(!once) {
    axios.get('http://localhost:8000/getAllOrder' ).then((req) => {
      console.log(req.data.list);
      req.data.list.map((value, index) => {
        data.rows.push({
          id_order: <a href={`http://localhost:3000/orderdetail/${value.id_order}`}>{value.id_order}</a>,
          email: <a href={`http://localhost:3000/orderdetail/${value.id_order}`}>{value.email}</a>,
          hovaten: <a href={`http://localhost:3000/orderdetail/${value.id_order}`}>{value.hovaten}</a>,
          id_tour: <a href={`http://localhost:3000/orderdetail/${value.id_order}`}>{value.id_tour}</a>,
          trangthai: <a href={`http://localhost:3000/orderdetail/${value.id_order}`}>{value.trangthai}</a>,
          created_at: value.created_at,
          updated_at: value.updated_at
        })
      })
      console.log(data);
      setData(data)
      setOnce(true)
    })
  } else {
    return (
      <div>
      <h3>Tất cả các order</h3>
      <MDBContainer>
      <MDBDataTable striped bordered data={data}  style={{textAlign:'center'}}/>
      </MDBContainer>
      </div>
    )
  }
return (<div></div>)

}

export default ShowOrder
