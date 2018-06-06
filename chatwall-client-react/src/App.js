import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Intro from './components/Intro';
import NoMatch from './components/NoMatch';
import Test from './components/Test';

class App extends Component {
  render () {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Intro}/>
          <Route path='/test' component={Test}/>
          <Route component={NoMatch}/>
        </Switch>
      </div>
    );
  }
}

export default App;
