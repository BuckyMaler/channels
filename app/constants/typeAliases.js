// @flow
import ChannelType from '../dataTypes/channelType';
import VideoType from '../dataTypes/videoType';

export type Action = ActionWithPayload | ActionWithoutPayload;

type ActionWithPayload = {
  type: string,
  payload: any
};

type ActionWithoutPayload = {
  type: string,
  payload?: any
};

export type Dispatch = (action: Action) => any;

export type State = {
  router: any,
  accessToken: AccessTokenState,
  channels: ChannelsState,
  videos: VideosState
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
