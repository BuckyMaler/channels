import videos from '../../app/reducers/videos';
import actionTypes from '../../app/constants/actionTypes';
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

  it('should handle FETCH_VIDEOS_REQUEST', () => {
    const action = { type: actionTypes.FETCH_VIDEOS_REQUEST };
    expect(videos(undefined, action)).toEqual({
      byId: {},
      allIds: [],
      pageToken: '',
      isFetching: true,
      error: false
    });
  });

  it('should handle FETCH_VIDEOS_SUCCESS', () => {
    VideoType.from = jest.fn(item => item);

    expect((
      videos(
        {
          byId: {},
          allIds: [],
          pageToken: '',
          isFetching: true,
          error: false
        },
        {
          type: actionTypes.FETCH_VIDEOS_SUCCESS,
          payload: {
            items: [
              { id: 'M8l2aGMjKHI' },
              { id: 'GcSACxUbqtg' }
            ],
            nextPageToken: 'CBQQAA'
          }
        }
      )
    )).toEqual({
      byId: {
        M8l2aGMjKHI: {
          id: 'M8l2aGMjKHI'
        },
        GcSACxUbqtg: {
          id: 'GcSACxUbqtg'
        }
      },
      allIds: [
        'M8l2aGMjKHI',
        'GcSACxUbqtg'
      ],
      pageToken: 'CBQQAA',
      isFetching: false,
      error: false
    });

    expect((
      videos(
        {
          byId: {
            M8l2aGMjKHI: {
              id: 'M8l2aGMjKHI'
            },
            GcSACxUbqtg: {
              id: 'GcSACxUbqtg'
            }
          },
          allIds: [
            'M8l2aGMjKHI',
            'GcSACxUbqtg'
          ],
          pageToken: 'CBQQAA',
          isFetching: true,
          error: false
        },
        {
          type: actionTypes.FETCH_VIDEOS_SUCCESS,
          payload: {
            items: [
              { id: 'Flze-rwT7lM' },
              { id: 'L4TIM6W7u-M' }
            ],
            nextPageToken: 'CCgQAA'
          }
        }
      )
    )).toEqual({
      byId: {
        M8l2aGMjKHI: {
          id: 'M8l2aGMjKHI'
        },
        GcSACxUbqtg: {
          id: 'GcSACxUbqtg'
        },
        'Flze-rwT7lM': {
          id: 'Flze-rwT7lM'
        },
        'L4TIM6W7u-M': {
          id: 'L4TIM6W7u-M'
        }
      },
      allIds: [
        'M8l2aGMjKHI',
        'GcSACxUbqtg',
        'Flze-rwT7lM',
        'L4TIM6W7u-M'
      ],
      pageToken: 'CCgQAA',
      isFetching: false,
      error: false
    });
  });

  it('should handle FETCH_VIDEOS_FAILURE', () => {
    const state = {
      byId: {},
      allIds: [],
      pageToken: '',
      isFetching: true,
      error: false
    };
    const action = { type: actionTypes.FETCH_VIDEOS_FAILURE };
    expect(videos(state, action)).toEqual({
      byId: {},
      allIds: [],
      pageToken: '',
      isFetching: false,
      error: true
    });
  });

  it('should handle UPDATE_ACTIVE_CHANNEL', () => {
    const state = {
      byId: {
        M8l2aGMjKHI: {
          id: 'M8l2aGMjKHI'
        },
        GcSACxUbqtg: {
          id: 'GcSACxUbqtg'
        }
      },
      allIds: [
        'M8l2aGMjKHI',
        'GcSACxUbqtg'
      ],
      pageToken: 'CBQQAA',
      isFetching: false,
      error: false
    };
    const action = {
      type: actionTypes.UPDATE_ACTIVE_CHANNEL,
      payload: 'UCO1cgjhGzsSYb1rsB4bFe4Q'
    };
    expect(videos(state, action)).toEqual({
      byId: {},
      allIds: [],
      pageToken: '',
      isFetching: false,
      error: false
    });
  });

  it('should handle unknown action type', () => {
    const action = { type: 'unknown' };
    expect(videos(undefined, action)).toEqual({
      byId: {},
      allIds: [],
      pageToken: '',
      isFetching: false,
      error: false
    });
  });
});
