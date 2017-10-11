/* eslint promise/always-return: 0 */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as accessTokenActions from '../../app/actions/accessToken';
import actionTypes from '../../app/constants/actionTypes';
import * as fetch from '../../app/services/fetch';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../../app/services/uriGenerator');

describe('accessToken actions', () => {

  const token = 'ya29.GlyrBCJQJoIYFzocIunVN-CfjQZMG4oyVuAB6v_x_Z3FRnViyPy_deqRdwSAipQtKc9Nb2RudM9UISwI8SGNXxsJ1t3QHddeCdnoCjsM_vhLa9FlFVqMN_seI7oljg';

  it('creates FETCH_ACCESS_TOKEN_SUCCESS when fetching access token has been resolved', () => {
    fetch.authRequest = jest.fn(() => Promise.resolve({ access_token: token }));

    const expectedActions = [
      { type: actionTypes.FETCH_ACCESS_TOKEN_REQUEST },
      { type: actionTypes.FETCH_ACCESS_TOKEN_SUCCESS, payload: token }
    ];
    const store = mockStore({});

    return store.dispatch(accessTokenActions.fetchAccessToken()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_ACCESS_TOKEN_FAILURE when fetching access token has been rejected', () => {
    fetch.authRequest = jest.fn(() => Promise.reject());

    const expectedActions = [
      { type: actionTypes.FETCH_ACCESS_TOKEN_REQUEST },
      { type: actionTypes.FETCH_ACCESS_TOKEN_FAILURE }
    ];
    const store = mockStore({});

    return store.dispatch(accessTokenActions.fetchAccessToken()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create an action to request an access token', () => {
    const expectedAction = {
      type: actionTypes.FETCH_ACCESS_TOKEN_REQUEST
    };

    expect(accessTokenActions.requestAccessToken()).toEqual(expectedAction);
  });

  it('should create an action to receive an access token', () => {
    const expectedAction = {
      type: actionTypes.FETCH_ACCESS_TOKEN_SUCCESS,
      payload: token
    };

    expect(accessTokenActions.receiveAccessToken(token)).toEqual(expectedAction);
  });

  it('should create an action to handle an error', () => {
    const expectedAction = {
      type: actionTypes.FETCH_ACCESS_TOKEN_FAILURE
    };

    expect(accessTokenActions.accessTokenError()).toEqual(expectedAction);
  });
});
