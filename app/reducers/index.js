// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import type { State } from '../constants/typeAliases';
import accessToken from './accessToken';
import channels, * as fromChannels from './channels';
import videos, * as fromVideos from './videos';

const rootReducer = combineReducers({
  router,
  accessToken,
  channels,
  videos
});

export function getChannels(state: State) {
  return fromChannels.getChannels(state.channels);
}

export function getActiveChannel(state: State) {
  return fromChannels.getActiveChannel(state.channels);
}

export function getVideos(state: State) {
  return fromVideos.getVideos(state.videos);
}

export default rootReducer;
