import React from 'react';
import './MessageItem.css';

const MessageItem = ({creator, message}) => {
  return (
    <div className='messageItem flip-vertical-right'>
      <h6>{creator}</h6>
      <div className='textMessage'>
        <div>{message}</div>
      </div>
    </div>
  );
};

export default MessageItem;
