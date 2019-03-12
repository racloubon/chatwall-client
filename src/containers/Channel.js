import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapDispatchToProps from '../mapDispatchToProps';
import { Redirect } from 'react-router';

import NotLoggedError from '../components/NotLoggedError';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import ExitChannelButton from '../components/ExitChannelButton';

import host from '../config/host';
import './Channel.css';

class Channel extends Component {

  constructor (props) {
    super(props);
    this.state = {
      messages: [],
      channel: true,
    }
  }

  componentDidMount () {
    this.fetchMessages(this.props.location.state.pin)
  }

  fetchMessages = (pin) => {
    fetch(host + '/messages?pin=' + pin, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.props.loginState.jwt_token
      }
    })
      .then(res => res.json())
      .then(res => this.setState({messages: res.sort((a,b) => b.score - a.score)}))
      .catch(err => {
        this.setState({channel: false});
        console.log('Error fetching messages: ', err);
      })
  }

  sendMessage = (text) => {
    let existingMessages = [...this.state.messages]
    const message = {
      message: text,
      pin: this.props.location.state.pin,
    }
    fetch(host+'/messages',
    {
      method: 'POST',
      body: JSON.stringify(message),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.props.loginState.jwt_token
      }
    })
    .then(res => res.json())
    .then(res => this.setState({messages: existingMessages.concat([res]).sort((a,b) => b.score - a.score)}))
    .catch(err => console.log('Error sending message', err));
  }

  voteMessage = (vote, id) => {
    let existingMessages = [...this.state.messages]
    let voteInfo = {
      id,
      vote
    }
    fetch(host+'/messages',
    {
      method: 'PUT',
      body: JSON.stringify(voteInfo),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.props.loginState.jwt_token
      }
    })
    .then(res => res.json())
    .then(res => this.setState({messages: existingMessages.map(msg => msg.id === id ? res : msg).sort((a,b) => b.score - a.score)}))
    .catch(err => console.log('Error voting for message:', err))
  }

  exitChannel = () => {
    this.setState({channel: false})
  }

  render () {
    if (!this.state.channel) return <Redirect to='/main' />

    console.log(this.props.location.state)
    return (
      <div className="messageListContainer">
        <MessageList messages={this.state.messages} vote={this.voteMessage}/>
        <MessageInput onMessageSubmit={this.sendMessage}/>
        <ExitChannelButton exitChannel={this.exitChannel} />
      </div>
    );
  }
}



const mapStateToProps = (state) => ({
  loginState: state.login
});

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
