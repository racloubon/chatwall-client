const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch({
    type: 'LOG_OUT'
  }),
  loginSuccessfull: (jwt_token, username) => dispatch({
    type: 'LOGIN_SUCCESSFULL',
    jwt_token,
    username
  }),
  setMessages: (channel, messages) => dispatch({
    type: 'SET_MESSAGES',
    channel,
    messages
  })
});

export default mapDispatchToProps;
