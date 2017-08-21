/* eslint promise/always-return: 0 */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as accessTokenActions from '../../app/actions/accessToken';
import * as fetch from '../../app/services/fetch';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../../app/services/uriGenerator');

describe('access token actions', () => {

  const accessToken = 'ya29.GlyrBCJQJoIYFzocIunVN-CfjQZMG4oyVuAB6v_x_Z3FRnViyPy_deqRdwSAipQtKc9Nb2RudM9UISwI8SGNXxsJ1t3QHddeCdnoCjsM_vhLa9FlFVqMN_seI7oljg';

  it('creates RECEIVE_ACCESS_TOKEN when fetching access token has been resolved', () => {
    fetch.authRequest = jest.fn().mockImplementation(() =>
      Promise.resolve({ access_token: accessToken })
    );

    const store = mockStore({});

    return store.dispatch(accessTokenActions.fetchAccessToken()).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('creates ACCESS_TOKEN_ERROR when fetching access token has been rejected', () => {
    fetch.authRequest = jest.fn().mockImplementation(() => Promise.reject());

    const store = mockStore({});

    return store.dispatch(accessTokenActions.fetchAccessToken()).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('should create an action to request an access token', () => {
    expect(accessTokenActions.requestAccessToken()).toMatchSnapshot();
  });

  it('should create an action to receive an access token', () => {
    const json = { access_token: accessToken };
    expect(accessTokenActions.receiveAccessToken(json)).toMatchSnapshot();
  });

  it('should create an action to handle an error', () => {
    expect(accessTokenActions.accessTokenError()).toMatchSnapshot();
  });
});
