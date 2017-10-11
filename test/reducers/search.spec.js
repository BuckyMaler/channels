import search from '../../app/reducers/search';
import actionTypes from '../../app/constants/actionTypes';
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

  it('should handle FETCH_SEARCH_REQUEST', () => {
    const action = { type: actionTypes.FETCH_SEARCH_REQUEST };
    expect(search(undefined, action)).toEqual({
      query: '',
      results: [],
      pageToken: '',
      isFetching: true,
      error: false
    });
  });

  it('should handle FETCH_SEARCH_SUCCESS', () => {
    const state = {
      query: 'react',
      results: [],
      pageToken: '',
      isFetching: true,
      error: false
    };
    const action = {
      type: actionTypes.FETCH_SEARCH_SUCCESS,
      payload: {
        items: [
          { id: 'M8l2aGMjKHI' },
          { id: 'GcSACxUbqtg' }
        ],
        nextPageToken: 'CBQQAA'
      }
    };

    VideoType.from = jest.fn(item => item);

    expect(search(state, action)).toEqual({
      query: 'react',
      results: [
        { id: 'M8l2aGMjKHI' },
        { id: 'GcSACxUbqtg' }
      ],
      pageToken: 'CBQQAA',
      isFetching: false,
      error: false
    });
  });

  it('should handle FETCH_SEARCH_FAILURE', () => {
    const state = {
      query: 'react',
      results: [],
      pageToken: '',
      isFetching: true,
      error: false
    };
    const action = { type: actionTypes.FETCH_SEARCH_FAILURE };
    expect(search(state, action)).toEqual({
      query: 'react',
      results: [],
      pageToken: '',
      isFetching: false,
      error: true
    });
  });

  it('should handle UPDATE_SEARCH_QUERY', () => {
    const expectedState = [
      {
        query: 'reac',
        results: [],
        pageToken: '',
        isFetching: false,
        error: false
      },
      {
        query: 'react',
        results: [],
        pageToken: '',
        isFetching: false,
        error: false
      }
    ];
    ['reac', 'react'].forEach((query, i) => {
      const action = {
        type: actionTypes.UPDATE_SEARCH_QUERY,
        payload: query
      };
      expect(search(undefined, action)).toEqual(expectedState[i]);
    });
  });

  it('should handle CLEAR_SEARCH_RESULTS', () => {
    const state = {
      query: 'react',
      results: [
        { id: 'M8l2aGMjKHI' },
        { id: 'GcSACxUbqtg' }
      ],
      pageToken: 'CBQQAA',
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

  it('should handle unknown action type', () => {
    const action = { type: 'unknown' };
    expect(search(undefined, action)).toEqual({
      query: '',
      results: [],
      pageToken: '',
      isFetching: false,
      error: false
    });
  });
});
