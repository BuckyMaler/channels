// @flow
import { combineReducers } from 'redux';
import actionTypes from '../constants/actionTypes';
import type { Action, CommentsState } from '../constants/typeAliases';
import CommentType from '../dataTypes/commentType';
import { createIsFetching, createError } from './common';

function byId(state: { [string]: CommentType } = {}, { type, payload }: Action): { [string]: CommentType } {
  switch (type) {
    case actionTypes.FETCH_COMMENTS_SUCCESS:
      const nextState = { ...state };
      payload.items.forEach(item => {
        nextState[item.id] = CommentType.from(item);
      });
      return nextState;
    case actionTypes.POST_COMMENT_SUCCESS:
      return {
        ...state,
        [payload.id]: CommentType.from(payload)
      };
    case actionTypes.UPDATE_ACTIVE_VIDEO:
      return {};
    default:
      return state;
  }
}

function allIds(state: string[] = [], { type, payload }: Action): string[] {
  switch (type) {
    case actionTypes.FETCH_COMMENTS_SUCCESS:
      return [
        ...state,
        ...payload.items.map(item => item.id)
      ];
    case actionTypes.POST_COMMENT_SUCCESS:
      return [
        payload.id,
        ...state
      ];
    case actionTypes.UPDATE_ACTIVE_VIDEO:
      return [];
    default:
      return state;
  }
}

function pageToken(state: string = '', { type, payload }: Action): string {
  switch (type) {
    case actionTypes.FETCH_COMMENTS_SUCCESS:
      return payload.nextPageToken;
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

export function getComments(state: CommentsState): CommentType[] {
  return state.allIds.map(id => state.byId[id]);
}

export default comments;
