// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import type { State } from '../constants/typeAliases';
import ChannelType from '../dataTypes/channelType';
import VideoType from '../dataTypes/videoType';
import RatingType from '../dataTypes/ratingType';
import CommentType from '../dataTypes/commentType';
import accessToken from './accessToken';
import channels, * as fromChannels from './channels';
import videos, * as fromVideos from './videos';
import search from './search';
import activeVideo from './activeVideo';
import ratings, * as fromRatings from './ratings';
import comments, * as fromComments from './comments';

const rootReducer = combineReducers({
  router,
  accessToken,
  channels,
  videos,
  search,
  activeVideo,
  ratings,
  comments
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

export function getActiveVideoRating(state: State): ?RatingType {
  const { id: videoId } = state.activeVideo;
  return videoId ?
    fromRatings.getActiveVideoRating(state.ratings, videoId) :
    null;
}

export function getComments(state: State): CommentType[] {
  return fromComments.getComments(state.comments);
}

export default rootReducer;
