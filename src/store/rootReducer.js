import { combineReducers } from 'redux';
import modalReducer from '../app/common/modals/modalReducer';
import eventReducer from '../features/events/eventReducer';
import testReducer from '../features/sandbox/testReducer';

const rootReducer = combineReducers({
  test: testReducer,
  event: eventReducer,
  modals: modalReducer,
});

export default rootReducer;
