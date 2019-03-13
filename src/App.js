import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import mapDispatchToProps from './mapDispatchToProps';
import { Redirect } from 'react-router';

import Main from './containers/Main';
import NoMatch from './components/NoMatch';
//import CreateChannelButton from './components/CreateChannelButton';
import ExitChannelButton from './components/ExitChannelButton';
import LogIn from './containers/LogIn';
import Register from './containers/Register';
import Channel from './containers/Channel';
import ShowChannel from './containers/ShowChannel';
import logo from './assets/logo.gif';

class App extends Component {

  constructor(props) {
    super(props),
    this.state = {
      exitChannel: false,
      inChannel: true,
      pin: null,
      toChannel: null
    }
  }

  onExitChannelClick = () => {
    this.setState({exitChannel: true})
  }

  goToChannel = (pin) => {
    this.setState({pin: pin, toChannel: true});
  }

  render () {
    return (
      <Router>
        <div className="App">
          <div className="navbar">
            <div className="chatWallLogoContainer">
              <img src={logo} alt="ChatWall" className="chatWallLogo"></img>
            </div>
            <LogIn />
          </div>

          <div className="switchContainer">
            <Switch>
              <Route exact path='/' component={Register}/>
              <Route path='/main' render={(props) => <Main {...props} goToChannel={this.goToChannel}/>} />
              <Route path='/channel' component={Channel} />

            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  loginState: state.login,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
