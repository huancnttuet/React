import React, { useReducer, setGlobal, useGlobal } from "reactn";
import "./css/App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ChangePwd from "./ChangePwd";
import ForgottenAcc from "./ForgottenAcc";

import TopPage from "./TopPage";

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "LOGIN":
//       localStorage.setItem("authenticate", true);
//       localStorage.setItem("id", action.payload);
//       return { authenticate: true, id: action.payload };
//     case "LOGOUT":
//       localStorage.setItem("authenticate", false);
//       localStorage.setItem("id", 0);
//       return { authenticate: false, id: 0 };
//     default:
//       return state;
//   }
// };

setGlobal({
  authenticate: false,
  id: 0
});

function App(props) {
  // const [state, dispatch] = useReducer(reducer, {
  //   authenticate: localStorage.getItem("authenticate"),
  //   id: localStorage.getItem("id")
  // });

  const [id] = useGlobal("id");

  // var pathHome;
  // if (id === 0) {
  //   pathHome = "/";
  // } else {
  //   pathHome = `/${id}`;
  // }

  console.log(id);

  return (
    <Router>
      <TopPage />
      <div>
        {/* <Route exact path={pathHome} component={Home} /> */}
        <Route exact path="/" component={props => <SignIn {...props} />} />
        <Route path="/signup" component={SignUp} />
        <Route path="/changepwd" component={ChangePwd} />
        <Route path="/forgottenacc" component={ForgottenAcc} />
      </div>
    </Router>
  );
}

export default App;
