import React from 'react';
import './css/App.css';

import TopPage from './TopPage'
import { BrowserRouter, Route, Link } from "react-router-dom";
import Home from './Home'
import SignIn from './SignIn'
import SignUp from './SignUp'

function App() {
  return (
    <BrowserRouter>
       <div>
         <ul>
           <li>
             <Link to="/">Home</Link>
           </li>
           <li>
             <Link to="/">Signin</Link>
           </li>
           <li>
             <Link to="/signup">Signup</Link>
           </li>
         </ul>

         <hr />
         <div >
           <Route exact path="/" component={Home} />
           
           <Route path="/signup" component={SignUp} />
         </div>
       </div>


     </BrowserRouter>
  );
}

export default App;
