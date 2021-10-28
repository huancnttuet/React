import React from 'react';
import SignIn from './SignIn'
import {useGlobal} from 'reactn'

function Home(props) {
  const [state, setState] = useGlobal('state')
  console.log(state);
  if(state.authenticate === true || state.authenticate === 'true'){
    return(
      <div>
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


export default Home
