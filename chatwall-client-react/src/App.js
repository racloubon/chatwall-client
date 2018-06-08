import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Main from './containers/Main';
import NoMatch from './components/NoMatch';
import Test from './components/Test';
import CreateChannelButton from './components/CreateChannelButton';
import LogIn from './containers/LogIn';
import Register from './containers/Register';
import Channel from './containers/Channel';

class App extends Component {
  render () {
    return (
      <Router>
        <div className="App">
          <div className="navbar">
            <div className="chatWallTitle">ChatWall</div>
            <LogIn/>
          </div>
          <div className="switchContainer">
            <Switch>
              <Route exact path='/' component={Register}/>
              <Route path='/main' component={Main}/>
              {/* <Route path='/main' render={props => <Intro logged={this.props.loginState.logged} {...props} />}/> */}
              <Route path='/channel' component={Channel}/>
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
  loginState: state.login
});

const mapDispatchToProps = (dispatch) => ({
  startLogin: (logResult) => dispatch({
    type: 'LOGIN_INIT',
    logResult
  }),
  loginSuccessfull: (jwt_token, username) => dispatch({
    type: 'LOGIN_SUCCESSFULL',
    jwt_token,
    username
  }),
  loginError: (error) => dispatch ({
    type: 'LOGIN_ERROR',
    error
  })
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
