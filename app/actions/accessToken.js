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
      .then(json => dispatch(receiveAccessToken(json)))
      .catch(() => dispatch(accessTokenError()));
  };
}

export function requestAccessToken(): Action {
  return {
    type: actionTypes.REQUEST_ACCESS_TOKEN
  };
}

export function receiveAccessToken(json: any): Action {
  return {
    type: actionTypes.RECEIVE_ACCESS_TOKEN,
    payload: json.access_token
  };
}

export function accessTokenError(): Action {
  return {
    type: actionTypes.ACCESS_TOKEN_ERROR
  };
}
