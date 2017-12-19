// @flow
import { combineReducers } from 'redux';
import { createIsFetching, createError } from './common';
import actionTypes from '../constants/actionTypes';
import type { Action } from '../constants/types';
import RatingType from '../dataTypes/ratingType';

export type State = {
  +byId: { [string]: RatingType },
  +allIds: string[],
  +isFetching: boolean,
  +error: boolean
};

function byId(state: { [string]: RatingType } = {}, action: Action): { [string]: RatingType } {
  switch (action.type) {
    case actionTypes.FETCH_RATINGS_SUCCESS:
      const nextState = { ...state };
      action.payload.forEach(item => {
        nextState[item.videoId] = RatingType.from(item);
      });
      return nextState;
    case actionTypes.POST_RATING_SUCCESS:
      return {
        ...state,
        [action.payload.videoId]: RatingType.from(action.payload)
      };
    default:
      return state;
  }
}

function allIds(state: string[] = [], action: Action): string[] {
  switch (action.type) {
    case actionTypes.FETCH_RATINGS_SUCCESS:
      return [
        ...state,
        ...action.payload
          .filter(item => !state.includes(item.videoId))
          .map(item => item.videoId)
      ];
    default:
      return state;
  }
}

const ratings = combineReducers({
  byId,
  allIds,
  isFetching: createIsFetching('RATINGS'),
  error: createError('RATINGS')
});

export function getActiveVideoRating(state: State, videoId: string): ?RatingType {
  return state.byId[videoId];
}

export default ratings;
