// @flow
import { combineReducers } from 'redux';
import { createIsFetching, createError } from './common';
import actionTypes from '../constants/actionTypes';
import type { Action } from '../constants/types';
import VideoType from '../dataTypes/videoType';

export type State = {
  +byId: { [string]: VideoType },
  +allIds: string[],
  +pageToken: string,
  +isFetching: boolean,
  +error: boolean
};

function byId(state: { [string]: VideoType } = {}, action: Action): { [string]: VideoType } {
  switch (action.type) {
    case actionTypes.FETCH_VIDEOS_SUCCESS: {
      const nextState = { ...state };
      action.payload.items.forEach(item => {
        nextState[item.id] = VideoType.from(item);
      });
      return nextState;
    }
    case actionTypes.UPDATE_ACTIVE_CHANNEL:
      return {};
    default:
      return state;
  }
}

function allIds(state: string[] = [], action: Action): string[] {
  switch (action.type) {
    case actionTypes.FETCH_VIDEOS_SUCCESS:
      return [
        ...state,
        ...action.payload.items.map(item => item.id)
      ];
    case actionTypes.UPDATE_ACTIVE_CHANNEL:
      return [];
    default:
      return state;
  }
}

function pageToken(state: string = '', action: Action): string {
  switch (action.type) {
    case actionTypes.FETCH_VIDEOS_SUCCESS:
      return action.payload.nextPageToken;
    case actionTypes.UPDATE_ACTIVE_CHANNEL:
      return '';
    default:
      return state;
  }
}

const videos = combineReducers({
  byId,
  allIds,
  pageToken,
  isFetching: createIsFetching('VIDEOS'),
  error: createError('VIDEOS')
});

export function getVideos(state: State): VideoType[] {
  return state.allIds.map(id => state.byId[id]);
}

export default videos;
