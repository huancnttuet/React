import React from 'react';
import './css/App.css';

import TopPage from './TopPage'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Home'
import SignIn from './SignIn'
import SignUp from './SignUp'
import ChangePwd from './ChangePwd'
import ForgottenAcc from './ForgottenAcc'
import {connect} from 'react-redux'

function App(props) {
  var pathHome = `/${props.id}`
  var pathChangePwd = `${pathHome}/changepwd`
  return (
    <Router>
       <div>
         <div >
           <Route exact path="/" component={SignIn} />
           <Route exact path={pathHome} component={Home} />

           <Route path="/signup" component={SignUp} />
           <Route path={pathChangePwd} component={ChangePwd} />
           <Route path="/forgottenacc" component={ForgottenAcc} />
         </div>
       </div>
     </Router>
  );
}

const mapStateToProps = state => ({
  id : state.id
})

export default connect(mapStateToProps)(App);
