import React from 'react';

import './ChannelCreated.css';

const ChannelCreated = ({name, pin}) => {
  return <h1>Channel {name} created. Use PIN: {pin}</h1>
}

export default ChannelCreated;
