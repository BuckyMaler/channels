import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as accessTokenActions from '../../app/actions/accessToken';
import actionTypes from '../../app/constants/actionTypes';
import * as fetch from '../../app/services/fetch';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../../app/services/uriGenerator');

describe('accessToken actions', () => {
  it('creates FETCH_ACCESS_TOKEN_SUCCESS when fetching an access token has been resolved', () => {
    fetch.authRequest = jest.fn().mockReturnValue(Promise.resolve({ access_token: 'token' }));

    const expectedActions = [
      { type: actionTypes.FETCH_ACCESS_TOKEN_REQUEST },
      {
        type: actionTypes.FETCH_ACCESS_TOKEN_SUCCESS,
        payload: 'token'
      }
    ];
    const store = mockStore({});

    return store.dispatch(accessTokenActions.fetchAccessToken()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_ACCESS_TOKEN_FAILURE when fetching an access token has been rejected', () => {
    fetch.authRequest = jest.fn().mockReturnValue(Promise.reject());

    const expectedActions = [
      { type: actionTypes.FETCH_ACCESS_TOKEN_REQUEST },
      { type: actionTypes.FETCH_ACCESS_TOKEN_FAILURE }
    ];
    const store = mockStore({});

    return store.dispatch(accessTokenActions.fetchAccessToken()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
