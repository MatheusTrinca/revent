import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/layout/App';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import './app/layout/styles.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store/configureStore';
import ScrollToTop from './app/layout/ScrollToTop';
import { loadEvents } from './features/events/eventActions';

const store = configureStore();

store.dispatch(loadEvents());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
