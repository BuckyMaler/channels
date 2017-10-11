/* eslint promise/always-return: 0 */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as videosActions from '../../app/actions/videos';
import actionTypes from '../../app/constants/actionTypes';
import * as fetch from '../../app/services/fetch';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../../app/services/uriGenerator');

describe('videos actions', () => {

  let store;
  beforeEach(() => {
    store = mockStore({
      accessToken: {
        token: 'ya29.GlyrBCJQJoIYFzocIunVN-CfjQZMG4oyVuAB6v_x_Z3FRnViyPy_deqRdwSAipQtKc9Nb2RudM9UISwI8SGNXxsJ1t3QHddeCdnoCjsM_vhLa9FlFVqMN_seI7oljg'
      },
      channels: {
        activeId: 'UCyIe-61Y8C4_o-zZCtO4ETQ'
      },
      videos: {
        pageToken: ''
      }
    });
  });

  it('creates FETCH_VIDEOS_SUCCESS when fetching video ids has resolved with undefined', () => {
    fetch.apiRequest = jest.fn(() => Promise.resolve({}));

    const expectedActions = [
      { type: actionTypes.FETCH_VIDEOS_REQUEST },
      {
        type: actionTypes.FETCH_VIDEOS_SUCCESS,
        payload: {
          items: [],
          nextPageToken: ''
        }
      }
    ];

    return store.dispatch(videosActions.fetchVideos()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_VIDEOS_SUCCESS when fetching video ids has resolved with null', () => {
    fetch.apiRequest = jest.fn(() => Promise.resolve({ items: null }));

    const expectedActions = [
      { type: actionTypes.FETCH_VIDEOS_REQUEST },
      {
        type: actionTypes.FETCH_VIDEOS_SUCCESS,
        payload: {
          items: [],
          nextPageToken: ''
        }
      }
    ];

    return store.dispatch(videosActions.fetchVideos()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_VIDEOS_FAILURE when fetching video ids has been rejected', () => {
    fetch.apiRequest = jest.fn(() => Promise.reject());

    const expectedActions = [
      { type: actionTypes.FETCH_VIDEOS_REQUEST },
      { type: actionTypes.FETCH_VIDEOS_FAILURE }
    ];

    return store.dispatch(videosActions.fetchVideos()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_VIDEOS_SUCCESS when fetching videos has been resolved', () => {
    fetch.apiRequest = jest.fn()
      .mockReturnValueOnce(Promise.resolve({
        items: [
          {
            id: {
              videoId: 'M8l2aGMjKHI'
            }
          },
          {
            id: {
              videoId: 'GcSACxUbqtg'
            }
          }
        ],
        nextPageToken: 'CBQQAA'
      }))
      .mockReturnValueOnce(Promise.resolve({ items: ['M8l2aGMjKHI', 'GcSACxUbqtg'] }));

    const expectedActions = [
      { type: actionTypes.FETCH_VIDEOS_REQUEST },
      {
        type: actionTypes.FETCH_VIDEOS_SUCCESS,
        payload: {
          items: ['M8l2aGMjKHI', 'GcSACxUbqtg'],
          nextPageToken: 'CBQQAA'
        }
      }
    ];

    return store.dispatch(videosActions.fetchVideos()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_VIDEOS_FAILURE when fetching videos has been rejected', () => {
    fetch.apiRequest = jest.fn()
      .mockReturnValueOnce(Promise.resolve({
        items: [
          {
            id: {
              videoId: 'M8l2aGMjKHI'
            }
          },
          {
            id: {
              videoId: 'GcSACxUbqtg'
            }
          }
        ],
        nextPageToken: 'CBQQAA'
      }))
      .mockReturnValueOnce(Promise.reject());

    const expectedActions = [
      { type: actionTypes.FETCH_VIDEOS_REQUEST },
      { type: actionTypes.FETCH_VIDEOS_FAILURE }
    ];

    return store.dispatch(videosActions.fetchVideos()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create an action to request videos', () => {
    const expectedAction = {
      type: actionTypes.FETCH_VIDEOS_REQUEST
    };

    expect(videosActions.requestVideos()).toEqual(expectedAction);
  });

  it('should create an action to receive videos', () => {
    const items = ['M8l2aGMjKHI', 'GcSACxUbqtg'];
    const nextPageToken = 'CBQQAA';
    const expectedAction = {
      type: actionTypes.FETCH_VIDEOS_SUCCESS,
      payload: {
        items,
        nextPageToken
      }
    };

    expect(videosActions.receiveVideos(items, nextPageToken)).toEqual(expectedAction);
  });

  it('should create an action to handle an error', () => {
    const expectedAction = {
      type: actionTypes.FETCH_VIDEOS_FAILURE
    };

    expect(videosActions.videosError()).toEqual(expectedAction);
  });
});
