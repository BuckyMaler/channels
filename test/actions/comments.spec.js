/* eslint promise/always-return: 0 */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as commentsActions from '../../app/actions/comments';
import actionTypes from '../../app/constants/actionTypes';
import * as fetch from '../../app/services/fetch';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../../app/services/uriGenerator');

describe('comments actions', () => {

  let store;
  beforeEach(() => {
    store = mockStore({
      activeVideo: {
        id: 'XsFQEUP1MxI'
      },
      comments: {
        pageToken: ''
      }
    });
  });

  it('creates FETCH_COMMENTS_FAILURE when fetching comments has been rejected', () => {
    fetch.getRequest = jest.fn(() => Promise.reject());

    const expectedActions = [
      { type: actionTypes.FETCH_COMMENTS_REQUEST },
      { type: actionTypes.FETCH_COMMENTS_FAILURE }
    ];

    return store.dispatch(commentsActions.fetchComments()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_COMMENTS_SUCCESS when fetching comments has been resolved', () => {
    fetch.getRequest = jest.fn()
      .mockReturnValueOnce(Promise.resolve({
        items: [
          'z12sgfaakziic3eei23sjz3yxpfbhbybw04',
          'z12exdqh2tifxzexi04ch1kbaqm0sf25ao00k'
        ],
        nextPageToken: 'QURTSl'
      }));

    const expectedActions = [
      { type: actionTypes.FETCH_COMMENTS_REQUEST },
      {
        type: actionTypes.FETCH_COMMENTS_SUCCESS,
        payload: {
          items: [
            'z12sgfaakziic3eei23sjz3yxpfbhbybw04',
            'z12exdqh2tifxzexi04ch1kbaqm0sf25ao00k'
          ],
          nextPageToken: 'QURTSl'
        }
      }
    ];

    return store.dispatch(commentsActions.fetchComments()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create an action to request comments', () => {
    const expectedAction = {
      type: actionTypes.FETCH_COMMENTS_REQUEST
    };

    expect(commentsActions.fetchCommentsRequest()).toEqual(expectedAction);
  });

  it('should create an action to receive comments', () => {
    const items = [
      'z12sgfaakziic3eei23sjz3yxpfbhbybw04',
      'z12exdqh2tifxzexi04ch1kbaqm0sf25ao00k'
    ];
    const nextPageToken = 'QURTSl';
    const expectedAction = {
      type: actionTypes.FETCH_COMMENTS_SUCCESS,
      payload: {
        items,
        nextPageToken
      }
    };

    expect(commentsActions.fetchCommentsSuccess(items, nextPageToken)).toEqual(expectedAction);
  });

  it('should create an action to handle an error', () => {
    const expectedAction = {
      type: actionTypes.FETCH_COMMENTS_FAILURE
    };

    expect(commentsActions.fetchCommentsFailure()).toEqual(expectedAction);
  });
});
