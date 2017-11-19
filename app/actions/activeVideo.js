// @flow
import actionTypes from '../constants/actionTypes';
import type { ThunkAction, Dispatch, GetState } from '../constants/typeAliases';
import RatingType from '../dataTypes/ratingType';

export function updateActiveVideo(video: any): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) => {
    const { id } = getState().activeVideo;
    if (id !== video.id) {
      dispatch({
        type: actionTypes.UPDATE_ACTIVE_VIDEO,
        payload: video
      });
    }
  };
}

export function updateActiveVideoCounts(prevState: RatingType, rating: string): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) => {
    let likeCount = Number(getState().activeVideo.likeCount);
    let dislikeCount = Number(getState().activeVideo.dislikeCount);
    switch (rating) {
      case 'like':
        likeCount = prevState.like ? likeCount - 1 : likeCount + 1;
        dislikeCount = prevState.dislike ? dislikeCount - 1 : dislikeCount;
        break;
      case 'dislike':
        likeCount = prevState.like ? likeCount - 1 : likeCount;
        dislikeCount = prevState.dislike ? dislikeCount - 1 : dislikeCount + 1;
        break;
      default:
        likeCount = prevState.like ? likeCount - 1 : likeCount;
        dislikeCount = prevState.dislike ? dislikeCount - 1 : dislikeCount;
    }
    dispatch({
      type: actionTypes.UPDATE_ACTIVE_VIDEO,
      payload: {
        likeCount: String(likeCount),
        dislikeCount: String(dislikeCount)
      }
    });
  };
}
