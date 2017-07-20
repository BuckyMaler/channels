// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import accessToken from './accessToken';

const rootReducer = combineReducers({
  router,
  accessToken
});

export default rootReducer;
