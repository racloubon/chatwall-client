import { combineReducers } from 'redux';

const initialState = {

};

const reducer1 = (state = initialState, action) => {
  return state;
};

// Combining reducers

const reducers = combineReducers({
  reducer1
});

export default reducers;
