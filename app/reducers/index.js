// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import type { State } from '../constants/typeAliases';
import ChannelType from '../dataTypes/channelType';
import VideoType from '../dataTypes/videoType';
import accessToken from './accessToken';
import channels, * as fromChannels from './channels';
import videos, * as fromVideos from './videos';
import search from './search';

const rootReducer = combineReducers({
  router,
  accessToken,
  channels,
  videos,
  search
});

export function getChannels(state: State): ChannelType[] {
  return fromChannels.getChannels(state.channels);
}

export function getActiveChannel(state: State): ?ChannelType {
  return fromChannels.getActiveChannel(state.channels);
}

export function getVideos(state: State): VideoType[] {
  return fromVideos.getVideos(state.videos);
}

export default rootReducer;
