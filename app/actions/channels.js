// @flow
import actionTypes from '../constants/actionTypes';
import type { Action, ThunkAction, Dispatch, GetState } from '../constants/types';
import { IChannel } from '../dataTypes/channelType';
import { getRequest } from '../services/fetch';
import { getChannelsUri, getSubscriptionsUri } from '../services/uriGenerator';

export function fetchChannels(): ThunkAction {
  return (dispatch: Dispatch) => {
    dispatch(fetchChannelsRequest());
    return fetchSubscriptions()
      .then(
        subscriptions => {
          const uri = getChannelsUri(subscriptions);
          return getRequest(uri)
            .then(
              json => dispatch(fetchChannelsSuccess(json.items)),
              () => dispatch(fetchChannelsFailure())
            );
        },
        () => dispatch(fetchChannelsFailure())
      );
  };
}

export function fetchSubscriptions(): Promise<string> {
  const uri = getSubscriptionsUri();
  return getRequest(uri)
    .then(
      json => Promise.resolve(
        json.items.map(item => item.snippet.resourceId.channelId).join()
      ),
      () => Promise.reject()
    );
}

export function fetchChannelsRequest(): Action {
  return {
    type: actionTypes.FETCH_CHANNELS_REQUEST
  };
}

export function fetchChannelsSuccess(items: IChannel[]): Action {
  return {
    type: actionTypes.FETCH_CHANNELS_SUCCESS,
    payload: items
  };
}

export function fetchChannelsFailure(): Action {
  return {
    type: actionTypes.FETCH_CHANNELS_FAILURE
  };
}

export function updateActiveChannel(channelId: string): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) => {
    const { activeId } = getState().channels;
    if (activeId !== channelId) {
      dispatch({
        type: actionTypes.UPDATE_ACTIVE_CHANNEL,
        payload: channelId
      });
    }
  };
}
