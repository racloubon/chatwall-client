import React from 'react';
import { Row, Col } from 'antd';
import MessageItemFlip from './MessageItemFlip';

class MessageGrid extends React.Component {
  render () {
    console.log(this.props);
    if (!this.props.showMessages) return null;

    const rows = [];
    const colCount = this.props.colCount;
    const rowCount = this.props.rowCount;
    for (let i =0; i < rowCount; i++) {
      rows.push([]);
      for (let j = 0; j < colCount; j++) {
        let message;
        if (this.props.showMessages[i*colCount+j])
          message = this.props.showMessages[i*colCount+j];
        if (message && message.hasOwnProperty('id')) {
          rows[i].push(
            <Col key={i.toString() +'-'+ j.toString()} span={24 / colCount}>
              <MessageItemFlip creator={message.creator} message={message.message} rotate={true}/>
            </Col>
          );
        } else {
          rows[i].push(
            <Col key={i.toString() +'-'+ j.toString()} span={24 / colCount}>
              <MessageItemFlip creator="" message="" rotate={false}/>
            </Col>
          );
        }
      }
    }

    return (
      <div>
        {rows.map((row, i) => <Row key={i} gutter="8">{row}</Row>)}
      </div>
    );

  }
}

export default MessageGrid;
