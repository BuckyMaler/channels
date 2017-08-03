// @flow
import actionTypes from '../constants/actionTypes';
import type { Action } from '../constants/typeAliases';
import Channel from '../dataModels/channel';

export default function channel(state: Channel, { type, payload }: Action): Channel {
  switch (type) {
    case actionTypes.SELECT_CHANNEL:
      return new Channel(
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
