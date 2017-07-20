// @flow
import actionTypes from '../constants/actionTypes';
import type { Action, AccessTokenState as State } from '../constants/typeAliases';

const initialState = {
  accessToken: '',
  isFetching: false,
  error: false
};

export default function accessToken(state: State = initialState, { type, payload }: Action): State {
  switch (type) {
    case actionTypes.REQUEST_ACCESS_TOKEN:
      return {
        ...state,
        isFetching: true
      };
    case actionTypes.RECEIVE_ACCESS_TOKEN:
      if (!payload) return state;

      return {
        ...state,
        accessToken: payload,
        isFetching: false,
        error: false
      };
    case actionTypes.ACCESS_TOKEN_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    default:
      return state;
  }
}
