import actionTypes from '../../app/constants/actionTypes';
import videos from '../../app/reducers/videos';
import VideoType from '../../app/dataTypes/videoType';

describe('videos reducer', () => {
  it('should return initial state', () => {
    expect(videos(undefined, {})).toEqual({
      byId: {},
      allIds: [],
      pageToken: '',
      isFetching: false,
      error: false
    });
  });

  it('should handle FETCH_VIDEOS_SUCCESS', () => {
    VideoType.from = jest.fn(item => item);

    expect(videos(
      undefined,
      {
        type: actionTypes.FETCH_VIDEOS_SUCCESS,
        payload: {
          items: [
            { id: '1' },
            { id: '2' }
          ],
          nextPageToken: 'token'
        }
      }
    )).toEqual({
      byId: {
        1: {
          id: '1'
        },
        2: {
          id: '2'
        }
      },
      allIds: ['1', '2'],
      pageToken: 'token',
      isFetching: false,
      error: false
    });

    expect(videos(
      {
        byId: {
          1: {
            id: '1'
          }
        },
        allIds: ['1'],
        pageToken: 'token',
        isFetching: false,
        error: false
      },
      {
        type: actionTypes.FETCH_VIDEOS_SUCCESS,
        payload: {
          items: [{ id: '2' }],
          nextPageToken: 'next token'
        }
      }
    )).toEqual({
      byId: {
        1: {
          id: '1'
        },
        2: {
          id: '2'
        }
      },
      allIds: ['1', '2'],
      pageToken: 'next token',
      isFetching: false,
      error: false
    });
  });

  it('should handle UPDATE_ACTIVE_CHANNEL', () => {
    const state = {
      byId: {
        1: {
          id: '1'
        }
      },
      allIds: ['1'],
      pageToken: 'token',
      isFetching: false,
      error: false
    };
    const action = {
      type: actionTypes.UPDATE_ACTIVE_CHANNEL,
      payload: {
        id: '1'
      }
    };

    expect(videos(state, action)).toEqual({
      byId: {},
      allIds: [],
      pageToken: '',
      isFetching: false,
      error: false
    });
  });

  it('should handle an unknown action type', () => {
    const action = { type: 'UNKNOWN' };

    expect(videos(undefined, action)).toEqual({
      byId: {},
      allIds: [],
      pageToken: '',
      isFetching: false,
      error: false
    });
  });
});
