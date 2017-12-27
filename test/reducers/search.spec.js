import actionTypes from '../../app/constants/actionTypes';
import search from '../../app/reducers/search';
import VideoType from '../../app/dataTypes/videoType';

describe('search reducer', () => {
  it('should return initial state', () => {
    expect(search(undefined, {})).toEqual({
      query: '',
      results: [],
      pageToken: '',
      isFetching: false,
      error: false
    });
  });

  it('should handle FETCH_SEARCH_SUCCESS', () => {
    VideoType.from = jest.fn(item => item);

    expect(search(
      {
        query: 'react',
        results: [],
        pageToken: '',
        isFetching: false,
        error: false
      },
      {
        type: actionTypes.FETCH_SEARCH_SUCCESS,
        payload: {
          items: [
            { id: '1' },
            { id: '2' }
          ],
          nextPageToken: 'token'
        }
      }
    )).toEqual({
      query: 'react',
      results: [
        { id: '1' },
        { id: '2' }
      ],
      pageToken: 'token',
      isFetching: false,
      error: false
    });

    expect(search(
      {
        query: 'react',
        results: [{ id: '1' }],
        pageToken: 'token',
        isFetching: false,
        error: false
      },
      {
        type: actionTypes.FETCH_SEARCH_SUCCESS,
        payload: {
          items: [{ id: '2' }],
          nextPageToken: 'next token'
        }
      }
    )).toEqual({
      query: 'react',
      results: [
        { id: '1' },
        { id: '2' }
      ],
      pageToken: 'next token',
      isFetching: false,
      error: false
    });
  });

  it('should handle UPDATE_SEARCH_QUERY', () => {
    expect(search(
      undefined,
      {
        type: actionTypes.UPDATE_SEARCH_QUERY,
        payload: 'x'
      }
    )).toEqual({
      query: 'x',
      results: [],
      pageToken: '',
      isFetching: false,
      error: false
    });

    expect(search(
      {
        query: 'x',
        results: [],
        pageToken: '',
        isFetching: false,
        error: false
      },
      {
        type: actionTypes.UPDATE_SEARCH_QUERY,
        payload: 'xo'
      }
    )).toEqual({
      query: 'xo',
      results: [],
      pageToken: '',
      isFetching: false,
      error: false
    });
  });

  it('should handle CLEAR_SEARCH_RESULTS', () => {
    const state = {
      query: 'react',
      results: [
        { id: '1' },
        { id: '2' }
      ],
      pageToken: 'token',
      isFetching: false,
      error: false
    };
    const action = { type: actionTypes.CLEAR_SEARCH_RESULTS };

    expect(search(state, action)).toEqual({
      query: 'react',
      results: [],
      pageToken: '',
      isFetching: false,
      error: false
    });
  });

  it('should handle an unknown action type', () => {
    const action = { type: 'UNKNOWN' };

    expect(search(undefined, action)).toEqual({
      query: '',
      results: [],
      pageToken: '',
      isFetching: false,
      error: false
    });
  });
});
