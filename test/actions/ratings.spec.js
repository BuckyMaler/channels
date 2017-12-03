/* eslint promise/always-return: 0 */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as ratingsActions from '../../app/actions/ratings';
import actionTypes from '../../app/constants/actionTypes';
import * as fetch from '../../app/services/fetch';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../../app/services/uriGenerator');

describe('ratings actions', () => {

  let store;
  beforeEach(() => {
    store = mockStore({
      activeVideo: {
        id: 'XsFQEUP1MxI'
      }
    });
  });

  it('creates FETCH_RATINGS_FAILURE when fetching ratings has been rejected', () => {
    fetch.getRequest = jest.fn(() => Promise.reject());

    const expectedActions = [
      { type: actionTypes.FETCH_RATINGS_REQUEST },
      { type: actionTypes.FETCH_RATINGS_FAILURE }
    ];

    return store.dispatch(ratingsActions.fetchRatings()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_RATINGS_SUCCESS when fetching ratings has been resolved', () => {
    fetch.getRequest = jest.fn()
      .mockReturnValueOnce(Promise.resolve({
        items: ['XsFQEUP1MxI']
      }));

    const expectedActions = [
      { type: actionTypes.FETCH_RATINGS_REQUEST },
      {
        type: actionTypes.FETCH_RATINGS_SUCCESS,
        payload: ['XsFQEUP1MxI']
      }
    ];

    return store.dispatch(ratingsActions.fetchRatings()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create an action to request ratings', () => {
    const expectedAction = {
      type: actionTypes.FETCH_RATINGS_REQUEST
    };

    expect(ratingsActions.fetchRatingsRequest()).toEqual(expectedAction);
  });

  it('should create an action to receive ratings', () => {
    const items = ['XsFQEUP1MxI'];
    const expectedAction = {
      type: actionTypes.FETCH_RATINGS_SUCCESS,
      payload: items
    };

    expect(ratingsActions.fetchRatingsSuccess(items)).toEqual(expectedAction);
  });

  it('should create an action to handle an error', () => {
    const expectedAction = {
      type: actionTypes.FETCH_RATINGS_FAILURE
    };

    expect(ratingsActions.fetchRatingsFailure()).toEqual(expectedAction);
  });
});
