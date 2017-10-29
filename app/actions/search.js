// @flow
import actionTypes from '../constants/actionTypes';
import type { Action, ThunkAction, Dispatch, GetState } from '../constants/typeAliases';
import { getRequest } from '../services/fetch';
import { getVideosUri, getVideoIdsUri } from '../services/uriGenerator';

export function fetchSearch(): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(requestSearch());
    const params = {
      channelId: getState().channels.activeId,
      q: getState().search.query,
      pageToken: getState().search.pageToken,
      order: 'relevance'
    };
    return fetchVideoIds(params).then(res => {
      const { videoIds, nextPageToken } = res;
      const uri = getVideosUri(videoIds);
      return getRequest(uri).then(json => {
        if (json.items == null) {
          return dispatch(receiveSearch([], nextPageToken));
        }
        return dispatch(receiveSearch(json.items, nextPageToken));
      });
    })
    .catch(() => dispatch(searchError()));
  };
}

export function fetchVideoIds(params: any): Promise<any> {
  const uri = getVideoIdsUri(params);
  return getRequest(uri).then(json => {
    const { items, nextPageToken = params.pageToken } = json;
    if (items == null) {
      return Promise.resolve({ videoIds: '', nextPageToken });
    }
    return Promise.resolve({
      videoIds: json.items.map(item => item.id.videoId).join(),
      nextPageToken
    });
  });
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
