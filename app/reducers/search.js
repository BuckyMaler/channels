// @flow
import { combineReducers } from 'redux';
import actionTypes from '../constants/actionTypes';
import type { Action } from '../constants/typeAliases';
import VideoType from '../dataTypes/videoType';

function query(state: string = '', { type, payload }: Action): string {
  switch (type) {
    case actionTypes.UPDATE_SEARCH_QUERY:
      return payload;
    default:
      return state;
  }
}

function results(state: VideoType[] = [], { type, payload }: Action): VideoType[] {
  switch (type) {
    case actionTypes.FETCH_SEARCH_SUCCESS:
      return [
        ...state,
        ...payload.items.map(item => VideoType.from(item))
      ];
    case actionTypes.CLEAR_SEARCH_RESULTS:
      return [];
    default:
      return state;
  }
}

function pageToken(state: string = '', { type, payload }: Action): string {
  switch (type) {
    case actionTypes.FETCH_SEARCH_SUCCESS:
      return payload.nextPageToken;
    case actionTypes.CLEAR_SEARCH_RESULTS:
      return '';
    default:
      return state;
  }
}

function isFetching(state: boolean = false, { type }: Action): boolean {
  switch (type) {
    case actionTypes.FETCH_SEARCH_REQUEST:
      return true;
    case actionTypes.FETCH_SEARCH_SUCCESS:
    case actionTypes.FETCH_SEARCH_FAILURE:
      return false;
    default:
      return state;
  }
}

function error(state: boolean = false, { type }: Action): boolean {
  switch (type) {
    case actionTypes.FETCH_SEARCH_REQUEST:
    case actionTypes.FETCH_SEARCH_SUCCESS:
      return false;
    case actionTypes.FETCH_SEARCH_FAILURE:
      return true;
    default:
      return state;
  }
}

const search = combineReducers({
  query,
  results,
  pageToken,
  isFetching,
  error
});

export default search;
