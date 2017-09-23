/* eslint promise/always-return: 0 */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as videosActions from '../../app/actions/videos';
import * as fetch from '../../app/services/fetch';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../../app/services/uriGenerator');

describe('video list actions', () => {

  const accessToken = 'ya29.GlyrBCJQJoIYFzocIunVN-CfjQZMG4oyVuAB6v_x_Z3FRnViyPy_deqRdwSAipQtKc9Nb2RudM9UISwI8SGNXxsJ1t3QHddeCdnoCjsM_vhLa9FlFVqMN_seI7oljg';
  const channels = {
    activeId: 'UCyIe-61Y8C4_o-zZCtO4ETQ'
  };
  const videos = {
    pageToken: ''
  };

  it('creates FETCH_VIDEOS_SUCCESS when fetching video ids has resolved with undefined', () => {
    const store = mockStore({ accessToken, channels, videos });

    fetch.apiRequest = jest.fn(() => Promise.resolve({}));

    return store.dispatch(videosActions.fetchVideos()).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('creates FETCH_VIDEOS_SUCCESS when fetching video ids has resolved with null', () => {
    const store = mockStore({ accessToken, channels, videos });

    fetch.apiRequest = jest.fn(() => Promise.resolve({ items: null }));

    return store.dispatch(videosActions.fetchVideos()).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('creates FETCH_VIDEOS_FAILURE when fetching video ids has been rejected', () => {
    const store = mockStore({ accessToken, channels, videos });

    fetch.apiRequest = jest.fn(() => Promise.reject());

    return store.dispatch(videosActions.fetchVideos()).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('creates FETCH_VIDEOS_SUCCESS when fetching videos has been resolved', () => {
    const store = mockStore({ accessToken, channels, videos });

    fetch.apiRequest = jest.fn()
      .mockReturnValueOnce(Promise.resolve({
        items: [
          {
            id: {
              videoId: 'lAJWHHUz8_8'
            }
          },
          {
            id: {
              videoId: '6YBV1cKRqzU'
            }
          }
        ],
        nextPageToken: 'CBQQAA'
      }))
      .mockReturnValueOnce(Promise.resolve({ items: ['GraphQL Basics - Fun Fun Function', 'Advanced Dependency Injection without classes - Fun Fun Function'] }));

    return store.dispatch(videosActions.fetchVideos()).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('creates FETCH_VIDEOS_FAILURE when fetching videos has been rejected', () => {
    const store = mockStore({ accessToken, channels, videos });

    fetch.apiRequest = jest.fn()
      .mockReturnValueOnce(Promise.resolve({
        items: [
          {
            id: {
              videoId: 'lAJWHHUz8_8'
            }
          },
          {
            id: {
              videoId: '6YBV1cKRqzU'
            }
          }
        ],
        nextPageToken: 'CBQQAA'
      }))
      .mockReturnValueOnce(Promise.reject());

    return store.dispatch(videosActions.fetchVideos()).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('should create an action to request videos', () => {
    expect(videosActions.requestVideos()).toMatchSnapshot();
  });

  it('should create an action to receive videos', () => {
    const items = ['GraphQL Basics - Fun Fun Function', 'Advanced Dependency Injection without classes - Fun Fun Function'];
    const nextPageToken = 'CBQQAA';
    expect(videosActions.receiveVideos(items, nextPageToken)).toMatchSnapshot();
  });

  it('should create an action to handle an error', () => {
    expect(videosActions.videosError()).toMatchSnapshot();
  });
});
