import React from 'react';
import mapDispatchToProps from '../mapDispatchToProps';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Row, Col, Slider } from 'antd';
import host from '../config/host';

import './ShowChannel.css';

let refreshIntervalId;

class Grid extends React.Component {
  componentDidMount () {
    console.log('ShowChannel componentDidMount');
    refreshIntervalId = setInterval(this.getShowMessages, 500);
  }
  componentWillUnmount () {
    console.log('ShowChannel componentWillUnmount');
    clearInterval(refreshIntervalId);
  }

  getShowMessages = () => {
    if (!this.props.loginState.logged) return;
    fetch(host + '/messages?channel='+this.props.messages.channel,
    {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.props.loginState.jwt_token
      }
    })
    .then(data => data.json())
    .then(res => {
      this.props.setShowMessages(this.props.messages.channel, res.messages, 'show')
    })
    .catch(err => console.log(err));
  }

  colCounts = {};
  rowCounts = {};

  constructor() {
    super();
    this.state = {
      colCountKey: 2,
      rowCountKey: 2
    };
    [2, 3, 4, 6, 8, 12].forEach((value, i) => { this.colCounts[i] = value; });
    [2, 3, 4, 6, 8, 12].forEach((value, i) => { this.rowCounts[i] = value; });
  }
  onColCountChange = (colCountKey) => {
    this.setState({ colCountKey });
  }
  onRowCountChange = (rowCountKey) => {
    this.setState({ rowCountKey });
  }
  render() {
    if(!this.props.messages.channel) return <Redirect to='/main'/>

    if(!this.props.messages) return null;

    const { colCountKey, rowCountKey } = this.state;
    const rows = [];
    const colCount = this.colCounts[colCountKey];
    const rowCount = this.rowCounts[rowCountKey];
    for (let i =0; i < rowCount; i++){
      rows.push([]);
      for (let j = 0; j < colCount; j++) {
        let message;
        if (this.props.messages.showMessages[i*colCount+j])
          message = this.props.messages.showMessages[i*colCount+j];
        if (message && message.alreadyRendered) {
          rows[i].push(
            <Col key={i.toString() +'-'+ j.toString()} span={24 / colCount}>
              <div className='messageItem'>
                {message ? message.message : ''}
              </div>
            </Col>
          );
        } else {
          rows[i].push(
            <Col key={i.toString() +'-'+ j.toString()} span={24 / colCount}>
              <div className='messageItem flip-vertical-left'>
                {message ? message.message : ''}
              </div>
            </Col>
          );
        }
      }
    }

    return (
      <div>
        {rows.map((row, i) => <Row key={i} gutter="8">{row}</Row>)}
        <div className="sliderControls">
          <div style={{ flex: 1, marginRight: 16 }}>
            <span>Rows</span>
            <Slider
              min={0}
              max={Object.keys(this.rowCounts).length - 1}
              value={rowCountKey}
              onChange={this.onRowCountChange}
              marks={this.rowCounts}
              step={null}
            />
          </div>
            <div style={{ flex: 1, marginLeft: 16 }}>
              <span>Columns</span>
              <Slider
                min={0}
                max={Object.keys(this.colCounts).length - 1}
                value={colCountKey}
                onChange={this.onColCountChange}
                marks={this.colCounts}
                step={null}
              />
            </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loginState: state.login,
  messages: state.messages
});

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
