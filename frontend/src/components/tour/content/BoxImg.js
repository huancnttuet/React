import React,{useState} from 'react';
import {Card} from 'react-bootstrap'

const styleImgSmall = {
  height: 250,
  width: 250
}

const styleImgText = {
  position: 'relative',
  textAlign: 'center',
  color: 'white',

}

const styleTextonImg={
  position: 'absolute',
  top: '75%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: '#CBF301'
}

function BoxImg(props) {
  const [hover, setHover] = useState(false)
  const [link, setLink] = useState(`tour/${props.id}`)
  var styleHover
  function toggleHover() {
    setHover(!hover)
  }
  if(hover){
    styleHover = {cursor: 'pointer'}
  } else {
    styleHover = {}
  }

  function handleClick() {


  }

  return(
    <div style={{marginTop:'32px'}}>
      <a href={link} onClick={handleClick}>
      <div style={styleHover} onMouseOut={toggleHover} onMouseOver={toggleHover} >
          <Card.Img src={props.pathImg} style={styleImgSmall} />
          <Card.Title style={styleTextonImg}>{props.title}</Card.Title>
      </div>
      </a>
    </div>
  )
}

export default BoxImg
