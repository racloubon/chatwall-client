import React from 'react';
import { Button } from 'antd';

const ButtonGroup = Button.Group;

class ExitChannelButton extends React.Component {
  render () {
    if (!this.props.channel) return null;

    if (this.props.displayMode === 'user') {
      return (
        <div onClick={this.props.onExitChannelClick} className="exitChannelButtonContainer">
          <Button>Exit {this.props.channel}</Button>
        </div>
      );
    }
    // displayMode => 'show'
    else {
      return (
        <ButtonGroup>
          <Button>Channel: {this.props.channel}</Button>
          <Button type="primary" onClick={this.props.onExitChannelClick} icon="close"></Button>
        </ButtonGroup>
      );
    }
  }
}

export default ExitChannelButton;
