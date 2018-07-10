import React from 'react';
import { Input} from 'antd';
import './ShowChannelButton.css';

const Search = Input.Search;

class ShowChannelButton extends React.Component {
  render () {
    return (
      <Search
        placeholder="Channel name"
        enterButton="Show"
        onSearch={value => this.props.onChannelShowClick(value)}
      />
    );
  }
}

export default ShowChannelButton;
