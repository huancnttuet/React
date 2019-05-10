import React from 'react';
import SignIn from './SignIn'
import TopPage from './TopPage'
import {connect} from 'react-redux'


function Home(props) {
  console.log(props);
  if(props.authenticate === 'true'){
    return(
      <div>
        <TopPage type='logout' />
        MyHome
      </div>
      )
  }
  else{
    return(
      <div>

        <SignIn />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  authenticate: state.authenticate,
  id: state.id
})

export default connect(mapStateToProps)(Home)
