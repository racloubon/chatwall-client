import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import mapDispatchToProps from '../mapDispatchToProps';

import { Dropdown, Button, Icon, Menu, message} from 'antd';


class ChannelNav extends Component {
  menu = () => {
    return
    <Menu onClick={this.handleMenuClick}>
      <Menu.Item key="1">1st menu item</Menu.Item>
      <Menu.Item key="2">2nd menu item</Menu.Item>
      <Menu.Item key="3">3rd item</Menu.Item>
    </Menu>
  }
  handleMenuClick = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
  }

  render () {
    return (
      <div>
        <Dropdown overlay={this.menu()} trigger={['click']}>
          <Button style={{ marginLeft: 8 }}>
            Button <Icon type="down" />
          </Button>
        </Dropdown>
      </div>
    );
  }
}

ReactDOM.render(<ChannelNav />, document.getElementById('root'));


// const menu = (
//   <Menu onClick={handleMenuClick}>
//     <Menu.Item key="1">1st menu item</Menu.Item>
//     <Menu.Item key="2">2nd menu item</Menu.Item>
//     <Menu.Item key="3">3rd item</Menu.Item>
//   </Menu>
// );

const mapStateToProps = (state) => ({
  loginState: state.login,
  messages: state.messages
});


export default connect(mapStateToProps, mapDispatchToProps)(ChannelNav);
