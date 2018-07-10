import React from 'react';
import MessageItem from './MessageItem';
import NoMessageItem from './NoMessageItem';

import './MessageItemFlip.css';

const MessageItemFlip = ({creator, message, rotate}) => {
  return (
    <div className={rotate ? "flip-container" : "flip-container rotate"}>
      <div className="flipper">
        <div className="front">
          <MessageItem creator={creator} message={message}/>
        </div>
        <div className="back">
          <NoMessageItem />
        </div>
      </div>
    </div>
  );
};

export default MessageItemFlip;
