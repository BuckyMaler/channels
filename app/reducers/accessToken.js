// @flow
import { combineReducers } from 'redux';
import { createIsFetching, createError } from './common';
import actionTypes from '../constants/actionTypes';
import type { Action } from '../constants/types';

export type State = {
  +token: string,
  +isFetching: boolean,
  +error: boolean
};

function token(state: string = '', action: Action): string {
  switch (action.type) {
    case actionTypes.FETCH_ACCESS_TOKEN_SUCCESS:
      localStorage.setItem('accessToken', action.payload);
      return action.payload;
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
