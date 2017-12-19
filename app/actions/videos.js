// @flow
import actionTypes from '../constants/actionTypes';
import type { Action, ThunkAction, Dispatch, GetState } from '../constants/types';
import { IVideo } from '../dataTypes/videoType';
import { getRequest } from '../services/fetch';
import { getVideosUri, getVideoIdsUri } from '../services/uriGenerator';

export function fetchVideos(): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(fetchVideosRequest());
    const params = {
      channelId: getState().channels.activeId,
      pageToken: getState().videos.pageToken,
      order: 'date'
    };
    return fetchVideoIds(params)
      .then(
        res => {
          const { videoIds, nextPageToken } = res;
          const uri = getVideosUri(videoIds);
          return getRequest(uri)
            .then(
              json => dispatch(fetchVideosSuccess(json.items, nextPageToken)),
              () => dispatch(fetchVideosFailure())
            );
        },
        () => dispatch(fetchVideosFailure())
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

export function fetchVideosRequest(): Action {
  return {
    type: actionTypes.FETCH_VIDEOS_REQUEST
  };
}

export function fetchVideosSuccess(items: IVideo[], nextPageToken: string): Action {
  return {
    type: actionTypes.FETCH_VIDEOS_SUCCESS,
    payload: {
      items,
      nextPageToken
    }
  };
}

export function fetchVideosFailure(): Action {
  return {
    type: actionTypes.FETCH_VIDEOS_FAILURE
  };
}
