// @flow
import { combineReducers } from 'redux';
import actionTypes from '../constants/actionTypes';
import type { Action, ChannelsState } from '../constants/typeAliases';
import ChannelType from '../dataTypes/channelType';
import { createIsFetching, createError } from './common';
import { stringOrEmpty } from '../utils/utils';

function byId(state: { [string]: ChannelType } = {}, { type, payload }: Action): { [string]: ChannelType } {
  switch (type) {
    case actionTypes.FETCH_CHANNELS_SUCCESS:
      const nextState = { ...state };
      payload.forEach(item => {
        nextState[item.id] = ChannelType.from(item);
      });
      return nextState;
    default:
      return state;
  }
}

function allIds(state: string[] = [], { type, payload }: Action): string[] {
  switch (type) {
    case actionTypes.FETCH_CHANNELS_SUCCESS:
      return payload.map(item => stringOrEmpty(item.id));
    default:
      return state;
  }
}

function activeId(state: string = '', { type, payload }: Action): string {
  switch (type) {
    case actionTypes.UPDATE_ACTIVE_CHANNEL:
      return payload;
    default:
      return state;
  }
}

const channels = combineReducers({
  byId,
  allIds,
  activeId,
  isFetching: createIsFetching('CHANNELS'),
  error: createError('CHANNELS')
});

export function getChannels(state: ChannelsState): ChannelType[] {
  return state.allIds.map(id => state.byId[id]);
}

export function getActiveChannel(state: ChannelsState): ?ChannelType {
  return state.byId[state.activeId];
}

export default channels;
