import React from 'react';
import { Form, Input, Button } from 'antd';
import './MessageInput.css';

const FormItem = Form.Item;

class MessageInput extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        this.props.onMessageSubmit(values.message);
        this.props.form.setFields({message:''})
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="messageInputContainer">
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('message')(
              <Input placeholder="Write your message" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" icon="enter" onClick={this.handleSubmit}></Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedMessageInput = Form.create()(MessageInput);

export default WrappedMessageInput;
