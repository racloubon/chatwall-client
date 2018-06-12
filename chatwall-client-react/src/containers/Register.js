import React, { Component } from 'react';
import { connect } from 'react-redux';
import RegisterForm from '../components/RegisterForm';
import { Alert } from 'antd';
import { Redirect } from 'react-router';
import host from '../config/host';

import './Register.css';

class Register extends Component {

  checkRegisterValues = (values) => {
    fetch(host + '/users',
    {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(res => {
      if(res.jwt_token) {
        this.props.loginSuccessfull(res.jwt_token, res.username)
      } else {
        this.props.loginError('This user already exists');
        if (res.errors) {
          this.props.loginError(res.errors);
        }
      }
    });
  }
  renderError() {
    if (this.props.loginState.error) {
      return <Alert message={this.props.loginState.error} type="error" showIcon />
    }
  }
  render () {
    if(this.props.loginState.logged) return <Redirect to='/main'/>

    return (
        <div className="registerContainer">
          <h2 className="registerTitle">Register now!</h2>
          <div className="testdiv">          <RegisterForm registerSubmit={this.checkRegisterValues} errors={this.props.loginState.errors}/>
</div>
          {this.renderError()}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
