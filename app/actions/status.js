// @flow
import actionTypes from '../constants/actionTypes';
import type { Action } from '../constants/typeAliases';

export function toggleChannelList(): Action {
  return {
    type: actionTypes.TOGGLE_CHANNEL_LIST
  };
}

export function updateStatus(title: string, thumbnail: string): Action {
  return {
    type: actionTypes.UPDATE_STATUS,
    payload: {
      title,
      thumbnail
    }
  };
}
