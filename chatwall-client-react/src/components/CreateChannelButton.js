import React from 'react';
import { Button } from 'antd';

class CreateChannelButton extends React.Component {
  render () {
    return (
      <div className="createNewWallContainer">
        <Button onClick={this.props.onCreateChannelClick}>Create Channel</Button>
      </div>
    );
  }
}

export default CreateChannelButton;
