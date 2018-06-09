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
  }),
  setMessagesError: (error) => dispatch({
    type: 'SET_MESSAGES_ERROR',
    error
  }),
  unSetMessagesError: () => dispatch({
    type: 'UNSET_MESSAGES_ERROR'
  }),
  unSetMessages: () => dispatch({
    type: 'UNSET_MESSAGES'
  }),
  exitChannel: () => dispatch({
    type: 'EXIT_CHANNEL'
  })
});

export default mapDispatchToProps;
