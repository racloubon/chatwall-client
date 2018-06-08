import React from 'react';
import mapDispatchToProps from '../mapDispatchToProps';
import { connect } from 'react-redux';

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
      console.log('somthing went wrong, err', response.errors);
    } else {
      console.log(response);
    }
  }

  render () {
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
        <NotLoggedError logged={this.props.loginState.logged}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loginState: state.login
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
