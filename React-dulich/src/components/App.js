import React from 'react';
import './css/App.css';


import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Home'
import SignIn from './account/SignIn'
import SignUp from './account/SignUp'
import ChangePwd from './account/ChangePwd'
import ForgottenAcc from './account/ForgottenAcc'
import ListTour from './tour/ListTour'
import DetailTour from './tour/DetailTour'
import TopPage from './TopPage'
import Content from './tour/Content'
import Weather from './weather/Weather'
import Manager from './admin/Manager'
import ManagerTour from './admin/ManagerTour'

import {connect} from 'react-redux'

function App(props) {
  var pathHome
  if(props.id === null){
    pathHome = '/home'
  }else{
    pathHome = `/home/${props.id}`
  }
  var pathChangePwd = `${pathHome}/changepwd`
  return (
    <Router>
       <div>
         <div >
           <TopPage type={props.authenticate}/>
           <Route path="/weather" component={Weather} />
           <Route path="/signin" component={SignIn} />
           <Route path="/signup" component={SignUp} />
           <Route path={pathChangePwd} component={ChangePwd} />
           <Route path="/forgottenacc" component={ForgottenAcc} />

           <Route path={pathHome} component={Content} />
           <Route path="/tour/:id" component={ListTour} />
           <Route path="/detail/:id" component={DetailTour} />

           <Route path="/manager" component={Manager} />
           <Route path="/diadiem/:id" component={ManagerTour} />
         </div>
       </div>
     </Router>
  );
}

const mapStateToProps = state => ({
  id : state.id,
  authenticate : state.authenticate
})

export default connect(mapStateToProps)(App);
