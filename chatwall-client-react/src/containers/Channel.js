import React, { Component } from 'react';
import { connect } from 'react-redux';
import NotLoggedError from '../components/NotLoggedError';
import MessageList from '../components/MessageList';


class Channel extends Component {

  getMessages = () => {
    if (!this.props.loginState.logged) return;
    fetch('http://localhost:3000/messages?channel=test channel1',
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
    if(this.props.loginState.logged && this.props.messages.messages.length == 0)
      this.getMessages();
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
