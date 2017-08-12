// @flow
import ChannelType from '../dataTypes/channelType';

export type Action = {
  type: string,
  payload?: any
};

export type AccessTokenState = {
  accessToken: string,
  isFetching?: boolean,
  error?: boolean
};

export type StatusState = {
  thumbnail: string,
  title: string
};

export type SearchBarState = {
  disabled: boolean,
  placeholder: string,
  value: string
};

export type ChannelListState = {
  channels: ChannelType[],
  isFetching: boolean,
  error: boolean,
  isOpen: boolean
};
