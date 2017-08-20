import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as channelListActions from '../../app/actions/channelList';
import * as fetch from '../../app/services/fetch';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../../app/services/uriGenerator');

describe('channel list actions', () => {

  const accessToken = 'ya29.GlyrBCJQJoIYFzocIunVN-CfjQZMG4oyVuAB6v_x_Z3FRnViyPy_deqRdwSAipQtKc9Nb2RudM9UISwI8SGNXxsJ1t3QHddeCdnoCjsM_vhLa9FlFVqMN_seI7oljg';

  it('creates RECEIVE_CHANNELS when fetching subscriptions has resolved with undefined', () => {
    const store = mockStore({ accessToken });

    fetch.apiRequest = jest.fn(() => Promise.resolve({}));

    return store.dispatch(channelListActions.fetchChannels()).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('creates RECEIVE_CHANNELS when fetching subscriptions has resolved with null', () => {
    const store = mockStore({ accessToken });

    fetch.apiRequest = jest.fn(() => Promise.resolve({ items: null }));

    return store.dispatch(channelListActions.fetchChannels()).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('creates CHANNELS_ERROR when fetching subscriptions has been rejected', () => {
    const store = mockStore({ accessToken });

    fetch.apiRequest = jest.fn(() => Promise.reject());

    return store.dispatch(channelListActions.fetchChannels()).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('creates RECEIVE_CHANNELS when fetching channels has been resolved', () => {
    const store = mockStore({ accessToken });

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
      .mockReturnValueOnce(Promise.resolve({ items: ['DevTips', 'Fun Fun Function'] }));

    return store.dispatch(channelListActions.fetchChannels()).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('creates CHANNELS_ERROR when fetching channels has been rejected', () => {
    const store = mockStore({ accessToken });

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

    return store.dispatch(channelListActions.fetchChannels()).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('should create an action to request channels', () => {
    expect(channelListActions.requestChannels()).toMatchSnapshot();
  });

  it('should create an action to receive channels', () => {
    const json = { items: ['DevTips', 'Fun Fun Function'] };
    expect(channelListActions.receiveChannels(json)).toMatchSnapshot();
  });

  it('should create an action to handle an error', () => {
    expect(channelListActions.channelsError()).toMatchSnapshot();
  });
});
