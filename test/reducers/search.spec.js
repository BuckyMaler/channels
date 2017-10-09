import search from '../../app/reducers/search';
import actionTypes from '../../app/constants/actionTypes';
import VideoType from '../../app/dataTypes/videoType';

describe('search reducer', () => {
  it('should return initial state', () => {
    expect(search(undefined, {})).toMatchSnapshot();
  });

  it('should handle FETCH_SEARCH_REQUEST', () => {
    const action = { type: actionTypes.FETCH_SEARCH_REQUEST };
    expect(search(undefined, action)).toMatchSnapshot();
  });

  it('should handle FETCH_SEARCH_SUCCESS', () => {
    const state = {
      'query': 'a',
      'results': [],
      'pageToken': '',
      'isFetching': true,
      'error': false
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

    expect(search(state, action)).toMatchSnapshot();
  });

  it('should handle FETCH_SEARCH_FAILURE', () => {
    const state = {
      'query': 'a',
      'results': [],
      'pageToken': '',
      'isFetching': true,
      'error': false
    };
    const action = { type: actionTypes.FETCH_SEARCH_FAILURE };
    expect(search(state, action)).toMatchSnapshot();
  });

  it('should handle UPDATE_SEARCH_QUERY', () => {
    ['a', 'ab'].forEach(query => {
      const action = {
        type: actionTypes.UPDATE_SEARCH_QUERY,
        payload: query
      };
      expect(search(undefined, action)).toMatchSnapshot();
    });
  });

  it('should handle CLEAR_SEARCH_RESULTS', () => {
    const state = {
      'query': 'abc',
      'results': [
        { id: 'M8l2aGMjKHI' },
        { id: 'GcSACxUbqtg' }
      ],
      'pageToken': 'CBQQAA',
      'isFetching': false,
      'error': false
    };
    const action = { type: actionTypes.CLEAR_SEARCH_RESULTS };
    expect(search(state, action)).toMatchSnapshot();
  });

  it('should handle unknown action type', () => {
    const action = { type: 'unknown' };
    expect(search(undefined, action)).toMatchSnapshot();
  });
});
