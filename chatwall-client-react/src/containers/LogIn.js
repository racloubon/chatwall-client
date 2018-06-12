import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginForm from '../components/LoginForm';
import Username from  '../components/Username';
import RenderError from '../components/RenderError';
import btoa from 'btoa';
import mapDispatchToProps from '../mapDispatchToProps';
import { Redirect } from 'react-router';
import host from '../config/host';

class LogIn extends Component {
  constructor (props) {
    super(props);
    this.checkLogin = this.checkLogin.bind(this);
  }

  checkLogin (values) {
    fetch(host + '/sign-in',
    {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + btoa(values.userName + ':' + values.password)
      }
    })
    .then(data => data.json())
    .then(res => {
      if(res.jwt_token) {
        this.props.loginSuccessfull(res.jwt_token, res.username)
      } else {
        this.props.loginError(res.errors[0])
      }
    })
    .catch(err => {
      this.props.loginError(err.toString())
    });
  }

  logOut = () => {
    this.props.logOut();
    this.props.unSetMessages();
  }

  renderLoginState = () => {
    if (!this.props.loginState.logged) {
      return (
        <div>
          <LoginForm loginSubmit={this.checkLogin}/>
          <Redirect to='/'/>
        </div>
      );
    } else {
      return (
        <div>
          <Username username={this.props.loginState.username} logOutClick={this.logOut}/>
        </div>
      );
    }
  }

  render () {
    return (
      this.renderLoginState()
    );
  }
}


const mapStateToProps = (state) => ({
  loginState: state.login,
  messages: state.messages
});


export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
