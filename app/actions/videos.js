// @flow
import actionTypes from '../constants/actionTypes';
import type { Action, ThunkAction, Dispatch, GetState } from '../constants/typeAliases';
import { getRequest } from '../services/fetch';
import { getVideosUri, getVideoIdsUri } from '../services/uriGenerator';

export function fetchVideos(): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(requestVideos());
    const params = {
      channelId: getState().channels.activeId,
      pageToken: getState().videos.pageToken,
      order: 'date'
    };
    return fetchVideoIds(params).then(res => {
      const { videoIds, nextPageToken } = res;
      const uri = getVideosUri(videoIds);
      return getRequest(uri).then(json => {
        if (json.items == null) {
          return dispatch(receiveVideos([], nextPageToken));
        }
        return dispatch(receiveVideos(json.items, nextPageToken));
      });
    })
    .catch(() => dispatch(videosError()));
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
