import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from '../components/LoginForm2';
// import Username from 
import btoa from 'btoa';

class LogIn extends Component {
  constructor (props) {
    super(props);
    this.checkLogin = this.checkLogin.bind(this);
  }

  checkLogin (values) {
    console.log(values);
    fetch('http://localhost:3000/sign-in',
    {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + btoa(values.userName + ':' + values.password)
      }
    })
    .then(data => data.json())
    .then(res => {
      console.log(res);
      if(res.jwt_token) {
        this.props.loginSuccessfull(res.jwt_token, res.username)
      }
    });
  }

  toggleLoginState = () => {
    this.props.startLogin(!this.props.loginState.logged)
  }

  renderLoginState = () => {
    if (!this.props.loginState.logged) {
      return (
        <div>
          <LoginForm loginSubmit={this.checkLogin}/>
        </div>
      );
    } else {
      return (
        <div>
          <div>You are logged as {this.props.loginState.username}</div>
          <button onClick={this.toggleLoginState}>LogOut</button>
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
  loginState: state.login
});

const mapDispatchToProps = (dispatch) => ({
  startLogin: (logResult) => dispatch({
    type: 'LOGIN_INIT',
    logResult
  }),
  loginSuccessfull: (auth_token, username) => dispatch({
    type: 'LOGIN_SUCCESSFULL',
    auth_token,
    username
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
