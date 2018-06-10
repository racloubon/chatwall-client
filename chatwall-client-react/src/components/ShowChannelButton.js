import React from 'react';
import { Button, Input} from 'antd';
import './ShowChannelButton.css';

const Search = Input.Search;

class ShowChannelButton extends React.Component {
  render () {
    return (
      <Search
        placeholder="Channel name"
        enterButton="Show"
        onSearch={value => this.props.onShowChannelClick(value)}
      />
    );
  }
}

export default ShowChannelButton;
