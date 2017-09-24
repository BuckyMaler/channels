// @flow
import { combineReducers } from 'redux';
import actionTypes from '../constants/actionTypes';
import type { Action, VideosState } from '../constants/typeAliases';
import VideoType from '../dataTypes/videoType';
import { stringOrEmpty } from '../utils/utils';

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
        ...payload.items.map(item => stringOrEmpty(item.id))
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

function isFetching(state: boolean = false, { type }: Action): boolean {
  switch (type) {
    case actionTypes.FETCH_VIDEOS_REQUEST:
      return true;
    case actionTypes.FETCH_VIDEOS_SUCCESS:
    case actionTypes.FETCH_VIDEOS_FAILURE:
      return false;
    default:
      return state;
  }
}

function error(state: boolean = false, { type }: Action): boolean {
  switch (type) {
    case actionTypes.FETCH_VIDEOS_REQUEST:
    case actionTypes.FETCH_VIDEOS_SUCCESS:
      return false;
    case actionTypes.FETCH_VIDEOS_FAILURE:
      return true;
    default:
      return state;
  }
}

const videos = combineReducers({
  byId,
  allIds,
  pageToken,
  isFetching,
  error
});

export function getVideos(state: VideosState): VideoType[] {
  return state.allIds.map(id => state.byId[id]);
}

export default videos;
