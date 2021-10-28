import React, {useState} from 'react';

import {Carousel} from 'react-bootstrap'

function SlideShow(props) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(null)

  function handleSelect(selectedIndex, e){
    setIndex(selectedIndex)
    setDirection(e.direction)
  }
  var pathImg = props.pathImg

  const styleImgBox = {
    display: 'grid',
    height: '100%'
  }
  const styleCenterFit = {
    width: '750px',
    height: '500px'

  }

  return (
    <div style={styleImgBox}>
      <Carousel
        activeIndex={index}
        direction={direction}
        onSelect={handleSelect}
        style={styleCenterFit}
        >
      {
        pathImg.map((value, index) => {
          console.log(value);
          return(
            <Carousel.Item>
            <img
            className="d-block w-100"
            src={value.path}
            alt="First slide"
            />
            <Carousel.Caption>
            <h3></h3>
            <p>{}</p>
            </Carousel.Caption>
            </Carousel.Item>
          )
        })
      }
      </Carousel>
    </div>
  )



}

export default SlideShow
