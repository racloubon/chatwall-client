import React from 'react';
import { Card } from 'antd';

const MessageList = ({messages, vote}) => {
  return (
    messages.map(message => {
      return (
        <div key={message.id}>
          <Card type="inner" title={message.creator}>
            <h2>{message.score}</h2>
            {message.message}
            <br/>
            <button onClick={() => vote(1, message.id)}>+</button>
            <button onClick={() => vote(0, message.id)}>-</button>
          </Card>
          <br/>
        </div>
      );
    })
  );
}

export default MessageList;
