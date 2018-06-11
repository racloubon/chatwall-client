import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import mapDispatchToProps from './mapDispatchToProps';

import Main from './containers/Main';
import NoMatch from './components/NoMatch';
import CreateChannelButton from './components/CreateChannelButton';
import ExitChannelButton from './components/ExitChannelButton';
import LogIn from './containers/LogIn';
import Register from './containers/Register';
import Channel from './containers/Channel';
import ShowChannel from './containers/ShowChannel';

require('dotenv').config();

class App extends Component {
  onExitChannelClick = () => {
    this.props.unSetMessages();
  }
  render () {
    return (
      <Router>
        <div className="App">
          <div className="navbar">
            <div className="chatWallTitle">ChatWall</div>
            <ExitChannelButton channel={this.props.messages.channel} onExitChannelClick={this.onExitChannelClick}/>
            <LogIn />
            {/* <ChannelNav/> */}
          </div>
          <div className="switchContainer">
            <Switch>
              <Route exact path='/' component={Register}/>
              <Route path='/main' component={Main}/>
              {/* <Route path='/main' render={props => <Intro logged={this.props.loginState.logged} {...props} />}/> */}
              <Route path='/channel' component={Channel}/>
              <Route path='/showchannel' component={ShowChannel}/>
              <Route path='/createchannel' component={CreateChannelButton}/>
              <Route component={NoMatch}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  loginState: state.login,
  messages: state.messages
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
