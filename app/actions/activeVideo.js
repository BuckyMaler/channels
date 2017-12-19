// @flow
import actionTypes from '../constants/actionTypes';
import type { Action, ThunkAction, Dispatch, GetState } from '../constants/types';
import RatingType from '../dataTypes/ratingType';
import VideoType from '../dataTypes/videoType';

export function updateActiveVideo(video: VideoType): ThunkAction {
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

export function updateActiveVideoCounts(prevRating: RatingType, rating: string): Action {
  return {
    type: actionTypes.UPDATE_ACTIVE_VIDEO_COUNTS,
    payload: {
      prevRating,
      rating
    }
  };
}
