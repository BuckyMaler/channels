import { createHashHistory } from 'history';
import { routerMiddleware, routerActions } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import * as accessTokenActions from '../actions/accessToken';
import * as activeVideoActions from '../actions/activeVideo';
import * as channelsActions from '../actions/channels';
import * as commentsActions from '../actions/comments';
import * as ratingsActions from '../actions/ratings';
import * as searchActions from '../actions/search';
import * as videosActions from '../actions/videos';
import rootReducer from '../reducers';

const history = createHashHistory();

const configureStore = () => {
  // Redux Configuration
  const middleware = [];
  const enhancers = [];

  // Thunk Middleware
  middleware.push(thunk);

  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true
  });

  // Skip redux logs in console during the tests
  if (process.env.NODE_ENV !== 'test') {
    middleware.push(logger);
  }

  // Router Middleware
  const router = routerMiddleware(history);
  middleware.push(router);

  // Redux DevTools Configuration
  const actionCreators = {
    ...accessTokenActions,
    ...activeVideoActions,
    ...channelsActions,
    ...commentsActions,
    ...ratingsActions,
    ...routerActions,
    ...searchActions,
    ...videosActions
  };
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
      actionCreators,
    })
    : compose;
  /* eslint-enable no-underscore-dangle */

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware));
  const enhancer = composeEnhancers(...enhancers);

  // Create Store
  const store = createStore(rootReducer, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers'))); // eslint-disable-line global-require
  }

  return store;
};

export default { configureStore, history };
