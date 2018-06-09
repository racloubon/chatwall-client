import React from 'react';
import mapDispatchToProps from '../mapDispatchToProps';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { Alert } from 'antd';
import CreateChannelButton from '../components/CreateChannelButton';
import GoToChatWall from '../components/GoToChatWall';
import NotLoggedError from '../components/NotLoggedError';
import host from '../config/host';
import './Main.css';

class Main extends React.Component {
  channelClick = (channel) => {
    fetch(host+'/messages?channel='+channel,
    {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.props.loginState.jwt_token
      }
    })
    .then(res => res.json())
    .then(this.readResponse)
    .catch(err => console.log('catched error from MainComp:',err))
  }

  readResponse = (response) => {
    if (response.errors) {
      this.props.setMessagesError(response.errors);
    } else {
      this.props.setMessages(response.channel, response.messages)
    }
  }

  renderError() {
    if (this.props.messages.error) {
      return (
        <div className="errorMessageContainer">
          <Alert message={this.props.messages.error} type="error" showIcon />
        </div>
      );
    }
  }

  render () {
    if (this.props.messages.channel) return <Redirect to='/channel'/>
    if (!this.props.loginState.logged) return <Redirect to='/'/>

    return (
      <div>
        <p>Welcome to the ChatWall website</p>
        <div className="introContainer">
          <div className="createChannelButtonContainer">
            <CreateChannelButton />
          </div>
          <div  className="goToChatWallContainer">
            <GoToChatWall onGoClick={this.channelClick}/>
          </div>
        </div>
        {this.renderError()}
        <NotLoggedError logged={this.props.loginState.logged}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loginState: state.login,
  messages: state.messages
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
