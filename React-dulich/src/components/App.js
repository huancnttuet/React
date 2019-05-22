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
import AddImage from './admin/AddImage'
import FindTour from './tour/FindTour'
import ManagerOrder from './admin/ManagerOrder'
import OrderDetail from './admin/order/OrderDetail'
import {connect} from 'react-redux'

function App(props) {

  var pathChangePwd = `/changepwd/${props.id}`
  return (
    <Router >
       <div style={{fontSize:'22px'}}>
         <div >
           <TopPage type={props.authenticate} level={props.level}/>
           <Route path="/weather" component={Weather} />
           <Route path="/signin" component={SignIn} />
           <Route path="/signup" component={SignUp} />
           <Route path={pathChangePwd} component={ChangePwd} />
           <Route path="/forgottenacc" component={ForgottenAcc} />

           <Route path='/home' component={Content} />
           <Route path="/tour/:id" component={ListTour} />
           <Route path="/detail/:id" component={DetailTour} />
           <Route path="/find/:data" component={FindTour} />

           <Route path="/manager" component={Manager} />
           <Route path="/diadiem/:id" component={ManagerTour} />
           <Route path="/img/:id" component={AddImage} />
           <Route path="/order" component={ManagerOrder} />
           <Route path="/orderdetail/:id" component={OrderDetail} />
         </div>
       </div>
     </Router>
  );
}

const mapStateToProps = state => ({
  id : state.id,
  authenticate : state.authenticate,
  level: state.level
})

export default connect(mapStateToProps)(App);
