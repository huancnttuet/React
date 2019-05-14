import React from 'react';
import SignIn from './SignIn'
import TopPage from './TopPage'
import {useGlobal} from 'reactn'


function Home(props) {
  const [authenticate, setAuthenticate] = useGlobal('authenticate')
  console.log(authenticate);
  if(authenticate === 'true'){
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


export default Home
