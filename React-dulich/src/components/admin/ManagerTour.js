import React from 'react';
import TourManager from './tour/TourManager'
function ManagerTour(props) {
  return (
    <div>
      <TourManager id={props.match.params.id}/>

    </div>
  )
}

export default ManagerTour
