import React, {useState} from 'react';
import {Container,Col,Row,Form, Button, Card} from 'react-bootstrap'
import Clock from 'react-live-clock'
import axios from 'axios'

const styleBackground = {
  backgroundImage: `url('/img/anhbia.jpg')`,
  textAlign: 'center',
  height: 350
}


function BoxFind() {
  const [find, setFind] = useState()
  const [path, setPath] = useState()

  function handleChange(e) {
    setFind(e.target.value)
  }
  function handleClick() {

  }
  return (
      <div>
        <div style={styleBackground}>
            <div style={{paddingTop:'48px', color:'white'}}>
              <h3>Bạn muốn đi du lịch ở đâu?</h3>
            </div>
            <Form.Control type="text" placeholder="Nhập địa danh" style={{width:500,marginLeft:500}} onChange={handleChange}/>
            <Form.Text  style={{color:'#9F7E7E', fontSize:'15px'}}>
              Mọi thứ về du lịch bạn có thể tìm thấy ở đây
            </Form.Text>

          <a href={`/find/${find}`}>
            <Button variant="primary" type="submit" onClick={handleClick}>
              Tìm kiếm
            </Button>
          </a>
        </div>
      </div>

  )
}

export default BoxFind
