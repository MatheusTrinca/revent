import { createStore } from 'redux';
import testReducer from '../features/sandbox/testReducer';
import { devToolsEnhancer } from 'redux-devtools-extension';

export function configureStore() {
  return createStore(testReducer, devToolsEnhancer());
}
