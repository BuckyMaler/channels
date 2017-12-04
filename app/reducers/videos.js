// @flow
import { combineReducers } from 'redux';
import actionTypes from '../constants/actionTypes';
import type { Action, VideosState } from '../constants/typeAliases';
import VideoType from '../dataTypes/videoType';
import { createIsFetching, createError } from './common';

function byId(state: { [string]: VideoType } = {}, { type, payload }: Action): { [string]: VideoType } {
  switch (type) {
    case actionTypes.FETCH_VIDEOS_SUCCESS:
      const nextState = { ...state };
      payload.items.forEach(item => {
        nextState[item.id] = VideoType.from(item);
      });
      return nextState;
    case actionTypes.UPDATE_ACTIVE_CHANNEL:
      return {};
    default:
      return state;
  }
}

function allIds(state: string[] = [], { type, payload }: Action): string[] {
  switch (type) {
    case actionTypes.FETCH_VIDEOS_SUCCESS:
      return [
        ...state,
        ...payload.items.map(item => item.id)
      ];
    case actionTypes.UPDATE_ACTIVE_CHANNEL:
      return [];
    default:
      return state;
  }
}

function pageToken(state: string = '', { type, payload }: Action): string {
  switch (type) {
    case actionTypes.FETCH_VIDEOS_SUCCESS:
      return payload.nextPageToken;
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

export function getVideos(state: VideosState): VideoType[] {
  return state.allIds.map(id => state.byId[id]);
}

export default videos;
