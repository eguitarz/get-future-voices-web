import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/app';
import './index.css';
import reducer from './modules/reducers';

import { createBrowserHistory } from 'history';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

const store = createStore(
  combineReducers({
    routing: routerReducer,
    app: reducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const history = syncHistoryWithStore(createBrowserHistory(), store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
