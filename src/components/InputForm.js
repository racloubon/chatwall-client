import React from 'react';
import { Input, Alert } from 'antd';
const Search = Input.Search;

const inputForm = ({placeholder, enterButton, onSearch, error, alert}) => {
  return (
  <div>
    <Search
      placeholder={placeholder}
      enterButton={enterButton}
      onSearch={value => onSearch(value)}
    />
    {error ? <Alert message={error} type="error" showIcon /> : null}
    {alert ? <Alert message={alert} type="success" showIcon /> : null}
  </div>
  )
}

export default inputForm;
