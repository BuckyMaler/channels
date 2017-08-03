// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import accessToken from './accessToken';
import toggle from './toggle';
import searchBar from './searchBar';
import channelList from './channelList';

const rootReducer = combineReducers({
  router,
  accessToken,
  toggle,
  searchBar,
  channelList
});

export default rootReducer;
