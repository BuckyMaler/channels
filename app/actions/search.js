// @flow
import actionTypes from '../constants/actionTypes';
import type { Action, ThunkAction, Dispatch, GetState } from '../constants/types';
import type { VideoItem } from '../dataTypes/videoType';
import { getRequest } from '../services/fetch';
import { getVideosUri, getVideoIdsUri } from '../services/uriGenerator';

export function fetchSearch(): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(fetchSearchRequest());
    const params = {
      channelId: getState().channels.activeId,
      q: getState().search.query,
      pageToken: getState().search.pageToken,
      order: 'relevance'
    };
    return fetchVideoIds(params)
      .then(
        res => {
          const { videoIds, nextPageToken } = res;
          const uri = getVideosUri(videoIds);
          return getRequest(uri)
            .then(
              json => dispatch(fetchSearchSuccess(json.items, nextPageToken)),
              () => dispatch(fetchSearchFailure())
            );
        },
        () => dispatch(fetchSearchFailure())
      );
  };
}

export function fetchVideoIds(params: any): Promise<any> {
  const uri = getVideoIdsUri(params);
  return getRequest(uri)
    .then(
      json => Promise.resolve({
        videoIds: json.items.map(item => item.id.videoId).join(),
        nextPageToken: json.nextPageToken || params.pageToken
      }),
      () => Promise.reject()
    );
}

export function fetchSearchRequest(): Action {
  return {
    type: actionTypes.FETCH_SEARCH_REQUEST
  };
}

export function fetchSearchSuccess(items: VideoItem[], nextPageToken: string): Action {
  return {
    type: actionTypes.FETCH_SEARCH_SUCCESS,
    payload: {
      items,
      nextPageToken
    }
  };
}

export function fetchSearchFailure(): Action {
  return {
    type: actionTypes.FETCH_SEARCH_FAILURE
  };
}

export function updateSearch(query: string): ThunkAction {
  return (dispatch: Dispatch) => {
    dispatch(clearSearchResults());
    dispatch(updateSearchQuery(query));
  };
}

export function clearSearch(): ThunkAction {
  return (dispatch: Dispatch) => {
    dispatch(updateSearchQuery(''));
    dispatch(clearSearchResults());
  };
}

export function updateSearchQuery(query: string): Action {
  return {
    type: actionTypes.UPDATE_SEARCH_QUERY,
    payload: query
  };
}

export function clearSearchResults(): Action {
  return {
    type: actionTypes.CLEAR_SEARCH_RESULTS
  };
}
