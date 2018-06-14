import React from 'react';
import mapDispatchToProps from '../mapDispatchToProps';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import host from '../config/host';

import MessageGrid from '../components/MessageGrid';
import GridSliders from '../components/GridSliders';
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
      console.log('inside ShowChannel getShowMessages, res:',res);
      this.props.setShowMessages(this.props.messages.channel, res.messages, 'show')
      //, this.rowCounts[this.props.rowCountKey]*this.colCounts[this.props.colCountKey])
    })
    .catch(err => console.log(err));
  }

  colCounts = {};
  rowCounts = {};

  constructor(props) {
    super(props);
    this.state = {
      colCountKey: 2,
      rowCountKey: 2
    };
    [2, 3, 4, 6, 8, 12].forEach((value, i) => { this.colCounts[i] = value; });
    [2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((value, i) => { this.rowCounts[i] = value; });
    console.log('inside ShowChannel constructor, this.props:',this.props);
    this.props.setCol(this.colCounts[this.state.colCountKey]);
    this.props.setRow(this.rowCounts[this.state.rowCountKey]);
  }
  onColCountChangeHandler = (colCountKey) => {
    this.setState({ colCountKey });
    this.props.setCol(this.colCounts[colCountKey])

  }
  onRowCountChangeHandler = (rowCountKey) => {
    this.setState({ rowCountKey });
    this.props.setRow(this.rowCounts[rowCountKey])
  }
  render() {
    if(!this.props.messages.channel) return <Redirect to='/main'/>

    if(!this.props.messages) return null;

    const { colCountKey, rowCountKey } = this.state;

    return (
      <div className="showChannelContainer">
        <MessageGrid  colCount={this.colCounts[colCountKey]}
                      rowCount = {this.rowCounts[rowCountKey]}
                      showMessages = {this.props.messages.showMessages}/>
        <GridSliders onRowCountChange={this.onRowCountChangeHandler}
                      rowCounts = {this.rowCounts}
                      rowCountKey = {rowCountKey}
                      onColumnCountChange={this.onColCountChangeHandler}
                      colCounts = {this.colCounts}
                      colCountKey = {colCountKey}
                      className="gridSliders"/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loginState: state.login,
  messages: state.messages,
  gridStatus: state.gridStatus
});

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
