import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as commentsActions from '../../app/actions/comments';
import actionTypes from '../../app/constants/actionTypes';
import * as fetch from '../../app/services/fetch';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../../app/services/uriGenerator');

describe('comments actions', () => {
  it('creates FETCH_COMMENTS_SUCCESS when fetching comments has been resolved', () => {
    fetch.getRequest = jest.fn()
      .mockReturnValue(Promise.resolve({
        nextPageToken: 'token',
        items: [{ id: '1' }]
      }));

    const expectedActions = [
      { type: actionTypes.FETCH_COMMENTS_REQUEST },
      {
        type: actionTypes.FETCH_COMMENTS_SUCCESS,
        payload: {
          items: [{ id: '1' }],
          nextPageToken: 'token'
        }
      }
    ];
    const store = mockStore({
      activeVideo: {
        id: '1'
      },
      comments: {
        pageToken: ''
      }
    });

    return store.dispatch(commentsActions.fetchComments()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_COMMENTS_FAILURE when fetching comments has been rejected', () => {
    fetch.getRequest = jest.fn().mockReturnValue(Promise.reject());

    const expectedActions = [
      { type: actionTypes.FETCH_COMMENTS_REQUEST },
      { type: actionTypes.FETCH_COMMENTS_FAILURE }
    ];
    const store = mockStore({
      activeVideo: {
        id: '1'
      },
      comments: {
        pageToken: ''
      }
    });

    return store.dispatch(commentsActions.fetchComments()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates POST_COMMENT_SUCCESS when a posted comment has been resolved', () => {
    fetch.postRequest = jest.fn().mockReturnValue(Promise.resolve({ id: '1' }));

    const expectedAction = [{
      type: actionTypes.POST_COMMENT_SUCCESS,
      payload: { id: '1' }
    }];
    const store = mockStore({
      activeVideo: {
        id: '1'
      },
      channels: {
        activeId: '1'
      }
    });

    return store.dispatch(commentsActions.postComment('Great video!')).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});
