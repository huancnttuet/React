import React from 'react';
import Content from './tour/Content'

import {connect} from 'react-redux'


function Home(props) {
  console.log(props);
  if(props.authenticate === 'true'){
    return(
      <div>
        MyHome

      </div>
      )
  }
  else{
    return(
      <div>

        <Content />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  authenticate: state.authenticate,
  id: state.id
})

export default connect(mapStateToProps)(Home)
