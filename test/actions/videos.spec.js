import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as videosActions from '../../app/actions/videos';
import actionTypes from '../../app/constants/actionTypes';
import * as fetch from '../../app/services/fetch';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../../app/services/uriGenerator');

describe('videos actions', () => {
  it('creates FETCH_VIDEOS_SUCCESS when fetching videos has been resolved', () => {
    fetch.getRequest = jest.fn()
      .mockReturnValueOnce(Promise.resolve({
        nextPageToken: 'token',
        items: [{
          id: {
            videoId: '1'
          }
        }]
      }))
      .mockReturnValue(Promise.resolve({
        items: [{ id: '1' }]
      }));

    const expectedActions = [
      { type: actionTypes.FETCH_VIDEOS_REQUEST },
      {
        type: actionTypes.FETCH_VIDEOS_SUCCESS,
        payload: {
          items: [{ id: '1' }],
          nextPageToken: 'token'
        }
      }
    ];
    const store = mockStore({
      channels: {
        activeId: '1'
      },
      videos: {
        pageToken: ''
      }
    });

    return store.dispatch(videosActions.fetchVideos()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_VIDEOS_FAILURE when fetching video ids has been rejected', () => {
    fetch.getRequest = jest.fn().mockReturnValue(Promise.reject());

    const expectedActions = [
      { type: actionTypes.FETCH_VIDEOS_REQUEST },
      { type: actionTypes.FETCH_VIDEOS_FAILURE }
    ];
    const store = mockStore({
      channels: {
        activeId: '1'
      },
      videos: {
        pageToken: ''
      }
    });

    return store.dispatch(videosActions.fetchVideos()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_VIDEOS_FAILURE when fetching videos has been rejected', () => {
    fetch.getRequest = jest.fn()
      .mockReturnValueOnce(Promise.resolve({
        nextPageToken: 'token',
        items: [{
          id: {
            videoId: '1'
          }
        }]
      }))
      .mockReturnValue(Promise.reject());

    const expectedActions = [
      { type: actionTypes.FETCH_VIDEOS_REQUEST },
      { type: actionTypes.FETCH_VIDEOS_FAILURE }
    ];
    const store = mockStore({
      channels: {
        activeId: '1'
      },
      videos: {
        pageToken: ''
      }
    });

    return store.dispatch(videosActions.fetchVideos()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
