import React, { Component } from 'react';
import { connect } from 'react-redux';
import RegisterForm from '../components/RegisterForm';
import './Register.css';

class Register extends Component {
  checkRegisterValues = (values) => {
    console.log(values);
    // fetch('http://localhost:3000/users',
    // {
    //   method: 'POST',
    //   body: JSON.stringify(values)
    // })
    // .then(data => data.json())
    // .then(res => {
    //   console.log(res);
    //   if(res.jwt_token) {
    //     this.props.loginSuccessfull(res.jwt_token, res.username)
    //   }
    // });
  }
  render () {
    return (
      <div >
        <h2 className="registerTitle">Register now!</h2>
        <RegisterForm registerSubmit={this.checkRegisterValues}/>
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
  loginSuccessfull: (auth_token, username) => dispatch({
    type: 'LOGIN_SUCCESSFULL',
    auth_token,
    username
  }),
  createUser: () => dispatch ({
    type: 'AHA'
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
