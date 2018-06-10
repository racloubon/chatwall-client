import React from 'react';
import { Button, Input } from 'antd';

const Search = Input.Search;

class CreateChannelButton extends React.Component {
  render () {
    return (
      <Search
        placeholder="Channel name"
        enterButton="Create"
        onSearch={value => this.props.onCreateChannelClick(value)}
      />
    );
  }
}

export default CreateChannelButton;
