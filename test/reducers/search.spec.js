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
    const state = search(
      undefined,
      {
        type: actionTypes.UPDATE_SEARCH_QUERY,
        payload: 'react'
      }
    );
    const action = {
      type: actionTypes.FETCH_SEARCH_SUCCESS,
      payload: {
        items: [
          { id: 'UCyIe-61Y8C4_o-zZCtO4ETQ' },
          { id: 'UCO1cgjhGzsSYb1rsB4bFe4Q' }
        ],
        nextPageToken: 'CBQQAA'
      }
    };

    VideoType.from = jest.fn(item => item);

    expect(search(state, action)).toMatchSnapshot();
  });

  it('should handle FETCH_SEARCH_FAILURE', () => {
    const state = search(undefined, { type: actionTypes.FETCH_SEARCH_REQUEST });
    const action = { type: actionTypes.FETCH_SEARCH_FAILURE };
    expect(search(state, action)).toMatchSnapshot();
  });

  it('should handle UPDATE_SEARCH_QUERY', () => {
    const state = search(undefined, {});
    const action = {
      type: actionTypes.UPDATE_SEARCH_QUERY,
      payload: 'react'
    };
    expect(search(state, action)).toMatchSnapshot();
  });

  it('should handle CLEAR_SEARCH_RESULTS', () => {
    const state = search(
      undefined,
      {
        type: actionTypes.FETCH_SEARCH_SUCCESS,
        payload: {
          items: [
            { id: 'UCyIe-61Y8C4_o-zZCtO4ETQ' },
            { id: 'UCO1cgjhGzsSYb1rsB4bFe4Q' }
          ],
          nextPageToken: 'CBQQAA'
        }
      }
    );
    const action = { type: actionTypes.CLEAR_SEARCH_RESULTS };

    VideoType.from = jest.fn(item => item);

    expect(search(state, action)).toMatchSnapshot();
  });

  it('should handle unknown action type', () => {
    const action = { type: 'unknown' };
    expect(search(undefined, action)).toMatchSnapshot();
  });
});
