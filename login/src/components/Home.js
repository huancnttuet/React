import React, {useState} from 'react';
import SignIn from './SignIn'
import TopPage from './TopPage'
import {connect} from 'react-redux'


function Home(props) {
  console.log(props);
  if(props.authenticate)
    return(
      <div>
        <TopPage />
        MyHome
      </div>
      )
  else
    return(
      <div>
        <SignIn />
      </div>
    )
}

const mapStateToProps = state => ({
  authenticate: state.authenticate
})

export default connect(mapStateToProps)(Home)
