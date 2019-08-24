import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom'
import Register from 'containers/Register'

const App = () => (
  <Router>
    <Route path="/register" component={Register} />
    <Redirect from="/" to="/register" />
  </Router>
)

export default App