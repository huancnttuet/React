import React, {useGlobal, useDispatch, useReducer, createContext} from 'reactn';
import './css/App.css';

import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Home'
import SignIn from './SignIn'
import SignUp from './SignUp'
import ChangePwd from './ChangePwd'
import ForgottenAcc from './ForgottenAcc'
import Context from './Context'


function App(props) {
  const [global, setGlobal] = useGlobal()
  const reducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN':
        localStorage.setItem('authenticate', true)
        localStorage.setItem('id', action.payload)
        setGlobal({authenticate: true, id: action.payload})
        return {authenticate: true, id: action.payload}
      case 'LOGOUT':
        localStorage.setItem('authenticate', false)
        localStorage.setItem('id', 0)
        setGlobal({authenticate: false, id: 0})
        return {authenticate: false, id: 0}
      default:
        return state
    }
  }

  const contextValue = useReducer(reducer, global)

  var pathHome = `/${global.id}`
  var pathChangePwd = `${pathHome}/changepwd`
  console.log(pathHome);
  return (
    <Router>
       <Context.Provider value={contextValue}>

         <div >
           <Route exact path="/" component={SignIn} />
           <Route exact path={pathHome} component={Home} />

           <Route path="/signup" component={SignUp} />
           <Route path={pathChangePwd} component={ChangePwd} />
           <Route path="/forgottenacc" component={ForgottenAcc} />
         </div>
         </Context.Provider>
     </Router>
  );
}


export default App;
