// @flow
import Channel from '../dataModels/channel';

export type Action = {
  type: string,
  payload?: any
};

export type AccessTokenState = {
  accessToken: string,
  isFetching?: boolean,
  error?: boolean
};

export type ToggleState = {
  thumbnail: string,
  title: string
};

export type SearchBarState = {
  disabled: boolean,
  placeholder: string,
  value: string
};

export type ChannelListState = {
  channels: Channel[],
  isFetching: boolean,
  error: boolean,
  isOpen: boolean
};
