import React from 'react';
import { Card } from 'antd';

class MessageList extends React.Component {
  render () {
    console.log('inside MessageList render, this.props', this.props);
    return (
      this.props.messages.map(message => {
        return (
          <div key={message.id}>
            <Card type="inner" title={message.creator} extra={<a href="#">Like</a>}>
              {message.message}
            </Card>
            <br/>
          </div>
        );
      })
    );
  }
}

export default MessageList;
