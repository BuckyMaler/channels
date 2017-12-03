// @flow
import actionTypes from '../constants/actionTypes';
import type { Action, ThunkAction, Dispatch } from '../constants/typeAliases';
import { authRequest } from '../services/fetch';
import { getAccessTokenUri } from '../services/uriGenerator';

export function fetchAccessToken(): ThunkAction {
  return (dispatch: Dispatch) => {
    dispatch(fetchAccessTokenRequest());
    const uri = getAccessTokenUri();
    return authRequest(uri)
      .then(
        json => dispatch(fetchAccessTokenSuccess(json.access_token)),
        () => dispatch(fetchAccessTokenFailure())
      );
  };
}

export function fetchAccessTokenRequest(): Action {
  return {
    type: actionTypes.FETCH_ACCESS_TOKEN_REQUEST
  };
}

export function fetchAccessTokenSuccess(token: string): Action {
  return {
    type: actionTypes.FETCH_ACCESS_TOKEN_SUCCESS,
    payload: token
  };
}

export function fetchAccessTokenFailure(): Action {
  return {
    type: actionTypes.FETCH_ACCESS_TOKEN_FAILURE
  };
}
