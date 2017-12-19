// @flow
import actionTypes from '../constants/actionTypes';
import type { Action } from '../constants/types';

function activeVideo(state: any = {}, action: Action): any {
  switch (action.type) {
    case actionTypes.UPDATE_ACTIVE_VIDEO:
      return action.payload;
    case actionTypes.UPDATE_ACTIVE_VIDEO_COUNTS:
      return {
        ...state,
        ...updateCounts(state, action)
      };
    default:
      return state;
  }
}

function updateCounts(state: any, action: any): any {
  const { prevRating, rating } = action.payload;
  let likeCount = Number(state.likeCount);
  let dislikeCount = Number(state.dislikeCount);
  switch (rating) {
    case 'like':
      likeCount = prevRating.like ? likeCount - 1 : likeCount + 1;
      dislikeCount = prevRating.dislike ? dislikeCount - 1 : dislikeCount;
      break;
    case 'dislike':
      likeCount = prevRating.like ? likeCount - 1 : likeCount;
      dislikeCount = prevRating.dislike ? dislikeCount - 1 : dislikeCount + 1;
      break;
    default:
      likeCount = prevRating.like ? likeCount - 1 : likeCount;
      dislikeCount = prevRating.dislike ? dislikeCount - 1 : dislikeCount;
  }
  return {
    likeCount: String(likeCount),
    dislikeCount: String(dislikeCount)
  };
}

export default activeVideo;
