import React from 'react';
import mapDispatchToProps from '../mapDispatchToProps';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { Alert } from 'antd';
import Input from '../components/InputForm';
//import ShowChannelButton from '../components/ShowChannelButton';
import NotLoggedError from '../components/NotLoggedError';
import host from '../config/host';
import './Main.css';

class Main extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      channel: {},
      messages: [],
      toChannel: false,
      errors: {
        createChannel: null,
        goToChannel: null
      },
      alerts: null
    }
  }

  goToChannel = (pin) => {
    this.setState({pin: pin, toChannel: true});
  }

  createChannel = async (name) => {
    const channel = {channel: name}
    fetch(host+'/channels',
      {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + this.props.loginState.jwt_token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(channel)
      })
      .then(res => res.json())
      .then(res => this.setState({channel: {name: res.name, pin: res.pin}}))
      .then(() => this.setState({alerts: `Channel created: ${this.state.channel.name} // Use pin: ${this.state.channel.pin}`}))
      .catch(err => this.setState({errors: {createChannel: err}}))
  }

  render () {
    if (this.state.toChannel) return <Redirect to={{pathname: `/channel/${this.state.pin}`, state: { pin: this.state.pin }}} />

    return (
      <div>
        <div className="componentContainer">

          <h1 className="welcomeTitle">Welcome to ChatWall</h1>

            <h2 className="instruction">Already have a PIN?</h2>

            <Input placeholder={"Type your pin"} enterButton={"Go"} onSearch={this.goToChannel}/>

            <h2 className="instruction">Don't have a channel yet?</h2>

            <Input placeholder={"Enter your new channel name"} enterButton={"Create"} onSearch={this.createChannel} error={this.state.errors.createChannel} alert={this.state.alerts} />

          <NotLoggedError logged={this.props.loginState.logged}/>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loginState: state.login,
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
