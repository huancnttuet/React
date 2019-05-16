import React from 'react';
import SlideShow from './SlideShow'
import BoxFind from './BoxFind'
import ListBoxImg from './ListBoxImg'

function Content(props) {
  return (
    <div>

      <SlideShow />
      <BoxFind />
      <ListBoxImg number='12'/>
    </div>
  )
}

export default Content
