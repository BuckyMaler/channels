/* eslint promise/always-return: 0 */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as searchActions from '../../app/actions/search';
import actionTypes from '../../app/constants/actionTypes';
import * as fetch from '../../app/services/fetch';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../../app/services/uriGenerator');

describe('search actions', () => {

  let store;
  beforeEach(() => {
    store = mockStore({
      channels: {
        activeId: 'UCyIe-61Y8C4_o-zZCtO4ETQ'
      },
      search: {
        pageToken: ''
      }
    });
  });

  it('creates FETCH_SEARCH_SUCCESS when fetching video ids has resolved with undefined', () => {
    fetch.getRequest = jest.fn(() => Promise.resolve({}));

    const expectedActions = [
      { type: actionTypes.FETCH_SEARCH_REQUEST },
      {
        type: actionTypes.FETCH_SEARCH_SUCCESS,
        payload: {
          items: [],
          nextPageToken: ''
        }
      }
    ];

    return store.dispatch(searchActions.fetchSearch()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_SEARCH_SUCCESS when fetching video ids has resolved with null', () => {
    fetch.getRequest = jest.fn(() => Promise.resolve({ items: null }));

    const expectedActions = [
      { type: actionTypes.FETCH_SEARCH_REQUEST },
      {
        type: actionTypes.FETCH_SEARCH_SUCCESS,
        payload: {
          items: [],
          nextPageToken: ''
        }
      }
    ];

    return store.dispatch(searchActions.fetchSearch()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_SEARCH_FAILURE when fetching video ids has been rejected', () => {
    fetch.getRequest = jest.fn(() => Promise.reject());

    const expectedActions = [
      { type: actionTypes.FETCH_SEARCH_REQUEST },
      { type: actionTypes.FETCH_SEARCH_FAILURE }
    ];

    return store.dispatch(searchActions.fetchSearch()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_SEARCH_SUCCESS when fetching videos has been resolved', () => {
    fetch.getRequest = jest.fn()
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
      { type: actionTypes.FETCH_SEARCH_REQUEST },
      {
        type: actionTypes.FETCH_SEARCH_SUCCESS,
        payload: {
          items: ['M8l2aGMjKHI', 'GcSACxUbqtg'],
          nextPageToken: 'CBQQAA'
        }
      }
    ];

    return store.dispatch(searchActions.fetchSearch()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_SEARCH_FAILURE when fetching videos has been rejected', () => {
    fetch.getRequest = jest.fn()
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
      { type: actionTypes.FETCH_SEARCH_REQUEST },
      { type: actionTypes.FETCH_SEARCH_FAILURE }
    ];

    return store.dispatch(searchActions.fetchSearch()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create an action to request search', () => {
    const expectedAction = {
      type: actionTypes.FETCH_SEARCH_REQUEST
    };

    expect(searchActions.requestSearch()).toEqual(expectedAction);
  });

  it('should create an action to receive search', () => {
    const items = ['M8l2aGMjKHI', 'GcSACxUbqtg'];
    const nextPageToken = 'CBQQAA';
    const expectedAction = {
      type: actionTypes.FETCH_SEARCH_SUCCESS,
      payload: {
        items,
        nextPageToken
      }
    };

    expect(searchActions.receiveSearch(items, nextPageToken)).toEqual(expectedAction);
  });

  it('should create an action to handle an error', () => {
    const expectedAction = {
      type: actionTypes.FETCH_SEARCH_FAILURE
    };

    expect(searchActions.searchError()).toEqual(expectedAction);
  });

  it('should create actions to update search', () => {
    const query = 'react';
    const expectedActions = [
      { type: actionTypes.CLEAR_SEARCH_RESULTS },
      {
        type: actionTypes.UPDATE_SEARCH_QUERY,
        payload: query
      }
    ];

    store.dispatch(searchActions.updateSearch(query));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create actions to clear search', () => {
    const query = '';
    const expectedActions = [
      {
        type: actionTypes.UPDATE_SEARCH_QUERY,
        payload: query
      },
      { type: actionTypes.CLEAR_SEARCH_RESULTS }
    ];

    store.dispatch(searchActions.clearSearch(query));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
