// @flow
import { combineReducers } from 'redux';
import { createIsFetching, createError } from './common';
import actionTypes from '../constants/actionTypes';
import type { Action } from '../constants/types';
import ChannelType from '../dataTypes/channelType';

export type State = {
  +byId: { [string]: ChannelType },
  +allIds: string[],
  +activeId: string,
  +isFetching: boolean,
  +error: boolean
};

function byId(state: { [string]: ChannelType } = {}, action: Action): { [string]: ChannelType } {
  switch (action.type) {
    case actionTypes.FETCH_CHANNELS_SUCCESS:
      const nextState = { ...state };
      action.payload.forEach(item => {
        nextState[item.id] = ChannelType.from(item);
      });
      return nextState;
    default:
      return state;
  }
}

function allIds(state: string[] = [], action: Action): string[] {
  switch (action.type) {
    case actionTypes.FETCH_CHANNELS_SUCCESS:
      return action.payload.map(item => item.id);
    default:
      return state;
  }
}

function activeId(state: string = '', action: Action): string {
  switch (action.type) {
    case actionTypes.UPDATE_ACTIVE_CHANNEL:
      return action.payload;
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

export function getChannels(state: State): ChannelType[] {
  return state.allIds.map(id => state.byId[id]);
}

export function getActiveChannel(state: State): ?ChannelType {
  return state.byId[state.activeId];
}

export default channels;
