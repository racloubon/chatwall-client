import React from 'react';
import { Input } from 'antd';

const Search = Input.Search;

class CreateChannelButton extends React.Component {
  render () {
    return (
      <Search
        placeholder="Channel name"
        enterButton="Create"
        onSearch={value => this.props.onChannelCreateClick(value)}
      />
    );
  }
}

export default CreateChannelButton;
