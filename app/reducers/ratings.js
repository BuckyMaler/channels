// @flow
import { combineReducers } from 'redux';
import actionTypes from '../constants/actionTypes';
import type { Action, RatingsState } from '../constants/typeAliases';
import RatingType from '../dataTypes/ratingType';
import { createIsFetching, createError } from './common';

function byId(state: { [string]: RatingType } = {}, { type, payload }: Action): { [string]: RatingType } {
  switch (type) {
    case actionTypes.FETCH_RATINGS_SUCCESS:
      const nextState = { ...state };
      payload.forEach(item => {
        nextState[item.videoId] = RatingType.from(item);
      });
      return nextState;
    case actionTypes.POST_RATING_SUCCESS:
      return {
        ...state,
        [payload.videoId]: RatingType.from(payload)
      };
    default:
      return state;
  }
}

function allIds(state: string[] = [], { type, payload }: Action): string[] {
  switch (type) {
    case actionTypes.FETCH_RATINGS_SUCCESS:
      return [
        ...state,
        ...payload
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

export function getActiveVideoRating(state: RatingsState, videoId: string): ?RatingType {
  return state.byId[videoId];
}

export default ratings;
