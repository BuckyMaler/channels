// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import accessToken from './accessToken';
import status from './status';
import searchBar from './searchBar';
import channelList from './channelList';

const rootReducer = combineReducers({
  router,
  accessToken,
  status,
  searchBar,
  channelList
});

export default rootReducer;
