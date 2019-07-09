import React from "reactn";
import ReactDOM from "react-dom";
import "./components/css/index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

if (
  localStorage.getItem("authenticate") === null ||
  localStorage.getItem("id") === null
) {
  localStorage.setItem("authenticate", false);
  localStorage.setItem("id", 0);
}

console.log(localStorage);

var timeLimit = 50000; // Reset when storage is more than timeLimit
var now = new Date().getTime();
var setupTime = localStorage.getItem("setupTime");
if (setupTime == null) {
  localStorage.setItem("setupTime", now);
} else {
  if (now - setupTime > timeLimit) {
    localStorage.setItem("authenticate", false);
    localStorage.setItem("id", 0);
    localStorage.setItem("setupTime", now);
  }
}

ReactDOM.render(
  <App />,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
