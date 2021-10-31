import React from 'react'
import ReactDOM from 'react-dom'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbreact/dist/css/mdb.css'
import './components/css/index.css'

import App from './views/App'
import * as serviceWorker from './serviceWorker'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers/RootReducer'

if (typeof localStorage.getItem('authenticate') === 'undefined') {
	localStorage.setItem('authenticate', false)
	localStorage.setItem('id', 0)
	localStorage.setItem('level', 0)
} else {
	var timeLimit = 1000000 // Reset when storage is more than timeLimit
	var now = new Date().getTime()
	var setupTime = localStorage.getItem('setupTime')
	if (setupTime == null) {
		localStorage.setItem('setupTime', now)
	} else {
		if (now - setupTime > timeLimit) {
			localStorage.clear()
			localStorage.setItem('setupTime', now)
		}
	}
}

const store = createStore(rootReducer)

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
