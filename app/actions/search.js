// @flow
import actionTypes from '../constants/actionTypes';
import type { Action, ThunkAction, Dispatch, GetState } from '../constants/typeAliases';
import { apiRequest, Methods } from '../services/fetch';
import { getVideosUri, getVideoIdsUri } from '../services/uriGenerator';

export function fetchSearch(): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(requestSearch());
    const { token } = getState().accessToken;
    const { activeId: channelId } = getState().channels;
    const { query, pageToken } = getState().search;
    const options = { q: query, order: 'relevance' };
    const videoIds = fetchVideoIds(token, channelId, pageToken, options);
    return videoIds.then(json => {
      const { items, nextPageToken = pageToken } = json;
      if (items == null) {
        return dispatch(receiveSearch([], nextPageToken));
      }
      const videoIds = items.map(item => item.id.videoId).join();
      const uri = getVideosUri(token, videoIds);
      return apiRequest(uri, Methods.GET)
        .then(json => {
          if (json.items == null) {
            return dispatch(receiveSearch([], nextPageToken));
          }
          return dispatch(receiveSearch(json.items, nextPageToken));
        });
    })
    .catch(() => dispatch(searchError()));
  };
}

export function fetchVideoIds(token: string, channelId: string, pageToken: string, options: {}): Promise<any> {
  const uri = getVideoIdsUri(token, channelId, pageToken, options);
  return apiRequest(uri, Methods.GET);
}

export function requestSearch(): Action {
  return {
    type: actionTypes.FETCH_SEARCH_REQUEST
  };
}

export function receiveSearch(items: any, nextPageToken: string): Action {
  return {
    type: actionTypes.FETCH_SEARCH_SUCCESS,
    payload: {
      items,
      nextPageToken
    }
  };
}

export function searchError(): Action {
  return {
    type: actionTypes.FETCH_SEARCH_FAILURE
  };
}

export function updateSearch(query: string): ThunkAction {
  return (dispatch: Dispatch) => {
    dispatch({
      type: actionTypes.CLEAR_SEARCH_RESULTS
    });
    dispatch({
      type: actionTypes.UPDATE_SEARCH_QUERY,
      payload: query
    });
  };
}

export function clearSearch(): ThunkAction {
  return (dispatch: Dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_SEARCH_QUERY,
      payload: ''
    });
    dispatch({
      type: actionTypes.CLEAR_SEARCH_RESULTS
    });
  };
}
