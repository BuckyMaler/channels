import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as searchActions from '../../app/actions/search';
import actionTypes from '../../app/constants/actionTypes';
import * as fetch from '../../app/services/fetch';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../../app/services/uriGenerator');

describe('search actions', () => {
  it('creates FETCH_SEARCH_SUCCESS when fetching a search has been resolved', () => {
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
      { type: actionTypes.FETCH_SEARCH_REQUEST },
      {
        type: actionTypes.FETCH_SEARCH_SUCCESS,
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
      search: {
        query: 'react',
        pageToken: ''
      }
    });

    return store.dispatch(searchActions.fetchSearch()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_SEARCH_FAILURE when fetching video ids has been rejected', () => {
    fetch.getRequest = jest.fn().mockReturnValue(Promise.reject());

    const expectedActions = [
      { type: actionTypes.FETCH_SEARCH_REQUEST },
      { type: actionTypes.FETCH_SEARCH_FAILURE }
    ];
    const store = mockStore({
      channels: {
        activeId: '1'
      },
      search: {
        query: 'react',
        pageToken: ''
      }
    });

    return store.dispatch(searchActions.fetchSearch()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_SEARCH_FAILURE when fetching a search has been rejected', () => {
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
      { type: actionTypes.FETCH_SEARCH_REQUEST },
      { type: actionTypes.FETCH_SEARCH_FAILURE }
    ];
    const store = mockStore({
      channels: {
        activeId: '1'
      },
      search: {
        query: 'react',
        pageToken: ''
      }
    });

    return store.dispatch(searchActions.fetchSearch()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates CLEAR_SEARCH_RESULTS and UPDATE_SEARCH_QUERY when updating search', () => {
    const expectedActions = [
      { type: actionTypes.CLEAR_SEARCH_RESULTS },
      {
        type: actionTypes.UPDATE_SEARCH_QUERY,
        payload: 'react'
      }
    ];
    const store = mockStore({});

    store.dispatch(searchActions.updateSearch('react'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates UPDATE_SEARCH_QUERY and CLEAR_SEARCH_RESULTS when clearing search', () => {
    const expectedActions = [
      {
        type: actionTypes.UPDATE_SEARCH_QUERY,
        payload: ''
      },
      { type: actionTypes.CLEAR_SEARCH_RESULTS }
    ];
    const store = mockStore({});

    store.dispatch(searchActions.clearSearch());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
