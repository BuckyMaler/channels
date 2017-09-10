// @flow
import actionTypes from '../constants/actionTypes';
import type { Action, Dispatch } from '../constants/typeAliases';
import { authRequest } from '../services/fetch';
import { getAccessTokenUri } from '../services/uriGenerator';

type ThunkAction = (dispatch: Dispatch) => any;

export function fetchAccessToken(): ThunkAction {
  return (dispatch: Dispatch) => {
    dispatch(requestAccessToken());
    const uri = getAccessTokenUri();
    return authRequest(uri)
      .then(json => dispatch(receiveAccessToken(json.access_token)))
      .catch(() => dispatch(accessTokenError()));
  };
}

export function requestAccessToken(): Action {
  return {
    type: actionTypes.FETCH_ACCESS_TOKEN_REQUEST
  };
}

export function receiveAccessToken(token: string): Action {
  return {
    type: actionTypes.FETCH_ACCESS_TOKEN_SUCCESS,
    payload: token
  };
}

export function accessTokenError(): Action {
  return {
    type: actionTypes.FETCH_ACCESS_TOKEN_FAILURE
  };
}
