import React, {useState} from 'react';

import {Carousel} from 'react-bootstrap'

function SlideShow(props) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(null)

  function handleSelect(selectedIndex, e){
    setIndex(selectedIndex)
    setDirection(e.direction)
  }
  var pathImg = ['/img/5.jpg','/img/6.jpg','/img/7.jpg']

  const styleImgBox = {
    display: 'grid',
    height: '100%'
  }
  const styleCenterFit = {
    maxWidth: '100%',
    maxHeight: '100vh',
    margin: 'auto'
  }

  return (
    <div style={styleImgBox}>
      <Carousel
        activeIndex={index}
        direction={direction}
        onSelect={handleSelect}
        style={styleCenterFit}
        >
        <Carousel.Item>
        <img
        className="d-block w-100"
        src={pathImg[0]}
        alt="First slide"
        />
        <Carousel.Caption>
        <h3>First slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <img
        className="d-block w-100"
        src={pathImg[1]}
        alt="Second slide"
        />

        <Carousel.Caption>
        <h3>Second slide label</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <img
        className="d-block w-100"
        src={pathImg[2]}
        alt="Third slide"
        />

        <Carousel.Caption>
        <h3>Third slide label</h3>
        <p>
        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
        </p>
        </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  )



}

export default SlideShow
