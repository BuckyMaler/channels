/* eslint promise/always-return: 0 */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as channelsActions from '../../app/actions/channels';
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

    return store.dispatch(channelsActions.fetchChannels()).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('creates FETCH_CHANNELS_SUCCESS when fetching subscriptions has resolved with null', () => {
    fetch.apiRequest = jest.fn(() => Promise.resolve({ items: null }));

    return store.dispatch(channelsActions.fetchChannels()).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('creates FETCH_CHANNELS_FAILURE when fetching subscriptions has been rejected', () => {
    fetch.apiRequest = jest.fn(() => Promise.reject());

    return store.dispatch(channelsActions.fetchChannels()).then(() => {
      expect(store.getActions()).toMatchSnapshot();
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

    return store.dispatch(channelsActions.fetchChannels()).then(() => {
      expect(store.getActions()).toMatchSnapshot();
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

    return store.dispatch(channelsActions.fetchChannels()).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('should create an action to request channels', () => {
    expect(channelsActions.requestChannels()).toMatchSnapshot();
  });

  it('should create an action to receive channels', () => {
    const items = ['UCyIe-61Y8C4_o-zZCtO4ETQ', 'UCO1cgjhGzsSYb1rsB4bFe4Q'];
    expect(channelsActions.receiveChannels(items)).toMatchSnapshot();
  });

  it('should create an action to handle an error', () => {
    expect(channelsActions.channelsError()).toMatchSnapshot();
  });

  it('should create an action to update the active channel', () => {
    const channelId = 'UCO1cgjhGzsSYb1rsB4bFe4Q';
    store.dispatch(channelsActions.updateActiveChannel(channelId));
    expect(store.getActions()).toMatchSnapshot();
  });
});
