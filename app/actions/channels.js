// @flow
import actionTypes from '../constants/actionTypes';
import type { Action, Dispatch, AccessTokenState } from '../constants/typeAliases';
import { apiRequest, Methods } from '../services/fetch';
import { getChannelsUri, getSubscriptionsUri } from '../services/uriGenerator';

type GetState = () => { accessToken: AccessTokenState };

type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;

export function fetchChannels(): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(requestChannels());
    const { token } = getState().accessToken;
    const subscriptions = fetchSubscriptions(token);
    return subscriptions.then(json => {
      if (json.items == null) {
        return dispatch(receiveChannels([]));
      }
      const subscriptions = json.items.map(item => item.snippet.resourceId.channelId).join();
      const uri = getChannelsUri(token, subscriptions);
      return apiRequest(uri, Methods.GET)
        .then(json => {
          if (json.items == null) {
            return dispatch(receiveChannels([]));
          }
          return dispatch(receiveChannels(json.items));
        });
    })
    .catch(() => dispatch(channelsError()));
  };
}

export function fetchSubscriptions(token: string): Promise<any> {
  const uri = getSubscriptionsUri(token);
  return apiRequest(uri, Methods.GET);
}

export function requestChannels(): Action {
  return {
    type: actionTypes.FETCH_CHANNELS_REQUEST
  };
}

export function receiveChannels(items: any): Action {
  return {
    type: actionTypes.FETCH_CHANNELS_SUCCESS,
    payload: items
  };
}

export function channelsError(): Action {
  return {
    type: actionTypes.FETCH_CHANNELS_FAILURE
  };
}

export function updateActiveChannel(id: string): Action {
  return {
    type: actionTypes.UPDATE_ACTIVE_CHANNEL,
    payload: id
  };
}
