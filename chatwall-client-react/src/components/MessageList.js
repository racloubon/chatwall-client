import React from 'react';
import { Card } from 'antd';

class MessageList extends React.Component {
  constructor (props) {
    super(props);
    let data = props.messages;
    console.log('inside MessageList constructor',props);
  }

  render () {
    console.log('inside MessageList render, this.props', this.props);
    return (
      this.props.messages.map(message => {
        return (
          <div>
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
