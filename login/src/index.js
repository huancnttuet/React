import React from 'react';
import ReactDOM from 'react-dom';
import './components/css/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import {createStore} from  'redux';
import {Provider} from 'react-redux';



if(typeof localStorage.getItem("authenticate") === 'undefined'){
  localStorage.setItem("authenticate",false)
  localStorage.setItem("id",0)
} else {
  var timeLimit = 1000000; // Reset when storage is more than timeLimit
  var now = new Date().getTime();
  var setupTime = localStorage.getItem('setupTime');
  if (setupTime == null) {
      localStorage.setItem('setupTime', now)
  } else {
      if(now-setupTime > timeLimit) {
          localStorage.clear()
          localStorage.setItem('setupTime', now);
      }
  }
}

var initial =  {
  authenticate: localStorage.getItem("authenticate"),
  id : localStorage.getItem("id")
}

const rootReducer = (state = initial ,action ) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem("authenticate",true)
      localStorage.setItem("id", action.payload)
      return { authenticate: true , id: action.payload}
      
    case 'LOGOUT':
      localStorage.clear()
     return { authenticate: false , id: 0}
    default:
      return state
  }
}


const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
