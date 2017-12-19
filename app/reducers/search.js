// @flow
import { combineReducers } from 'redux';
import { createIsFetching, createError } from './common';
import actionTypes from '../constants/actionTypes';
import type { Action } from '../constants/types';
import VideoType from '../dataTypes/videoType';

export type State = {
  +query: string,
  +results: VideoType[],
  +pageToken: string,
  +isFetching: boolean,
  +error: boolean
};

function query(state: string = '', action: Action): string {
  switch (action.type) {
    case actionTypes.UPDATE_SEARCH_QUERY:
      return action.payload;
    default:
      return state;
  }
}

function results(state: VideoType[] = [], action: Action): VideoType[] {
  switch (action.type) {
    case actionTypes.FETCH_SEARCH_SUCCESS:
      return [
        ...state,
        ...action.payload.items.map(item => VideoType.from(item))
      ];
    case actionTypes.CLEAR_SEARCH_RESULTS:
      return [];
    default:
      return state;
  }
}

function pageToken(state: string = '', action: Action): string {
  switch (action.type) {
    case actionTypes.FETCH_SEARCH_SUCCESS:
      return action.payload.nextPageToken;
    case actionTypes.CLEAR_SEARCH_RESULTS:
      return '';
    default:
      return state;
  }
}

const search = combineReducers({
  query,
  results,
  pageToken,
  isFetching: createIsFetching('SEARCH'),
  error: createError('SEARCH')
});

export default search;
