import { combineReducers } from 'redux';
import modalReducer from '../app/common/modals/modalReducer';
import eventReducer from '../features/events/eventReducer';
import testReducer from '../features/sandbox/testReducer';
import authReducer from '../features/auth/authReducer';
import asyncReducer from '../app/async/asyncReduces';

const rootReducer = combineReducers({
  test: testReducer,
  event: eventReducer,
  modals: modalReducer,
  auth: authReducer,
  async: asyncReducer,
});

export default rootReducer;
