// @flow
import { combineReducers } from 'redux';
import actionTypes from '../constants/actionTypes';
import type { Action } from '../constants/typeAliases';
import { createIsFetching, createError } from './common';

function token(state: string = '', { type, payload }: Action): string {
  switch (type) {
    case actionTypes.FETCH_ACCESS_TOKEN_SUCCESS:
      localStorage.setItem('accessToken', payload);
      return payload;
    default:
      return state;
  }
}

const accessToken = combineReducers({
  token,
  isFetching: createIsFetching('ACCESS_TOKEN'),
  error: createError('ACCESS_TOKEN')
});

export default accessToken;
