import React from 'react';
import { Input } from 'antd';
const Search = Input.Search;

const input = ({placeholder, enterButton, onSearch}) => {
  return <Search
    placeholder={placeholder}
    enterButton={enterButton}
    onSearch={value => onSearch(value)}
  />
}

export default input;
