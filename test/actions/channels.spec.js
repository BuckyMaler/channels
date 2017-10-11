/* eslint promise/always-return: 0 */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as channelsActions from '../../app/actions/channels';
import actionTypes from '../../app/constants/actionTypes';
import * as fetch from '../../app/services/fetch';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../../app/services/uriGenerator');

describe('channels actions', () => {

  let store;
  beforeEach(() => {
    store = mockStore({
      accessToken: {
        token: 'ya29.GlyrBCJQJoIYFzocIunVN-CfjQZMG4oyVuAB6v_x_Z3FRnViyPy_deqRdwSAipQtKc9Nb2RudM9UISwI8SGNXxsJ1t3QHddeCdnoCjsM_vhLa9FlFVqMN_seI7oljg'
      },
      channels: {
        activeId: 'UCyIe-61Y8C4_o-zZCtO4ETQ'
      }
    });
  });

  it('creates FETCH_CHANNELS_SUCCESS when fetching subscriptions has resolved with undefined', () => {
    fetch.apiRequest = jest.fn(() => Promise.resolve({}));

    const expectedActions = [
      { type: actionTypes.FETCH_CHANNELS_REQUEST },
      { type: actionTypes.FETCH_CHANNELS_SUCCESS, payload: [] }
    ];

    return store.dispatch(channelsActions.fetchChannels()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_CHANNELS_SUCCESS when fetching subscriptions has resolved with null', () => {
    fetch.apiRequest = jest.fn(() => Promise.resolve({ items: null }));

    const expectedActions = [
      { type: actionTypes.FETCH_CHANNELS_REQUEST },
      { type: actionTypes.FETCH_CHANNELS_SUCCESS, payload: [] }
    ];

    return store.dispatch(channelsActions.fetchChannels()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_CHANNELS_FAILURE when fetching subscriptions has been rejected', () => {
    fetch.apiRequest = jest.fn(() => Promise.reject());

    const expectedActions = [
      { type: actionTypes.FETCH_CHANNELS_REQUEST },
      { type: actionTypes.FETCH_CHANNELS_FAILURE }
    ];

    return store.dispatch(channelsActions.fetchChannels()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_CHANNELS_SUCCESS when fetching channels has been resolved', () => {
    fetch.apiRequest = jest.fn()
      .mockReturnValueOnce(Promise.resolve({
        items: [
          {
            snippet: {
              resourceId: {
                channelId: 'UCyIe-61Y8C4_o-zZCtO4ETQ'
              }
            }
          },
          {
            snippet: {
              resourceId: {
                channelId: 'UCO1cgjhGzsSYb1rsB4bFe4Q'
              }
            }
          }
        ]
      }))
      .mockReturnValueOnce(Promise.resolve({ items: ['UCyIe-61Y8C4_o-zZCtO4ETQ', 'UCO1cgjhGzsSYb1rsB4bFe4Q'] }));

    const expectedActions = [
      { type: actionTypes.FETCH_CHANNELS_REQUEST },
      {
        type: actionTypes.FETCH_CHANNELS_SUCCESS,
        payload: ['UCyIe-61Y8C4_o-zZCtO4ETQ', 'UCO1cgjhGzsSYb1rsB4bFe4Q']
      }
    ];

    return store.dispatch(channelsActions.fetchChannels()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_CHANNELS_FAILURE when fetching channels has been rejected', () => {
    fetch.apiRequest = jest.fn()
      .mockReturnValueOnce(Promise.resolve({
        items: [
          {
            snippet: {
              resourceId: {
                channelId: 'UCVTlvUkGslCV_h-nSAId8Sw'
              }
            }
          },
          {
            snippet: {
              resourceId: {
                channelId: 'UCW5YeuERMmlnqo4oq8vwUpg'
              }
            }
          }
        ]
      }))
      .mockReturnValueOnce(Promise.reject());

    const expectedActions = [
      { type: actionTypes.FETCH_CHANNELS_REQUEST },
      { type: actionTypes.FETCH_CHANNELS_FAILURE }
    ];

    return store.dispatch(channelsActions.fetchChannels()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create an action to request channels', () => {
    const expectedAction = {
      type: actionTypes.FETCH_CHANNELS_REQUEST
    };

    expect(channelsActions.requestChannels()).toEqual(expectedAction);
  });

  it('should create an action to receive channels', () => {
    const items = ['UCyIe-61Y8C4_o-zZCtO4ETQ', 'UCO1cgjhGzsSYb1rsB4bFe4Q'];
    const expectedAction = {
      type: actionTypes.FETCH_CHANNELS_SUCCESS,
      payload: items
    };

    expect(channelsActions.receiveChannels(items)).toEqual(expectedAction);
  });

  it('should create an action to handle an error', () => {
    const expectedAction = {
      type: actionTypes.FETCH_CHANNELS_FAILURE
    };

    expect(channelsActions.channelsError()).toEqual(expectedAction);
  });

  it('should create an action to update the active channel', () => {
    const channelId = 'UCO1cgjhGzsSYb1rsB4bFe4Q';
    const expectedAction = [{
      type: actionTypes.UPDATE_ACTIVE_CHANNEL,
      payload: channelId
    }];

    store.dispatch(channelsActions.updateActiveChannel(channelId));
    expect(store.getActions()).toEqual(expectedAction);
  });
});
