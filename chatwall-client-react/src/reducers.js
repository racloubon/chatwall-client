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
      errors: false
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
  channel: null,
  error: false
};

const messages = (state = messagesInitialState, action) => {
  switch (action.type) {
  case 'SET_MESSAGES':
    return ({
      ...state,
      messages: action.messages,
      channel: action.channel,
      error: false
    });
  case 'SET_MESSAGES_ERROR':
    return ({
      ...state,
      error: action.error
    });
  case 'UNSET_MESSAGES_ERROR':
    return ({
      ...state,
      error: false
    });
  case 'UNSET_MESSAGES':
    return ({
      ...state,
      messages: [],
      channel: null,
      error: false
    });
  }
  return state;
};

// Combining reducers

const reducers = combineReducers({
  login,
  messages
});

export default reducers;
