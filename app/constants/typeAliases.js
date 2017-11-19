// @flow
import ChannelType from '../dataTypes/channelType';
import VideoType from '../dataTypes/videoType';
import RatingType from '../dataTypes/ratingType';

export type Action = ActionWithPayload | ActionWithoutPayload;

type ActionWithPayload = {
  type: string,
  payload: any
};

type ActionWithoutPayload = {
  type: string,
  payload?: any
};

export type ThunkAction = ThunkActionWithState | ThunkActionWithoutState;

type ThunkActionWithState = (dispatch: Dispatch, getState: GetState) => any;

type ThunkActionWithoutState = (dispatch: Dispatch) => any;

export type Dispatch = (action: Action) => any;

export type GetState = () => State;

export type State = {
  router: any,
  accessToken: AccessTokenState,
  channels: ChannelsState,
  videos: VideosState,
  search: SearchState,
  activeVideo: any,
  ratings: RatingsState
};

export type AccessTokenState = {
  token: string,
  isFetching: boolean,
  error: boolean
};

export type ChannelsState = {
  byId: { [string]: ChannelType },
  allIds: string[],
  activeId: string,
  isFetching: boolean,
  error: boolean
};

export type VideosState = {
  byId: { [string]: VideoType },
  allIds: string[],
  pageToken: string,
  isFetching: boolean,
  error: boolean
};

export type SearchState = {
  query: string,
  results: VideoType[],
  pageToken: string,
  isFetching: boolean,
  error: boolean
};

export type RatingsState = {
  byId: { [string]: RatingType },
  allIds: string[],
  isFetching: boolean,
  error: boolean
};
