import React from 'react';
import SlideShow from './content/SlideShow'
import BoxFind from './content/BoxFind'
import ListBoxImg from './content/ListBoxImg'

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
