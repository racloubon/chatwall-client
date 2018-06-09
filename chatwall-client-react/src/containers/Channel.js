import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import NotLoggedError from '../components/NotLoggedError';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import host from '../config/host';

let refreshIntervalId;

class Channel extends Component {
  componentDidMount () {
    refreshIntervalId = setInterval(this.getMessages, 1500);
  }
  componentWillUnmount () {
    clearInterval(refreshIntervalId);
  }

  getMessages = () => {
    if (!this.props.loginState.logged) return;
    fetch(host + '/messages?channel='+this.props.messages.channel,
    {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.props.loginState.jwt_token
      }
    })
    .then(data => data.json())
    .then(res => {
      console.log(res);
      this.props.setMessages(this.props.messages.channel, res.messages)
    })
    .catch(err => console.log(err));
  }

  sendMessage = (message) => {
    console.log(message);
    const toSend = {
      message,
      channel: this.props.messages.channel
    }
    console.log(toSend);
    fetch(host+'/messages',
    {
      method: 'POST',
      body: JSON.stringify(toSend),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.props.loginState.jwt_token
      }
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      if(res.errors) {
        console.log('somthing went wrong:',res.errors);
      } else {
        console.log('response recived from the backend',res);
        this.getMessages();
      }
    })
    .catch(err => console.log(err));
  }

  render () {
    if(!this.props.messages.channel) return <Redirect to='/main'/>
    // this.getMessages();

    return (
      <div>
        <MessageList messages={this.props.messages.messages}/>
        <br/>
        <MessageInput onMessageSubmit={this.sendMessage}/>
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
