// @flow
import actionTypes from '../constants/actionTypes';
import type { Action, ChannelListState } from '../constants/typeAliases';
import ChannelType from '../dataTypes/channelType';
import channel from './channel';

const initialState = {
  channels: [],
  isFetching: false,
  error: false,
  isOpen: false
};

export default function channelList(state: ChannelListState = initialState, { type, payload }: Action): ChannelListState {
  switch (type) {
    case actionTypes.REQUEST_CHANNELS:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case actionTypes.RECEIVE_CHANNELS:
      return {
        ...state,
        channels: !payload ? [] : payload.map(json => ChannelType.from(json)),
        isFetching: false,
        error: false
      };
    case actionTypes.CHANNELS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    case actionTypes.TOGGLE_CHANNEL_LIST:
      return {
        ...state,
        isOpen: !state.isOpen
      };
    case actionTypes.SELECT_CHANNEL:
      return {
        ...state,
        channels: state.channels.map(c => channel(c, { type, payload }))
      };
    default:
      return state;
  }
}
