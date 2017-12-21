// @flow
import { combineReducers } from 'redux';
import { createIsFetching, createError } from './common';
import actionTypes from '../constants/actionTypes';
import type { Action } from '../constants/types';
import CommentType from '../dataTypes/commentType';

export type State = {
  +byId: { [string]: CommentType },
  +allIds: string[],
  +pageToken: string,
  +isFetching: boolean,
  +error: boolean
};

function byId(state: { [string]: CommentType } = {}, action: Action): { [string]: CommentType } {
  switch (action.type) {
    case actionTypes.FETCH_COMMENTS_SUCCESS: {
      const nextState = { ...state };
      action.payload.items.forEach(item => {
        nextState[item.id] = CommentType.from(item);
      });
      return nextState;
    }
    case actionTypes.POST_COMMENT_SUCCESS:
      return {
        ...state,
        [action.payload.id]: CommentType.from(action.payload)
      };
    case actionTypes.UPDATE_ACTIVE_VIDEO:
      return {};
    default:
      return state;
  }
}

function allIds(state: string[] = [], action: Action): string[] {
  switch (action.type) {
    case actionTypes.FETCH_COMMENTS_SUCCESS:
      return [
        ...state,
        ...action.payload.items.map(item => item.id)
      ];
    case actionTypes.POST_COMMENT_SUCCESS:
      return [
        action.payload.id,
        ...state
      ];
    case actionTypes.UPDATE_ACTIVE_VIDEO:
      return [];
    default:
      return state;
  }
}

function pageToken(state: string = '', action: Action): string {
  switch (action.type) {
    case actionTypes.FETCH_COMMENTS_SUCCESS:
      return action.payload.nextPageToken;
    case actionTypes.UPDATE_ACTIVE_VIDEO:
      return '';
    default:
      return state;
  }
}

const comments = combineReducers({
  byId,
  allIds,
  pageToken,
  isFetching: createIsFetching('COMMENTS'),
  error: createError('COMMENTS')
});

export function getComments(state: State): CommentType[] {
  return state.allIds.map(id => state.byId[id]);
}

export default comments;
