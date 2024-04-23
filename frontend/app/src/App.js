import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './Home';
import Expenses from './Expenses';

class App extends Component {
  state = {  }
  render() { 
    return ( 
      <Router>
        <Switch>
          <Route path = "/" exact = {true} component = {Home}/>
          <Route path = "/expenses" exact = {true} component = {Expenses}/>
        </Switch>
      </Router>
     );
  }
}
 
export default App;