// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import accessToken from './accessToken';
import toggle from './toggle';
import searchBar from './searchBar';

const rootReducer = combineReducers({
  router,
  accessToken,
  toggle,
  searchBar
});

export default rootReducer;
