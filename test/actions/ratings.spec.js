import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as ratingsActions from '../../app/actions/ratings';
import actionTypes from '../../app/constants/actionTypes';
import * as fetch from '../../app/services/fetch';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../../app/services/uriGenerator');

describe('ratings actions', () => {
  it('creates FETCH_RATINGS_SUCCESS when fetching ratings has been resolved', () => {
    fetch.getRequest = jest.fn()
      .mockReturnValue(Promise.resolve({
        items: [{
          videoId: '1',
          rating: 'none'
        }]
      }));

    const expectedActions = [
      { type: actionTypes.FETCH_RATINGS_REQUEST },
      {
        type: actionTypes.FETCH_RATINGS_SUCCESS,
        payload: [{
          videoId: '1',
          rating: 'none'
        }]
      }
    ];
    const store = mockStore({
      activeVideo: {
        id: '1'
      }
    });

    return store.dispatch(ratingsActions.fetchRatings()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_RATINGS_FAILURE when fetching ratings has been rejected', () => {
    fetch.getRequest = jest.fn().mockReturnValue(Promise.reject());

    const expectedActions = [
      { type: actionTypes.FETCH_RATINGS_REQUEST },
      { type: actionTypes.FETCH_RATINGS_FAILURE }
    ];
    const store = mockStore({
      activeVideo: {
        id: '1'
      }
    });

    return store.dispatch(ratingsActions.fetchRatings()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates POST_RATING_SUCCESS when a posted rating has been resolved', () => {
    fetch.postRequest = jest.fn().mockReturnValue(Promise.resolve());

    const expectedAction = [{
      type: actionTypes.POST_RATING_SUCCESS,
      payload: {
        videoId: '1',
        rating: 'like'
      }
    }];
    const store = mockStore({
      activeVideo: {
        id: '1'
      },
      ratings: {
        byId: {
          1: {
            videoId: '1',
            rating: 'none'
          }
        }
      }
    });

    return store.dispatch(ratingsActions.postRating('like')).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});
