import { combineReducers } from 'redux';
import modalReducer from '../app/common/modals/modalReducer';
import eventReducer from '../features/events/eventReducer';
import testReducer from '../features/sandbox/testReducer';
import authReducer from '../features/auth/authReducer';

const rootReducer = combineReducers({
  test: testReducer,
  event: eventReducer,
  modals: modalReducer,
  auth: authReducer,
});

export default rootReducer;
