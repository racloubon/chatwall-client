import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import LoginForm from '../components/LoginForm';
import Username from  '../components/Username';
import btoa from 'btoa';
import mapDispatchToProps from '../mapDispatchToProps';
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
      if(err.toString().includes('SyntaxError:'))
        this.props.loginError('Bad user/password');
      else
        this.props.loginError(err.toString());
      // this.props.loginError('Somthing went wrong')
    });
  }

  logOut = () => {
    this.props.logOut();
    this.props.unSetMessages();
  }

  render () {
    console.log(this.props);
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
}


const mapStateToProps = (state) => ({
  loginState: state.login,
  messages: state.messages
});


export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
