// @flow
import actionTypes from '../constants/actionTypes';
import type { Action, ThunkAction, Dispatch, GetState } from '../constants/typeAliases';
import { apiRequest, Methods } from '../services/fetch';
import { getVideosUri, getVideoIdsUri } from '../services/uriGenerator';

export function fetchVideos(): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(requestVideos());
    const { accessToken, channels, videos } = getState();
    const { token } = accessToken;
    const { activeId: channelId } = channels;
    const { pageToken } = videos;
    const videoIds = fetchVideoIds(token, channelId, pageToken);
    return videoIds.then(json => {
      const { items, nextPageToken } = json;
      if (items == null || nextPageToken == null) {
        return dispatch(receiveVideos([], pageToken));
      }
      const videoIds = items.map(item => item.id.videoId).join();
      const uri = getVideosUri(token, videoIds);
      return apiRequest(uri, Methods.GET)
        .then(json => {
          if (json.items == null) {
            return dispatch(receiveVideos([], pageToken));
          }
          return dispatch(receiveVideos(json.items, nextPageToken));
        });
    })
    .catch(() => dispatch(videosError()));
  };
}

export function fetchVideoIds(token: string, channelId: string, pageToken: string): Promise<any> {
  const uri = getVideoIdsUri(token, channelId, pageToken);
  return apiRequest(uri, Methods.GET);
}

export function requestVideos(): Action {
  return {
    type: actionTypes.FETCH_VIDEOS_REQUEST
  };
}

export function receiveVideos(items: any, nextPageToken: string): Action {
  return {
    type: actionTypes.FETCH_VIDEOS_SUCCESS,
    payload: {
      items,
      nextPageToken
    }
  };
}

export function videosError(): Action {
  return {
    type: actionTypes.FETCH_VIDEOS_FAILURE
  };
}
