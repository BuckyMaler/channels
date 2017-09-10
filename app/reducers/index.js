// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import type { State } from '../constants/typeAliases';
import accessToken from './accessToken';
import channels, * as fromChannels from './channels';

const rootReducer = combineReducers({
  router,
  accessToken,
  channels
});

export function getChannels(state: State) {
  return fromChannels.getChannels(state.channels);
}

export function getActiveChannel(state: State) {
  return fromChannels.getActiveChannel(state.channels);
}

export default rootReducer;
