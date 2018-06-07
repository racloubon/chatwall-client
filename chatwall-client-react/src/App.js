import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Intro from './components/Intro';
import NoMatch from './components/NoMatch';
import Test from './components/Test';
import LogIn from './containers/LogIn';
import Register from './containers/Register';

class App extends Component {
  render () {
    return (
      <div className="App">
        <div className="navbar">
          <div className="chatWallTitle">ChatWall</div>
          <LogIn/>
        </div>
        <div className="switchContainer">
          <Switch>
            <Route exact path='/' component={Intro}/>
            <Route path='/test' component={Test}/>
            <Route path='/register' component={Register}/>
            <Route component={NoMatch}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
