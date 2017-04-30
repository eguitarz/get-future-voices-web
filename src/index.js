import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/app';
import './index.css';

import { createBrowserHistory } from 'history';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

const store = createStore(
  combineReducers({
    routing: routerReducer
  })
);

const history = syncHistoryWithStore(createBrowserHistory(), store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="foo"/>
        <Route path="bar"/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
