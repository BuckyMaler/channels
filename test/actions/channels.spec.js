import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as channelsActions from '../../app/actions/channels';
import actionTypes from '../../app/constants/actionTypes';
import * as fetch from '../../app/services/fetch';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../../app/services/uriGenerator');

describe('channels actions', () => {
  it('creates FETCH_CHANNELS_SUCCESS when fetching channels has been resolved', () => {
    fetch.getRequest = jest.fn()
      .mockReturnValueOnce(Promise.resolve({
        items: [{
          snippet: {
            resourceId: {
              channelId: '1'
            }
          }
        }]
      }))
      .mockReturnValue(Promise.resolve({
        items: [{ id: '1' }]
      }));

    const expectedActions = [
      { type: actionTypes.FETCH_CHANNELS_REQUEST },
      {
        type: actionTypes.FETCH_CHANNELS_SUCCESS,
        payload: [{ id: '1' }]
      }
    ];
    const store = mockStore({});

    return store.dispatch(channelsActions.fetchChannels()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_CHANNELS_FAILURE when fetching subscriptions has been rejected', () => {
    fetch.getRequest = jest.fn().mockReturnValue(Promise.reject());

    const expectedActions = [
      { type: actionTypes.FETCH_CHANNELS_REQUEST },
      { type: actionTypes.FETCH_CHANNELS_FAILURE }
    ];
    const store = mockStore({});

    return store.dispatch(channelsActions.fetchChannels()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_CHANNELS_FAILURE when fetching channels has been rejected', () => {
    fetch.getRequest = jest.fn()
      .mockReturnValueOnce(Promise.resolve({
        items: [{
          snippet: {
            resourceId: {
              channelId: '1'
            }
          }
        }]
      }))
      .mockReturnValue(Promise.reject());

    const expectedActions = [
      { type: actionTypes.FETCH_CHANNELS_REQUEST },
      { type: actionTypes.FETCH_CHANNELS_FAILURE }
    ];
    const store = mockStore({});

    return store.dispatch(channelsActions.fetchChannels()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create an action to update the active channel', () => {
    const channel = {
      id: '1'
    };

    const expectedAction = [{
      type: actionTypes.UPDATE_ACTIVE_CHANNEL,
      payload: '1'
    }];
    const store = mockStore({
      channels: {
        activeId: ''
      }
    });

    store.dispatch(channelsActions.updateActiveChannel(channel));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should not create an action to update the active channel', () => {
    const channel = {
      id: '1'
    };

    const store = mockStore({
      channels: {
        activeId: '1'
      }
    });

    store.dispatch(channelsActions.updateActiveChannel(channel));
    expect(store.getActions()).toEqual([]);
  });
});
