import React from 'react';
import mapDispatchToProps from '../mapDispatchToProps';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { Alert } from 'antd';
import CreateChannelButton from '../components/CreateChannelButton';
import ShowChannelButton from '../components/ShowChannelButton';
import GoToChatWall from '../components/GoToChatWall';
import NotLoggedError from '../components/NotLoggedError';
import host from '../config/host';
import './Main.css';

class Main extends React.Component {
  componentWillUnmount () {
    this.props.resetMessagesInfo();
  }

  onGoToChannelHandler = (channel) => {
    fetch(host+'/messages?channel='+channel,
    {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.props.loginState.jwt_token
      }
    })
    .then(res => res.json())
    .then(response => {
      if (response.errors) {
        this.props.goToChannelErr(response.errors[0]);
      } else {
        this.props.resetMessagesInfo();
        this.props.setMessages(response.channel, response.messages, 'user')
      }
    })
    .catch(err => console.log('catched error from MainComp:',err))
  }


  onChannelCreateHandler = (channel) => {
    console.log('create channel:',channel);
    fetch(host+'/channels',
    {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + this.props.loginState.jwt_token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({channel})
    })
    .then(res => res.json())
    .then(res =>{
      if(res.errors) {
        this.props.createChannelErr(res.errors[0]);
      }
      else {
        this.props.createChannelInfo('channel ' + res.channel + ' created');
      }
    })
    .catch(err => console.log('catched error from MainComp:',err))
  }

  renderCreateChannelInfo = () => {
    const info = this.props.infoMessages.createChannelInfo;
    const err = this.props.infoMessages.createChannelErr;

    if (!info&&!err) return null;
    if (err) return <Alert className="marginTop" message={err} type="error" showIcon/>;
    if(info) return <Alert className="marginTop" message={info} type="success" showIcon/>;
  }

  onChannelShowHandler = (channel) => {
    console.log('show channel:',channel);
    fetch(host+'/messages?channel='+channel,
    {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.props.loginState.jwt_token
      }
    })
    .then(res => res.json())
    .then(response => {
      if (response.errors) {
        this.props.showChannelErr(response.errors[0]);
      } else {
        this.props.resetMessagesInfo();
        this.props.setMessages(response.channel, response.messages, 'show')
      }
    })
    .catch(err => console.log('catched error from MainComp:',err))
  }

  renderGoToChannelError () {
    if (this.props.infoMessages.goToChannelErr) {
      return (
        <div className="errorMessageContainer">
          <Alert message={this.props.infoMessages.goToChannelErr} type="error" showIcon />
        </div>
      );
    }
  }

  renderShowChannelError () {
    if (this.props.infoMessages.showChannelErr) {
      return (
        <div className="errorMessageContainer">
          <Alert message={this.props.infoMessages.showChannelErr} type="error" showIcon />
        </div>
      );
    }
  }

  render () {
    if (!this.props.loginState.logged) return <Redirect to='/'/>
    if (this.props.messages.displayMode === 'user') return <Redirect to='/channel'/>
    if (this.props.messages.displayMode === 'show') return <Redirect to='/showchannel'/>

    return (
      <div>
        <p>Welcome to the ChatWall website</p>
        <div className="mainContainer">
          <div className="mainItem">
            <GoToChatWall onGoClick={this.onGoToChannelHandler}/>
            {this.renderGoToChannelError()}
          </div>
          <div className="mainItem">
            <CreateChannelButton onChannelCreateClick={this.onChannelCreateHandler}/>
            {this.renderCreateChannelInfo()}
          </div>
          <div className="mainItem">
            <ShowChannelButton onChannelShowClick={this.onChannelShowHandler}/>
            {this.renderShowChannelError()}
          </div>
        </div>
        <NotLoggedError logged={this.props.loginState.logged}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loginState: state.login,
  messages: state.messages,
  infoMessages: state.infoMessages
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
