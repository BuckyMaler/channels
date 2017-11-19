// @flow
import actionTypes from '../constants/actionTypes';
import type { Action, ThunkAction, Dispatch, GetState } from '../constants/typeAliases';
import { getRequest, postRequest } from '../services/fetch';
import { getRatingsUri, postRatingUri } from '../services/uriGenerator';

export function fetchRatings(): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(requestRatings());
    const { id } = getState().activeVideo;
    const uri = getRatingsUri(id);
    return getRequest(uri).then(json => {
      if (json.items == null) {
        return dispatch(receiveRatings([]));
      }
      return dispatch(receiveRatings(json.items));
    })
    .catch(() => dispatch(ratingsError()));
  };
}

export function postRating(rating: string): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) => {
    const { id } = getState().activeVideo;
    const prevState = getState().ratings.byId[id];
    const uri = postRatingUri({ id, rating });
    return postRequest(uri).then(() => {
      dispatch(receiveRatings([
        {
          videoId: id,
          rating
        }
      ]));
      return prevState;
    });
  };
}

export function requestRatings(): Action {
  return {
    type: actionTypes.FETCH_RATINGS_REQUEST
  };
}

export function receiveRatings(items: any): Action {
  return {
    type: actionTypes.FETCH_RATINGS_SUCCESS,
    payload: items
  };
}

export function ratingsError(): Action {
  return {
    type: actionTypes.FETCH_RATINGS_FAILURE
  };
}
