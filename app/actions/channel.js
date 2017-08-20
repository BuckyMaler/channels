// @flow
import actionTypes from '../constants/actionTypes';
import type { Action, Dispatch } from '../constants/typeAliases';
import ChannelType from '../dataTypes/channelType';
import { toggleChannelList, updateStatus } from './status';
import { enableSearchBar } from './searchBar';

type ThunkAction = (dispatch: Dispatch) => any;

export function selectChannel(channel: ChannelType): ThunkAction {
  return (dispatch: Dispatch) => {
    const { id, title, thumbnail } = channel;
    dispatch(toggleChannelList());
    dispatch(updateActiveChannel(id));
    dispatch(updateStatus(title, thumbnail));
    dispatch(enableSearchBar(title));
  };
}

export function updateActiveChannel(id: string): Action {
  return {
    type: actionTypes.UPDATE_ACTIVE_CHANNEL,
    payload: id
  };
}
