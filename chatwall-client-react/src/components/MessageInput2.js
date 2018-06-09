import React from 'react';
import { Input } from 'antd';
import './MessageInput.css';

const Search = Input.Search;


class MessageInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }
  handleChange = (event) => {
    console.log(event.target.value);
    this.setState({value: event.target.value});
  }
  onMessageSend = (e) => {
    // e.preventDefault();
    console.log(this.state.value);
    console.log(e);
  }
  onMessageValue = (e) => {
    console.log(this.state.value);
    this.setState({value: ''});
    e.target.value='';
  }

  render () {
    return (
      // <form onSubmit={this.onMessageSend}>
      //   <input type="text" value={this.state.value} onChange={this.handleChange} />
      //   <input type="submit" value="Send" />
      // </form>
      <div className="messageInputContainer">
        <Search
          className="messageInput"
          placeholder="Write your message"
          enterButton="Send!"
          onChange={this.handleChange}
          onSearch={this.onMessageSend}
          value={this.state.value}
        />
      </div>
    );
  }
}

export default MessageInput;
