// @flow
import actionTypes from '../constants/actionTypes';
import type { Action, ThunkAction, Dispatch, GetState } from '../constants/types';
import type { RatingItem } from '../dataTypes/ratingType';
import { getRequest, postRequest } from '../services/fetch';
import { getRatingsUri, postRatingUri } from '../services/uriGenerator';

export function fetchRatings(): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(fetchRatingsRequest());
    const { id } = getState().activeVideo;
    const uri = getRatingsUri(id);
    return getRequest(uri)
      .then(
        json => dispatch(fetchRatingsSuccess(json.items)),
        () => dispatch(fetchRatingsFailure())
      );
  };
}

export function postRating(rating: string): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) => {
    const { id } = getState().activeVideo;
    const prevRating = getState().ratings.byId[id];
    const uri = postRatingUri({ id, rating });
    return postRequest(uri)
      .then(
        () => {
          dispatch(postRatingSuccess({
            videoId: id,
            rating
          }));
          return prevRating;
        },
        () => Promise.reject()
      );
  };
}

export function fetchRatingsRequest(): Action {
  return {
    type: actionTypes.FETCH_RATINGS_REQUEST
  };
}

export function fetchRatingsSuccess(items: RatingItem[]): Action {
  return {
    type: actionTypes.FETCH_RATINGS_SUCCESS,
    payload: items
  };
}

export function fetchRatingsFailure(): Action {
  return {
    type: actionTypes.FETCH_RATINGS_FAILURE
  };
}

export function postRatingSuccess(item: RatingItem): Action {
  return {
    type: actionTypes.POST_RATING_SUCCESS,
    payload: item
  };
}
