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
      channels: {
        activeId: 'UCyIe-61Y8C4_o-zZCtO4ETQ'
      }
    });
  });

  it('creates FETCH_CHANNELS_FAILURE when fetching subscriptions has been rejected', () => {
    fetch.getRequest = jest.fn(() => Promise.reject());

    const expectedActions = [
      { type: actionTypes.FETCH_CHANNELS_REQUEST },
      { type: actionTypes.FETCH_CHANNELS_FAILURE }
    ];

    return store.dispatch(channelsActions.fetchChannels()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_CHANNELS_SUCCESS when fetching channels has been resolved', () => {
    fetch.getRequest = jest.fn()
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
    fetch.getRequest = jest.fn()
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

    expect(channelsActions.fetchChannelsRequest()).toEqual(expectedAction);
  });

  it('should create an action to receive channels', () => {
    const items = ['UCyIe-61Y8C4_o-zZCtO4ETQ', 'UCO1cgjhGzsSYb1rsB4bFe4Q'];
    const expectedAction = {
      type: actionTypes.FETCH_CHANNELS_SUCCESS,
      payload: items
    };

    expect(channelsActions.fetchChannelsSuccess(items)).toEqual(expectedAction);
  });

  it('should create an action to handle an error', () => {
    const expectedAction = {
      type: actionTypes.FETCH_CHANNELS_FAILURE
    };

    expect(channelsActions.fetchChannelsFailure()).toEqual(expectedAction);
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
