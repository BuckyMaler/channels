// @flow
import actionTypes from '../constants/actionTypes';
import type { Action } from '../constants/typeAliases';
import ChannelType from '../dataTypes/channelType';

export default function channel(state: ChannelType, { type, payload }: Action): ChannelType {
  switch (type) {
    case actionTypes.SELECT_CHANNEL:
      return new ChannelType(
        state.title,
        state.thumbnail,
        state.videoCount,
        state.subscriberCount,
        payload === state.id,
        state.id
      );
    default:
      return state;
  }
}
