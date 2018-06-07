import React from 'react';

class LoginForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      password: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange (event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  }

  handleSubmit (event) {
    alert('Username submitted: ' + this.state.username + '\n' +
          'Password submitted: ' + this.state.password);
    event.preventDefault();
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input name="username" type="text" value={this.state.value} onChange={this.handleInputChange} />
        </label>
        <label>
          Password:
          <input name="password" type="password" value={this.state.value} onChange={this.handleInputChange} />
        </label>
        <input type="submit" value="LogIn " />
      </form>
    );
  }
}

export default LoginForm;
