import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom'
import Register from 'containers/Register'
import Success from 'containers/Success'
import Error from 'containers/Error'

const App = () => (
  <Router>
    <Route path="/register" component={Register} />
    <Route path="/success" component={Success} />
    <Route path="/error" component={Error} />
    <Redirect from="/" to="/register" />
  </Router>
)

export default App