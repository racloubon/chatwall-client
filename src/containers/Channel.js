import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapDispatchToProps from '../mapDispatchToProps';
import { Redirect } from 'react-router';

import NotLoggedError from '../components/NotLoggedError';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import host from '../config/host';
import './Channel.css';

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
      this.props.setMessages(this.props.messages.channel, res.messages, 'user')
    })
    .catch(err => console.log(err));
  }

  sendMessage = (message) => {
    const toSend = {
      message,
      channel: this.props.messages.channel
    }
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
      if(res.errors) {
        // console.log('somthing went wrong:',res.errors);

      } else {
        // console.log('response recived from the backend',res);
        this.getMessages();
      }
    })
    .catch(err => console.log(err));
  }

  render () {
    if(!this.props.messages.channel) return <Redirect to='/main'/>
    
    return (
      <div className="messageListContainer">
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

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
