import { combineReducers } from 'redux';

const loginInitialState = {
  logged: false,
  jwt_token: undefined,
  username: undefined,
  error: false
};

const login = (state = loginInitialState, action) => {
  switch (action.type) {
  case 'LOG_OUT':
    return ({
      ...state,
      ...loginInitialState
    });
  case 'LOGIN_SUCCESSFULL':
    return ({
      ...state,
      logged: true,
      jwt_token: action.jwt_token,
      username: action.username,
      error: false
    });
  case 'LOGIN_ERROR':
    return ({
      ...state,
      error: action.error
    });
  }
  return state;
};


const messagesInitialState = {
  messages: [],
  showMessages: [],
  channel: null,
  displayMode: null
};

const messages = (state = messagesInitialState, action) => {
  switch (action.type) {
  case 'SET_MESSAGES':
    return ({
      ...state,
      messages: action.messages,
      channel: action.channel,
      displayMode: action.displayMode,
    });
  case 'UNSET_MESSAGES':
    return ({
      ...state,
      ...messagesInitialState
    });
  case 'SET_SHOW_MESSAGES':
    return ({
      ...state,
      showMessages: keepMessagesOrder(state.showMessages, action.messages)
    });
  }
  return state;
};

const keepMessagesOrder = (initialMessages, newMessages) => {
  // check if the intital messages are present in the newMessages, if not fill with {}
  const emptySlots = [];
  const finalMessages = initialMessages.map((initialMessage, index) => {
    const messageFound = newMessages.find(newMessage => newMessage.id === initialMessage.id);
    if (messageFound) {
      messageFound.alreadyRendered = true;
      return messageFound;
    }
    emptySlots.push(index);
    return {};
  });

  // check if all the new messages are in the final array messages
  newMessages.forEach(newMessage => {
    const findResult = finalMessages.find(finalMessage => finalMessage.id === newMessage.id);
    if (!findResult) {
      newMessage.alreadyRendered = false;
      const emptySlot = emptySlots.shift();
      if (emptySlot != undefined) finalMessages[emptySlot] = newMessage;
      else finalMessages.push(newMessage);
    }
  });

  return finalMessages;
};

const infoMessagesInitialState = {
  goToChannelErr: false,
  createChannelErr: false,
  createChannelInfo: false,
  showChannelErr: false
};

const infoMessages = (state = infoMessagesInitialState, action) => {
  switch (action.type) {
  case 'GO_TO_CHANNEL_ERR':
    return ({
      ...state,
      ...infoMessagesInitialState,
      goToChannelErr: action.err
    });
  case 'CREATE_CHANNEL_ERR':
    return ({
      ...state,
      ...infoMessagesInitialState,
      createChannelErr: action.err
    });
  case 'CREATE_CHANNEL_INFO':
    return ({
      ...state,
      ...infoMessagesInitialState,
      createChannelInfo: action.info
    });
  case 'SHOW_CHANNEL_ERR':
    return ({
      ...state,
      ...infoMessagesInitialState,
      showChannelErr: action.err
    });
  case 'RESET_MESSAGES_INFO':
    return ({
      ...state,
      ...infoMessagesInitialState
    });
  }
  return state;
};

// Combining reducers

const reducers = combineReducers({
  login,
  messages,
  infoMessages
});

export default reducers;
