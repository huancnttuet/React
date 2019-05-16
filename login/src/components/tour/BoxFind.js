import React, {useState, useEffect} from 'react';
import {Container,Col,Row,Form, Button, Card} from 'react-bootstrap'

import axios from 'axios'

const styleBackground = {
  backgroundImage: `url('https://wiki-travel.com.vn/uploads/post/thanhhuong-181911041927-du-lich-anh.jpg')`,
  textAlign: 'center',
  height: 300
}


function BoxFind() {

  return (

    <Container>

        <Form style={styleBackground}>
          <Form.Group controlId="formBasicEmail">
            <h3>Bạn muốn đi du lịch ở đâu?</h3>
            <Form.Control type="email" placeholder="Nhập địa danh" style={{width:500,marginLeft:300}} />
            <Form.Text className="text-muted">
              Mọi thứ về du lịch bạn có thể tìm thấy ở đây
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Tìm kiếm
          </Button>
        </Form>

    </Container>
  )
}

export default BoxFind
