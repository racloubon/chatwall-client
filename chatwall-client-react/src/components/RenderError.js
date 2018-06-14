import React from 'react';
import { Alert } from 'antd';

const renderError = ({error}) => {
  if (error) {
    return <Alert message={error} type="error" showIcon />;
  } else {
    return null;
  }
};

export default renderError;
