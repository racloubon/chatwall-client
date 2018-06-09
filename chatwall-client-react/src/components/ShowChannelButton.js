import React from 'react';
import { Button } from 'antd';
import './ShowChannelButton.css';

class ShowChannelButton extends React.Component {
  render () {
    return (
      <div className="showChannelButtonContainer">
        <Button onClick={this.props.onShowChannelClick}>Show Channel</Button>
      </div>
    );
  }
}

export default ShowChannelButton;
