import React from 'react';
import { Button } from 'antd';

const ButtonGroup = Button.Group;

const ExitChannelButton = ({ exitChannel }) => {
  return <Button onClick={exitChannel}>Exit Channel</Button>
}

export default ExitChannelButton;
