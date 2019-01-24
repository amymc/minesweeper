import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './Main/App.view.logic.js'
import * as serviceWorker from './serviceWorker'
import { AppProvider } from './App.context.js'

ReactDOM.render(
  <React.Suspense fallback={<div>LOADING</div>}>
    <AppProvider>
      <App />
    </AppProvider>
  </React.Suspense>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
