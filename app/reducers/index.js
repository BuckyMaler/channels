// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import accessToken from './accessToken';
import type { State as AccessTokenState } from './accessToken';
import activeVideo from './activeVideo';
import channels, * as fromChannels from './channels';
import type { State as ChannelsState } from './channels';
import comments, * as fromComments from './comments';
import type { State as CommentsState } from './comments';
import ratings, * as fromRatings from './ratings';
import type { State as RatingsState } from './ratings';
import search from './search';
import type { State as SearchState } from './search';
import videos, * as fromVideos from './videos';
import type { State as VideosState } from './videos';
import ChannelType from '../dataTypes/channelType';
import CommentType from '../dataTypes/commentType';
import RatingType from '../dataTypes/ratingType';
import VideoType from '../dataTypes/videoType';

export type State = {
  +accessToken: AccessTokenState,
  +activeVideo: any,
  +channels: ChannelsState,
  +comments: CommentsState,
  +ratings: RatingsState,
  +router: any,
  +search: SearchState,
  +videos: VideosState
};

const rootReducer = combineReducers({
  accessToken,
  activeVideo,
  channels,
  comments,
  ratings,
  router,
  search,
  videos
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
  if (videoId) {
    return fromRatings.getActiveVideoRating(state.ratings, videoId);
  }
}

export function getComments(state: State): CommentType[] {
  return fromComments.getComments(state.comments);
}

export default rootReducer;
