/* eslint promise/always-return: 0 */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as activeVideoActions from '../../app/actions/activeVideo';
import actionTypes from '../../app/constants/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('activeVideo actions', () => {
  it('should create an action to update the active video', () => {
    const video = {
      id: 'XsFQEUP1MxI',
      title: 'Unit testing in JavaScript Part 2 - Your first tests',
      thumbnail: 'https://i.ytimg.com/hqdefault.jpg',
      description: 'Today, we are continuing our journey on unit testing in JavaScript.',
      publishedAt: '6 days ago',
      viewCount: '10,276',
      likeCount: '624',
      dislikeCount: '3'
    };
    const expectedAction = [{
      type: actionTypes.UPDATE_ACTIVE_VIDEO,
      payload: video
    }];
    const store = mockStore({ activeVideo: {} });

    store.dispatch(activeVideoActions.updateActiveVideo(video));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to increment the active video likes', () => {
    const counts = {
      likeCount: '1',
      dislikeCount: '0'
    };
    const expectedAction = [{
      type: actionTypes.UPDATE_ACTIVE_VIDEO,
      payload: counts
    }];
    const store = mockStore({
      activeVideo: {
        likeCount: '0',
        dislikeCount: '0'
      }
    });

    store.dispatch(activeVideoActions.updateActiveVideoCounts(
      {
        like: false,
        dislike: false
      },
      'like'
    ));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to decrement the active video likes', () => {
    const counts = {
      likeCount: '0',
      dislikeCount: '0'
    };
    const expectedAction = [{
      type: actionTypes.UPDATE_ACTIVE_VIDEO,
      payload: counts
    }];
    const store = mockStore({
      activeVideo: {
        likeCount: '1',
        dislikeCount: '0'
      }
    });

    store.dispatch(activeVideoActions.updateActiveVideoCounts(
      {
        like: true,
        dislike: false
      },
      'like'
    ));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to increment the active video likes and decrement dislikes', () => {
    const counts = {
      likeCount: '1',
      dislikeCount: '0'
    };
    const expectedAction = [{
      type: actionTypes.UPDATE_ACTIVE_VIDEO,
      payload: counts
    }];
    const store = mockStore({
      activeVideo: {
        likeCount: '0',
        dislikeCount: '1'
      }
    });

    store.dispatch(activeVideoActions.updateActiveVideoCounts(
      {
        like: false,
        dislike: true
      },
      'like'
    ));
    expect(store.getActions()).toEqual(expectedAction);
  });
});
