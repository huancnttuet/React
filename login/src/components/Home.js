import React from 'react';
import SignIn from './SignIn'
import TopPage from './TopPage'
import {useGlobal} from 'reactn'


function Home(props) {
  const [global, setGlobal] = useGlobal()
  console.log(global);
  if(global.state.authenticate){
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
