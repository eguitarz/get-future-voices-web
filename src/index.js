import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/app';
import './vendor/normalize.css';
import './vendor/skeleton.css';
import './index.css';
import reducer from './modules/reducers';

import { createBrowserHistory } from 'history';
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import thunk from 'redux-thunk';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    routing: routerReducer,
    app: reducer
  }),
  composeEnhancers( applyMiddleware(thunk) )
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
