import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import NotLoggedError from '../components/NotLoggedError';
import MessageList from '../components/MessageList';
import host from '../config/host';


class Channel extends Component {

  getMessages = () => {
    if (!this.props.loginState.logged) return;
    fetch(host + '/messages?channel=test channel1',
    {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.props.loginState.jwt_token
      }
    })
    .then(data => data.json())
    .then(res => {
      console.log(res);
      this.props.setMessages('test channel1', res.messages)
    })
    .catch(err => console.log(err));
  }

  render () {
    if(!this.props.messages.channel) return <Redirect to='/main'/>

    return (
      <div>
        <MessageList messages={this.props.messages.messages}/>
        <br/>
        <NotLoggedError logged={this.props.loginState.logged}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  messages: state.messages,
  loginState: state.login
});

const mapDispatchToProps = (dispatch) => ({
  setMessages: (channel, messages) => dispatch({
    type: 'SET_MESSAGES',
    channel,
    messages
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
