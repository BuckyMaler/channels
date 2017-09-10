// @flow
import { combineReducers } from 'redux';
import actionTypes from '../constants/actionTypes';
import type { Action } from '../constants/typeAliases';

function token(state: string = '', { type, payload }: Action): string {
  switch (type) {
    case actionTypes.FETCH_ACCESS_TOKEN_SUCCESS:
      return payload;
    default:
      return state;
  }
}

function isFetching(state: boolean = false, { type }: Action): boolean {
  switch (type) {
    case actionTypes.FETCH_ACCESS_TOKEN_REQUEST:
      return true;
    case actionTypes.FETCH_ACCESS_TOKEN_SUCCESS:
    case actionTypes.FETCH_ACCESS_TOKEN_FAILURE:
      return false;
    default:
      return state;
  }
}


function error(state: boolean = false, { type }: Action): boolean {
  switch (type) {
    case actionTypes.FETCH_ACCESS_TOKEN_REQUEST:
    case actionTypes.FETCH_ACCESS_TOKEN_SUCCESS:
      return false;
    case actionTypes.FETCH_ACCESS_TOKEN_FAILURE:
      return true;
    default:
      return state;
  }
}

const accessToken = combineReducers({
  token,
  isFetching,
  error
});

export default accessToken;
