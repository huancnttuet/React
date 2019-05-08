import React from 'react';
import './css/App.css';

import TopPage from './TopPage'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './Home'
import SignIn from './SignIn'
import SignUp from './SignUp'

function App() {
  return (
    <Router>
       <div>
         <TopPage />

         <div >
           <Route exact path="/" component={Home} />
           <Route path="/signin/:id" component={SignIn} />
           <Route path="/signup" component={SignUp} />
         </div>
       </div>


     </Router>
  );
}

export default App;
