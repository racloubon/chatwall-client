import React from 'react';
import { Button } from 'antd';
const ButtonGroup = Button.Group;

class Username extends React.Component {
  render () {
    return (
      <div>
        <ButtonGroup>
          <Button>Hello {this.props.username}</Button>
          <Button onClick={this.props.logOutClick}>LogOut</Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default Username;
