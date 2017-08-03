// @flow
import actionTypes from '../constants/actionTypes';
import type { Action, ChannelListState as State } from '../constants/typeAliases';
import Channel from '../dataModels/channel';
import channelReducer from './channel';

const initialState = {
  channels: [],
  isFetching: false,
  error: false,
  isOpen: false
};

export default function channelList(state: State = initialState, { type, payload }: Action): State {
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
        channels: !payload ? [] : payload.map(json => Channel.from(json)),
        isFetching: false,
        error: false
      };
    case actionTypes.CHANNELS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    case actionTypes.TOGGLE_VISIBILITY:
      return {
        ...state,
        isOpen: !state.isOpen
      };
    case actionTypes.SELECT_CHANNEL:
      return {
        ...state,
        channels: state.channels.map(channel => channelReducer(channel, { type, payload }))
      };
    default:
      return state;
  }
}
