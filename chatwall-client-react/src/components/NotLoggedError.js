import React from 'react';
import { Alert } from 'antd';
import './NotLoggedError.css';

const NotLoggedError = ({logged}) => {
  if (!logged) {
    return (
      <div className="notLoggedError">
        <Alert message="You need to Log in!" type="error" showIcon />
      </div>
    );
  } else return null;
};

export default NotLoggedError;
