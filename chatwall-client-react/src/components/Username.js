import React from 'react';
import { Tag , Buttton } from 'antd';

class Username extends React.Component {
  render () {
    return (
      <div>
        <Tag>Test User Tag</Tag>
        <Button type="primary">LogOut</Button>
      </div>
    );
  }
}

export default Username;
