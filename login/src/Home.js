import React, {useState} from 'react';
import SignIn from './SignIn'
import TopPage from './TopPage'



function Home(props) {
  const [authenticate, setAuthenticate] = useState(false)
  if(authenticate)
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
export default Home
