import React from 'react';
import { Alert } from 'antd';

const renderError = ({error}) => {
  console.log('error recived in renderError =>',error);
  if (error) {
    return <Alert message={error} type="error" showIcon />;
  } else {
    return null;
  }
};

export default renderError;
